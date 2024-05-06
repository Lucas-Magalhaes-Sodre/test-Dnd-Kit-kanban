import { Column, Task } from "../types/types";

export const defaultCols: Column[] = [
  {
    id: "todo",
    title: "A Fazer",
  },
  {
    id: "doing",
    title: "Em Progresso",
  },
  {
    id: "done",
    title: "Concluído",
  },
];

const defaultTasks: Task[] = [];

const addTask = (id: number | string, columnId: string, content: string) => {
  defaultTasks.push({ id: id.toString(), columnId, content });
};

for (let i = 1; i <= 500; i++) {
  addTask(i, "todo", `Task ${i}`);
}

export { defaultTasks };

// export const defaultTasks: Task[] = [
//   {
//     id: "1",
//     columnId: "todo",
//     content: "Task 1",
//   },
//   {
//     id: "2",
//     columnId: "todo",
//     content: "Task 2",
//   },
//   {
//     id: "3",
//     columnId: "doing",
//     content: "Task 3",
//   },
//   {
//     id: "4",
//     columnId: "doing",
//     content: "Task 4",
//   },
//   {
//     id: "5",
//     columnId: "todo",
//     content: "Task 5",
//   },
//   {
//     id: "6",
//     columnId: "todo",
//     content: "Task 6",
//   },
//   {
//     id: "7",
//     columnId: "todo",
//     content: "Task 7",
//   },
//   {
//     id: "8",
//     columnId: "todo",
//     content: "Task 8",
//   },
//   {
//     id: "9",
//     columnId: "todo",
//     content: "Task 9",
//   },
//   {
//     id: "10",
//     columnId: "todo",
//     content: "Task 10",
//   },
// ];
