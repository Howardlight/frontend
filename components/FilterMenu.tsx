"use client";
import { Fragment, useRef, Dispatch, SetStateAction } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IconChevronDown, IconCalendar, IconSquareMinus, IconSquareCheck, IconCalendarDue, IconBaselineDensitySmall } from "@tabler/icons-react";
import { Filter } from "@/types/Filter";

export function FilterMenu({ setFilter, setPage }: {
    setFilter: Dispatch<SetStateAction<Filter>>;
    setPage: Dispatch<SetStateAction<number>>;
}) {
    const buttonContent = useRef("Filter by");

    function sortByComplete(order: "asc" | "desc") {
        setFilter({
            completed: order,
            date: undefined
        });
        setPage(0);
        buttonContent.current = order === "asc" ? "Incomplete" : "Complete";
    }

    function sortNoFilter() {
        setFilter({
            completed: undefined,
            date: undefined
        });
        setPage(0);
        buttonContent.current = "Filter by";
    }

    function sortByDate(order: "asc" | "desc") {
        setFilter({
            completed: undefined,
            date: order
        });
        setPage(0);
        buttonContent.current = order === "asc" ? "Ascending" : "Descending";
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-sm bg-gray-200 px-4 py-2 hover:bg-gray-300">
                    {buttonContent.current}
                    <IconChevronDown
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => sortByComplete("desc")}
                                    className={`${active ? 'bg-gray-300 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {active ? (
                                        <IconSquareCheck
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    ) : (
                                        <IconSquareCheck
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    )}
                                    Complete
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => sortByComplete("asc")}
                                    className={`${active ? 'bg-gray-300 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {active ? (
                                        <IconSquareMinus
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    ) : (
                                        <IconSquareMinus
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    )}
                                    InComplete
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => sortByDate("asc")}
                                    className={`${active ? 'bg-gray-300 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {active ? (
                                        <IconCalendarDue
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    ) : (
                                        <IconCalendarDue
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    )}
                                    Ascending
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => sortByDate("desc")}
                                    className={`${active ? 'bg-gray-300 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {active ? (
                                        <IconCalendar
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    ) : (
                                        <IconCalendar
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    )}
                                    Descending
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => sortNoFilter()}
                                    className={`${active ? 'bg-gray-300 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {active ? (
                                        <IconBaselineDensitySmall
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    ) : (
                                        <IconBaselineDensitySmall
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true" />
                                    )}
                                    No Filter
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
