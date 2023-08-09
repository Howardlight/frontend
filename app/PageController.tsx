"use client";
import { SetStateAction, Dispatch } from "react";

export function PageController({ setPage, page, totalPages }: { setPage: Dispatch<SetStateAction<number>>; page: number; totalPages: number | undefined; }) {

    function incrementPage() {
        setPage(page + 1);
    }

    function decrementPage() {
        setPage(page - 1);
    }

    if (!totalPages) return <LoadingPageController />;
    return (
        <div className="flex flex-row justify-center items-center gap-3 mt-5 h-12 bg-gray-100 rounded-sm">
            <button disabled={page <= 0} onClick={decrementPage} className="p-2 font-medium bg-gray-200 rounded-sm hover:bg-gray-300">Previous</button>
            <p className="font-semibold text-lg pl-2 pr-2 pt-1 pb-1 bg-gray-200 rounded-sm">{page + 1}</p>
            <button disabled={page + 1 >= totalPages} onClick={incrementPage} className="p-2 font-medium bg-gray-200 rounded-sm hover:bg-gray-300">Next</button>
        </div>
    );
}

function LoadingPageController() {
    return (
        <div className="flex flex-row justify-center items-center gap-3 mt-5 h-12 bg-gray-100 rounded-sm">
            <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-sm" />
            <div className="animate-pulse h-10 w-8  bg-gray-200 rounded-sm" />
            <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-sm" />
        </div>
    )
}
