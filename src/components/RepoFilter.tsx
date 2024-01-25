import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { fetchRepos } from '../services/queries';
import { Status } from '../types/Status';
import { Repository, Filter } from '../types/repositoryData';
import RepoList from './RepoList';
import { UserContext } from '../contexts/UserContext';
import { useDebouncedCallback } from 'use-debounce';
import { Filter as FilterIcon, Code as CodeIcon } from 'react-feather';
import IconInput from './IconInput';
import "../styles/RepoFilter.scss";
import Pagination from './Pagination';
import AlertCard from './AlertCard';

const defaultFilter = { language: "", repoName: "" };

function RepoFilter() {
    const { username } = useContext(UserContext);

    const [alert, setAlert] = useState<string>("");
    const [repositories, setRepositories] = useState<Repository[] | null>(null);
    const [itemCount, setItemCount] = useState<number>(0);
    const [filter, setFilter] = useState<Filter>(defaultFilter);

    const handleNameInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFilter({ repoName: e.target.value.trim(), language: filter.language });
    }, 500);

    const handleLangInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFilter({ repoName: filter.repoName, language: e.target.value });
    }, 500);

    useEffect(() => {
        let inProgess = true;
        setRepositories(null);
        fetchRepos(username, filter.repoName, filter.language).then((response) => {
            console.log(response);
            if (response.data && response.status === Status.SUCCESS) {
                const searchData = response.data.search;
                return searchData.repos.map((node) => node.repo)
                    .map((repo) => {
                        return { id: repo.id, name: repo.name, language: repo.language.name, url: repo.url, isFork: repo.isFork };
                    });

            } else {
                setAlert(response.status.toString());
                return null;
            }
        }).then((repos) => {
            if (inProgess)
                setRepositories(repos);
        })

        return () => {
            inProgess = false;
            setRepositories(null);
            setItemCount(0);
            setAlert("");
            // setFilter(defaultFilter);
        }
    }, [username, filter]);


    let hasNoRepos = itemCount === 0;

    return (
        <div className={`repo-filter${!username ? " faded" : ""}`}>
            <div className="repo-filter__options">
                <IconInput className="repo-filter__options__name" leftIcon={<FilterIcon />}>
                    <input type="search" onChange={(e) => handleNameInput(e)} placeholder="Filter by repository name" />
                </IconInput>
                <IconInput className="repo-filter__options__lang" leftIcon={<CodeIcon />}>
                    <input type="search" onChange={(e) => handleLangInput(e)} placeholder="Filter by language" />
                </IconInput>
            </div>

            {repositories && <RepoList _repositories={repositories} />}
            <Pagination totalCount={itemCount} />
        </div>
    );
}

export default RepoFilter;
