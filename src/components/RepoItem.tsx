import { Repository } from "../types/repositoryData";


type RepoItemProps = {
    _repoName: string,
    _repoLanguages: string[],
    _repoURL: string,
}


function RepoItem({ _repoName, _repoLanguages, _repoURL }: RepoItemProps) {
    
    return (
        <div className="repo-item">
            <div>
                {_repoName}
            </div>
        </div>
    );
}

export default RepoItem;