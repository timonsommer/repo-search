import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { fetchRepos } from '../services/queries';
import { Status } from '../types/Status';
import { LanguageOption, Repository, Filter, Language } from '../types/repositoryData';
import RepoList from './RepoList';
import { UserContext } from '../contexts/UserContext';
import { useDebouncedCallback } from 'use-debounce';

const anyLang: LanguageOption = ["any", "Any Language"];
const defaultFilter = { languageId: anyLang[0], repoName: "" };

function RepoFilter() {
    const { username } = useContext(UserContext);

    const [alert, setAlert] = useState<string>("");
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
    const [itemCount, setItemCount] = useState<number>(0);
    const [filter, setFilter] = useState<Filter>(defaultFilter);
    const [allLanguages, setAllLanguages] = useState<LanguageOption[]>([anyLang]);

    const filterRepos = (repositories: Repository[], { languageId: language, repoName: name }: Filter): Repository[] => {
        return repositories.filter((repo) => (
            repo.name.toLowerCase().includes(name.toLowerCase()) &&
            (language === anyLang[0] || repo.languages.includes(language))
        ));
    }

    const handleNameInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setFilter({ repoName: e.target.value, languageId: filter.languageId });
    }, 400);

    const handleLangInput = useDebouncedCallback((e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setFilter({ repoName: filter.repoName, languageId: e.target.value });
    }, 400);

    useEffect(() => {
        fetchRepos(username).then((response) => {
            console.log(response);
            if (response.data && response.status === Status.SUCCESS) {
                const edges = response.data.user.repositories.edges;
                const _allLanguages: Map<string, Language> = new Map();
                const _repositories: Repository[] = edges.map((edge) => edge.node).map((node) => {
                    const _languages: Language[] = node.languages.edges.map((edge) => {
                        if (!_allLanguages.has(edge.node.id)) _allLanguages.set(edge.node.id, edge.node.name);
                        return edge.node.id;
                    });
                    return { id: node.id, name: node.name, languages: _languages, url: node.url };
                });
                setAllLanguages([anyLang].concat(Array.from(_allLanguages).sort((a, b) => a[1].localeCompare(b[1]))));
                setRepositories(_repositories);
                setFilteredRepos(filterRepos(_repositories, filter));
                setItemCount(filteredRepos.length);
            } else {
                setAlert(response.status.toString());
            }
        });
        return () => {
            setAllLanguages([anyLang]);
            setRepositories([]);
            setFilteredRepos([]);
        }
    },
        [username]);

    useEffect(() => {
        const filterBlocking = async () => {
            setFilteredRepos(filterRepos(repositories, filter));
            setItemCount(filteredRepos.length);
            return () => setFilter(defaultFilter);
        }
        filterBlocking();
    }, [filter]);

    return (
        <div className="repo-filter">
            <div className="repo-filter__options">
                <input className="repo-filter__options__name" type="text" onChange={(e) => handleNameInput(e)} placeholder="Filter by repository name" />
                <select className="repo-filter__options__lang" onChange={(e) => handleLangInput(e)}>
                    {allLanguages.map((lang) =>
                        <option key={lang[0]} value={lang[0]}>{lang[1]}</option>
                    )}
                </select>
            </div>
            <RepoList _repositories={filteredRepos} />
        </div>
    );
}

export default RepoFilter;
