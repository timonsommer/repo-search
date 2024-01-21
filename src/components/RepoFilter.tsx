import React, { useEffect, useState } from 'react';
import { fetchRepos } from '../services/queries';
import { Status } from '../types/Status';

type RepoListProps = {
    _username: string
}

type Repository = {
    id: string,
    name: string,
    languages: Language[],
    url: string
}

type LanguageOption = [
    id: Language,
    name: string
]

type Language = string;

type Filter = {
    languageId: Language,
    repoName: string
}

function RepoFilter({ _username }: RepoListProps) {
    const anyLang: LanguageOption = ["any", "Any"];
    const defaultFilter = { languageId: anyLang[0], repoName: "" };

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
        fetchRepos(_username).then((response) => {
            console.log(response);
            if (response.data && response.status === Status.SUCCESS) {
                setItemCount(response.data.user.repositories.totalCount);
                const edges = response.data.user.repositories.edges;
                const _allLanguages: Map<string, Language> = new Map([anyLang]);
                const _repositories: Repository[] = edges.map((edge) => edge.node).map((node) => {
                    const _languages: Language[] = node.languages.edges.map((edge) => {
                        if (!_allLanguages.has(edge.node.id)) _allLanguages.set(edge.node.id, edge.node.name);
                        return edge.node.id;
                    });
                    return { id: node.id, name: node.name, languages: _languages, url: node.url };
                });
                setAllLanguages(allLanguages.concat(Array.from(_allLanguages).sort((a, b) => a[1].localeCompare(b[1]))));
                setRepositories(filterRepos(_repositories, filter));
                console.log(repositories);
            } else {
                setAlert(response.status.toString());
            }
        });
        // console.log(repositories);
        return () => {
            setAllLanguages([anyLang]);
            setRepositories([]);
        }
    },
        []);

    useEffect(() => {
        filterRepos(repositories, filter);
        return () => setFilter(defaultFilter);
    }, [filter]);

    return (
        <div className="card-list">
            {repositories.toString()}
        </div>
    );
}

export default RepoFilter;
