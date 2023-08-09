"use client";

import { useGetTasksQuery } from "../redux/services/taskApi";
import CreateModal from "@/components/modals/CreateModal";
import { useState } from "react";
import { PageController } from "./PageController";
import { Filter } from "@/types/Filter";
import { FilterMenu } from "../components/FilterMenu";
import { Tasks } from "./Tasks";

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<Filter>({ completed: undefined, date: undefined })
  const { isLoading, isFetching, data, error } = useGetTasksQuery({ offset: page * 9, filter: filter });

  return (
    <main className="m-5 h-full">

      <div className="flex flex-row justify-between items-center p-2 mb-5 bg-gray-100 rounded-sm">
        <p className="text-lg font-bold">Task Manager</p>
        <div className="flex flex-row items-center gap-2">
          <FilterMenu setFilter={setFilter} setPage={setPage} />
          <button onClick={() => setIsCreateModalOpen(true)} className="transition p-2 rounded-sm bg-gray-200 hover:bg-gray-300 shadow-sm">Create</button>
        </div>
      </div>

      <Tasks isFetching={isFetching} isLoading={isLoading} error={error} tasksData={data?.data!} />


      <PageController page={page} setPage={setPage} totalPages={data?.paging.pages} />
      <CreateModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />
    </main >
  )
}

