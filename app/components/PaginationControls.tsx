import Link from 'next/link';

// Define the props the component will accept
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    // We can add perPage here later if needed
};

// This is a simple Server Component, so no 'use client' needed
export default function PaginationControls({
                                               currentPage,
                                               totalPages,
                                           }: PaginationProps) {

    // Don't render controls if there's only one page
    if (totalPages <= 1) {
        return null;
    }

    const hasPrevPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return (
        <div className="flex justify-center items-center gap-4 my-8">
            {/* Previous Page Link */}
            <Link
                href={`/?page=${currentPage - 1}`}
                className={`px-4 py-2 rounded-lg ${
                    !hasPrevPage
                        ? 'pointer-events-none bg-gray-200 text-gray-400'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                Previous
            </Link>

            {/* Page Number Indicator */}
            <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

            {/* Next Page Link */}
            <Link
                href={`/?page=${currentPage + 1}`}
                className={`px-4 py-2 rounded-lg ${
                    !hasNextPage
                        ? 'pointer-events-none bg-gray-200 text-gray-400'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                Next
            </Link>
        </div>
    );
}