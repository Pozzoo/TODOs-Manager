import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './css/index.css'
import {ListRenderProvider} from "./context/ListRenderProvider.tsx";
import App from "./App.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TaskListPage from "./pages/TaskListPage.tsx";
import {TaskListModel} from "./models/tasklist-model.tsx";
import {TaskModel} from "./models/task-model.tsx";
import {TaskRenderProvider} from "./context/TaskRenderProvider.tsx";

const router = createBrowserRouter([
    {
      path: "/",
        loader: () => {
          //return fetch(API LEGAL)

            //TODO: FOR TESTING. REMOVE AFTER
                const task1 = new TaskModel("task1", "list1", "testTask1", "cool description", false, new Date("2024-09-18").toString(), new Date().toString());
                const task2 = new TaskModel("task2", "list1", "testTask2", "cool description", true, new Date("2024-09-18").toString(), new Date().toString());
                const task3 = new TaskModel("task3", "list1", "testTask3", "cool description", false, new Date("2024-09-18").toString(), new Date().toString());
                const task5 = new TaskModel("task5", "list2", "testTask5", "cool description", false, new Date("2024-09-18").toString(), new Date().toString());
                const task6 = new TaskModel("task6", "list2", "testTask6", "cool description", false, new Date("2024-09-18").toString(), new Date().toString());
                const task7 = new TaskModel("task7", "list2", "testTask7", "cool description", false, new Date("2024-09-18").toString(), new Date().toString());

                const tasks = [task1, task2, task3, task5, task6, task7];

                const list1 = new TaskListModel("list1", "testList1");
                const list2 = new TaskListModel("list2", "testList2");

                const lists = [list1, list2];

                localStorage.setItem("lists", JSON.stringify(lists));
                localStorage.setItem("tasks", JSON.stringify(tasks));

                return lists;
            //TODO: FOR TESTING. REMOVE AFTER
        },
        element: <App />
    },
    {
        path: ":listId",
        loader: ({params}) => {
            return params.listId!;
        },
        element: <TaskListPage/>
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TaskRenderProvider>
        <ListRenderProvider>
              <RouterProvider router={router} />
        </ListRenderProvider>
      </TaskRenderProvider>
  </StrictMode>
);
