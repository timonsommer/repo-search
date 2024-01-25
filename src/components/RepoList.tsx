import { Repository } from "../types/repositoryData";
import RepoItem from "./RepoItem";
import "../styles/RepoList.scss"
import { Wind as WindIcon } from "react-feather";


type RepoListProps = {
    _repositories: Repository[];
}


function RepoList({ _repositories }: RepoListProps) {
    const isEmpty: Boolean = _repositories.length === 0;
    return (
        <div className="repo-list">
            {isEmpty ? <div className="repo-list__no-data"><WindIcon/></div> :
                _repositories.map((repo) => <RepoItem key={repo.id} name={repo.name} language={repo.language} url={repo.url} isFork={repo.isFork} />)}
        </div>
    );
}

export default RepoList;
