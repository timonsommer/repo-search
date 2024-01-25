import "../styles/Pagination.scss";
import { ArrowDown as ArrowDownCircleIcon } from "react-feather";

type PaginationProps = {
    totalCount: number,
    currentCount: number,
    loadMore: () => void,
}

function Pagination({ totalCount, currentCount, loadMore }: PaginationProps) {
    let hasMore = totalCount > currentCount;
    return (
        <div className="pagination">
            <p>Showing {currentCount} of {totalCount} {totalCount === 1 ? "result" : "results"}</p>
            {<button className="pagination__more" onClick={loadMore} disabled={!hasMore}><ArrowDownCircleIcon />More</button>}
        </div>
    );
}

export default Pagination;