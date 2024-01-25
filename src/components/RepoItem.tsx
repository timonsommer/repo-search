import "../styles/RepoItem.scss"
import { Book as BookIcon } from "react-feather";

type RepoItemProps = {
    repoName: string,
    repoLanguages: string[],
    repoURL: string,
    isFork: boolean
}


function RepoItem({ repoName, repoLanguages, repoURL, isFork }: RepoItemProps) {

    return (
        <a className="repo-item" target="new" href={repoURL}>
            <div className="repo-item__icon">
                <BookIcon />
            </div>
            <h3 className="repo-item__title">
                {repoName}
            </h3>
            {isFork && <div className="repo-item__fork-badge">
                forked
            </div>}
        </a>
    );
}

export default RepoItem;