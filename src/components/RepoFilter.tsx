import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { fetchRepos } from '../services/queries';
import { Status } from '../types/Status';
import { LanguageOption, Repository, Filter, Language } from '../types/repositoryData';
import RepoList from './RepoList';
import { UserContext } from '../contexts/UserContext';
import { useDebouncedCallback } from 'use-debounce';
import { Filter as FilterIcon, Code as CodeIcon, ChevronDown as ChevronDownIcon } from 'react-feather';
import IconInput from './IconInput';
import "../styles/RepoFilter.scss";
import Pagination from './Pagination';
import AlertCard from './AlertCard';

const anyLang: LanguageOption = ["any", "Any language"];
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
        setFilter({ repoName: e.target.value.trim(), languageId: filter.languageId });
    }, 400);

    const handleLangInput = useDebouncedCallback((e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setFilter({ repoName: filter.repoName, languageId: e.target.value });
    }, 400);

    useEffect(() => {
        fetchRepos(username).then((response) => {
            console.log(response);
            if (response.data && response.status === Status.SUCCESS) {
                const edges = response.data.repositoryOwner.repositories.edges;
                const _allLanguages: Map<string, Language> = new Map();
                const _repositories: Repository[] = edges.map((edge) => edge.node).map((node) => {
                    const _languages: Language[] = node.languages.edges.map((edge) => {
                        if (!_allLanguages.has(edge.node.id)) _allLanguages.set(edge.node.id, edge.node.name);
                        return edge.node.id;
                    });
                    return { id: node.id, name: node.name, languages: _languages, url: node.url, isFork: node.isFork };
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
            setItemCount(0);
            setAlert("");
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

    let hasNoLangs: boolean = allLanguages.length === 1;

    return (
        <> {alert ? <AlertCard alertType={alert} /> :
            <div className={`repo-filter${!username ? " faded" : ""}`}>
                <div className="repo-filter__options">
                    <IconInput className="repo-filter__options__name" leftIcon={<FilterIcon />}>
                        <input type="search" onChange={(e) => handleNameInput(e)} placeholder="Filter by repository name" disabled={hasNoLangs} />
                    </IconInput>
                    <IconInput className="repo-filter__options__lang" leftIcon={<CodeIcon />} rightIcon={!hasNoLangs && <ChevronDownIcon />}>
                        <select onChange={(e) => handleLangInput(e)} disabled={hasNoLangs}>
                            {allLanguages.map((lang) =>
                                <option key={lang[0]} value={lang[0]}>{lang[1]}</option>
                            )}
                        </select>
                    </IconInput>
                </div>

                <RepoList _repositories={filteredRepos} />
                <Pagination totalCount={itemCount} />
            </div>
        } </>
    );
}

export default RepoFilter;
