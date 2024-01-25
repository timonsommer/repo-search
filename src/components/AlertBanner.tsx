import { Status } from "../types/Status";
import { AlertOctagon as AlertOctagonIcon, XOctagon as XOctagonIcon } from "react-feather";
import "../styles/AlertBanner.scss";

type AlertCardProps = {
    alertType: Status;
}

function AlertBanner({ alertType }: AlertCardProps) {
    return (
        <div className="alert-banner">
            {[Status.NO_ENTRIES, Status.UNKNOWN_USER].includes(alertType) && <AlertOctagonIcon />}
            {[Status.GENERAL_ERROR, Status.QUERY_ERROR].includes(alertType) && <XOctagonIcon />}
            {alertType.toString()}
        </div>
    );
}

export default AlertBanner;