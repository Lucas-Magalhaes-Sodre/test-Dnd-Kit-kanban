/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
import TaskCard from "./TaskCard";

function ColumnContainer({ column, tasks }: any) {
  const tasksIds = useMemo(() => {
    return tasks.map((task: any) => task.id);
  }, [tasks]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="
  bg-columnBackgroundColor
  w-[350px]
  h-[500px]
  max-h-[500px]
  rounded-md
  flex
  flex-col
  "
    >
      {/* Column title */}
      <div
        className="
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      flex
      items-center
      justify-between
      "
      >
        <div className="flex gap-2">
          <div
            className="
        flex
        justify-center
        items-center
        bg-columnBackgroundColor
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            0
          </div>
          {column.title}
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto bg-slate-800">
        <SortableContext items={tasksIds}>
          {tasks.map((task: any) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
