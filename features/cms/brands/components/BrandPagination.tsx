import {
    ChevronLeft,
    ChevronsLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import type { Pagination } from "../types/brand";

type Props = {
    pagination: Pagination;
    handlePageChange: (page: number) => void;
};

export default function BrandPagination({
    pagination,
    handlePageChange,
}: Props) {
    return (
        <div className="intro-y col-span-12 flex justify-center items-center mt-5">
            <nav className="w-auto">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.current_page === 1}
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>
                    </li>

                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() =>
                                handlePageChange(pagination.current_page - 1)
                            }
                            disabled={pagination.current_page === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    </li>

                    {Array.from({ length: pagination.last_page }).map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${pagination.current_page === i + 1 ? "active" : ""
                                }`}
                        >
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() =>
                                handlePageChange(pagination.current_page + 1)
                            }
                            disabled={
                                pagination.current_page === pagination.last_page
                            }
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </li>

                    <li className="page-item">
                        <button
                            type="button"
                            className="page-link"
                            onClick={() =>
                                handlePageChange(pagination.last_page)
                            }
                            disabled={
                                pagination.current_page === pagination.last_page
                            }
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}