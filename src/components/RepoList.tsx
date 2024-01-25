import { Repository } from "../types/repository";
import RepoItem from "./RepoItem";
import "../styles/RepoList.scss";

type RepoListProps = {
  repos: Repository[];
};

function RepoList({ repos }: RepoListProps) {
  return (
    <ul className="repo-list">
      {repos.map((repo) => (
        <RepoItem
          key={repo.id}
          repoName={repo.name}
          repoLanguages={repo.languages}
          repoURL={repo.url}
          isFork={repo.isFork}
        />
      ))}
    </ul>
  );
}

export default RepoList;
