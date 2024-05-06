/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import Dialog from "@material-ui/core/Dialog";
import { createPortal } from "react-dom";
import { Column, Task } from "../types/types";
import { defaultCols, defaultTasks } from "../utils/constants";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function Modal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      aria-labelledby={"Concluir"}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box fontWeight="bold" lineHeight="48px" color="text.primary">
            Concluir
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>Deseja concluir essa task?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="secondary">Não</Button>
        <Button color="primary">Sim</Button>
      </DialogActions>
    </Dialog>
  );
}

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);

  const [tasks, setTasks] = useState<Task[] | any>(defaultTasks);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { over }: any = event;

    if (
      over.data.current.task.columnId === "done" ||
      over.data.current.column.id === "done"
    ) {
      setShowModal(true);
    }
    setActiveTask(null);
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks: any) => {
        const activeIndex = tasks.findIndex((t: any) => t.id === activeId);
        const overIndex = tasks.findIndex((t: any) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks: any) => {
        const activeIndex = tasks.findIndex((t: any) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
"
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                tasks={tasks.filter((task: any) => task.columnId === col.id)}
              />
            ))}
          </div>
        </div>

        {createPortal(
          <DragOverlay
            dropAnimation={{
              duration: 500,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <Modal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Kanban;
