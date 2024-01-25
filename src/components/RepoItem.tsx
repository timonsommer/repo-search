import "../styles/RepoItem.scss"
import { Book as BookIcon } from "react-feather";

type RepoItemProps = {
    name: string,
    url: string,
    isFork: boolean,
    language: string
}


function RepoItem({ name, url, isFork, language }: RepoItemProps) {

    return (
        <a className="repo-item" target="new" href={url}>
            {/* <div> */}
            <div className="repo-item__icon">
                <BookIcon />
            </div>
            <h3>
                {name}
            </h3>
            {/* </div> */}
            {isFork && <div className="repo-item__fork-badge">
                forked
            </div>}
        </a>
    );
}

export default RepoItem;