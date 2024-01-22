type RepoItemProps = {
    _repoName: string,
    _repoLanguages: string[],
    _repoURL: string,
}


function RepoItem({ _repoName, _repoLanguages, _repoURL }: RepoItemProps) {
    
    return (
        <div className="repo-item">
            <div>
                <a className="repo-item__link" target="new" href={_repoURL}>{_repoName}</a>
            </div>
        </div>
    );
}

export default RepoItem;