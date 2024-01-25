import { Repository } from "../types/repositoryData";
import RepoItem from "./RepoItem";
import "../styles/RepoList.scss"


type RepoListProps = {
    repos: Repository[];
}


function RepoList({ repos }: RepoListProps) {
    return (
        <div className="repo-list">
            {repos.map((repo) => <RepoItem key={repo.id} repoName={repo.name} repoLanguages={repo.languages} repoURL={repo.url} isFork={repo.isFork} />)}
        </div>
    );
}

export default RepoList;
