import "../styles/RepoItem.scss"
import { Book as BookIcon } from "react-feather";

type RepoItemProps = {
    _repoName: string,
    _repoLanguages: string[],
    _repoURL: string,
    _isFork: boolean
}


function RepoItem({ _repoName, _repoLanguages, _repoURL, _isFork }: RepoItemProps) {

    return (
        <a className="repo-item" target="new" href={_repoURL}>
            {/* <div> */}
            <div className="repo-item__icon">
                <BookIcon />
            </div>
            <h3>
                {_repoName}
            </h3>
            {/* </div> */}
            {_isFork && <div className="repo-item__fork-badge">
                forked
            </div>}
        </a>
    );
}

export default RepoItem;