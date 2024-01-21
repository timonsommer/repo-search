import { Repository } from "../types/repositoryData";
import RepoItem from "./RepoItem";


type RepoListProps = {
    _repositories: Repository[];
}


function RepoList({ _repositories }: RepoListProps) {
    const isEmpty: Boolean = _repositories.length === 0;
    return (
        <div className="repo-list">
            {isEmpty ? <div className="repo-list__no-data">No matching repositories found.</div> :
                _repositories.map((repo) => <RepoItem key={repo.id} _repoName={repo.name} _repoLanguages={repo.languages} _repoURL={repo.url} />)}
        </div>
    );
}

export default RepoList;
