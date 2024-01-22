import React, { useContext, useEffect, useState } from 'react';
import { fetchRepos } from '../services/queries';
import { Status } from '../types/Status';
import { LanguageOption, Repository, Filter, Language } from '../types/repositoryData';
import RepoList from './RepoList';
import { UserContext } from '../contexts/UserContext';

const anyLang: LanguageOption = ["any", "Any"];
const defaultFilter = { languageId: anyLang[0], repoName: "" };

function RepoFilter() {
    const {username} = useContext(UserContext);
    
    const [alert, setAlert] = useState<string>("");
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [itemCount, setItemCount] = useState<number>(0);
    const [filter, setFilter] = useState<Filter>(defaultFilter);
    const [allLanguages, setAllLanguages] = useState<LanguageOption[]>([anyLang]);

    const filterRepos = (repositories: Repository[], { languageId: language, repoName: name }: Filter): Repository[] => {
        return repositories.filter((repo) => (
            repo.name.toLowerCase().includes(name.toLowerCase()) &&
            (language === anyLang[0] || repo.languages.includes(language))
        ));
    }

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
                setAllLanguages(allLanguages.concat(Array.from(_allLanguages).sort((a, b) => a[1].localeCompare(b[1]))));
                setRepositories(filterRepos(_repositories, filter));
                setItemCount(repositories.length);
            } else {
                setAlert(response.status.toString());
            }
        });
        return () => {
            setAllLanguages([anyLang]);
            setRepositories([]);
        }
    },
        [username]);

    useEffect(() => {
        filterRepos(repositories, filter);
        setItemCount(repositories.length);
        return () => setFilter(defaultFilter);
    }, [filter]);

    return (
        <div className="repo-filter">
            <RepoList _repositories={repositories} />
        </div>
    );
}

export default RepoFilter;
