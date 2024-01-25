import React, { ChangeEvent, useEffect, useState } from "react";
import { fetchRepos } from "../services/queries";
import { Status } from "../types/Status";
import {
  LanguageOption,
  Repository,
  Filter,
  Language,
} from "../types/repositoryData";
import RepoList from "./RepoList";
import {
  Filter as FilterIcon,
  Code as CodeIcon,
  ChevronDown as ChevronDownIcon,
  Loader as LoaderIcon,
  XSquare as XSquareIcon,
} from "react-feather";
import IconInput from "./IconInput";
import "../styles/RepoFilter.scss";
import Pagination from "./Pagination";
import AlertBanner from "./AlertBanner";
import ListStatus from "./ListStatus";
import { ENTRIES_PER_PAGE } from "../services/queries";

const anyLang: LanguageOption = ["any", "Any language"];
const defaultFilter = { languageId: anyLang[0], repoName: "" };

type RepoFilterProps = {
  userQuery: string;
};

function RepoFilter({ userQuery }: RepoFilterProps) {
  const [alert, setAlert] = useState<Status | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [allLanguages, setAllLanguages] = useState<LanguageOption[]>([anyLang]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const nextPage = () => setPage(page + 1);

  const filterRepos = (
    repositories: Repository[],
    { languageId: language, repoName: name }: Filter,
  ): Repository[] => {
    return repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(name.toLowerCase()) &&
        (language === anyLang[0] || repo.languages.includes(language)),
    );
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      repoName: e.target.value.trim(),
      languageId: filter.languageId,
    });
  };

  const handleLangInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter({ repoName: filter.repoName, languageId: e.target.value });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRepos(userQuery).then((response) => {
      console.log(response);
      if (response.data && response.status === Status.SUCCESS) {
        const repoData = response.data.result.repoData;
        const _allLanguages: Map<string, Language> = new Map();
        const _repositories: Repository[] = repoData.edges
          .map((repoNode) => repoNode.repo)
          .map((repo) => {
            const _languages: Language[] = repo.languageData.langs.map(
              (langNode) => {
                if (!_allLanguages.has(langNode.lang.id))
                  _allLanguages.set(langNode.lang.id, langNode.lang.name);
                return langNode.lang.id;
              },
            );
            return {
              id: repo.id,
              name: repo.name,
              languages: _languages,
              url: repo.url,
              isFork: repo.isFork,
            };
          });
        setAllLanguages(
          [anyLang].concat(
            Array.from(_allLanguages).sort((a, b) => a[1].localeCompare(b[1])),
          ),
        );
        setRepositories(_repositories);
        setFilteredRepos(filterRepos(_repositories, filter));
      } else {
        setAlert(response.status);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredRepos(filterRepos(repositories, filter));
    return () => {
      setPage(1);
    };
  }, [filter]);

  return (
    <>
      {" "}
      {alert ? (
        <AlertBanner alertType={alert} />
      ) : (
        <div className="repo-filter">
          <div className={`repo-filter__options ${isLoading ? "faded" : ""}`}>
            <IconInput
              className="repo-filter__options__name"
              leftIcon={<FilterIcon />}
            >
              <input
                type="search"
                onChange={(e) => handleNameInput(e)}
                placeholder="Filter by repository name"
              />
            </IconInput>
            <IconInput
              className="repo-filter__options__lang"
              leftIcon={<CodeIcon />}
              rightIcon={<ChevronDownIcon />}
            >
              <select onChange={(e) => handleLangInput(e)}>
                {allLanguages.map((lang) => (
                  <option key={lang[0]} value={lang[0]}>
                    {lang[1]}
                  </option>
                ))}
              </select>
            </IconInput>
          </div>
          {isLoading && (
            <ListStatus
              statusText="Loading results..."
              icon={<LoaderIcon />}
              isSpinning
            />
          )}
          {!isLoading && filteredRepos.length === 0 && (
            <ListStatus
              statusText="No matching repositories found."
              icon={<XSquareIcon />}
            />
          )}
          {!isLoading && filteredRepos.length !== 0 && (
            <RepoList repos={filteredRepos.slice(0, ENTRIES_PER_PAGE * page)} />
          )}
          <Pagination
            totalCount={filteredRepos.length}
            currentCount={Math.min(
              ENTRIES_PER_PAGE * page,
              filteredRepos.length,
            )}
            loadMore={nextPage}
          />
        </div>
      )}{" "}
    </>
  );
}

export default RepoFilter;
