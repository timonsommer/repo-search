import { ReactNode } from "react";
import "../styles/ListStatus.scss";

type ListStatusProps = {
    icon: ReactNode,
    statusText?: string,
    isSpinning?: boolean,
}

function ListStatus({ statusText, icon, isSpinning }: ListStatusProps) {
    return (
        <div className="list-status">
            <div className={`list-status__icon ${isSpinning ? "spinning" : ""}`}>{icon}</div> {statusText}
        </div>
    );
}

export default ListStatus;