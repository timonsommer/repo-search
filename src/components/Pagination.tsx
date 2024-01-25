import "../styles/Pagination.scss";

type PaginationProps = {
    totalCount: number;
}

function Pagination({ totalCount }: PaginationProps) {
    return (
        <div className="pagination">
            {totalCount} {totalCount === 1 ? "result" : "results"}
        </div>
    );
}

export default Pagination;