import React, {createContext, ReactNode, useEffect, useState} from "react";
import {TaskModel} from "../models/task-model.tsx";

type TaskRendererContextType = {
    taskOrder: TaskModel[],
    addTask: (task: TaskModel) => void,
    removeTask: (id: string) => void,
    editTask: (task: TaskModel) => void,
    getTasksByParentId: (id: string) => TaskModel[],
}

const TaskRendererContext = createContext<TaskRendererContextType | undefined>(undefined)

type ListRenderProviderType = {
    children: ReactNode
}

export const TaskRenderProvider: React.FC<ListRenderProviderType> = ({ children }) => {
    const [taskOrder, setTaskOrder] = useState<TaskModel[]>([]);

    useEffect(() => {
        const tasksJson = JSON.parse(localStorage.getItem("tasks")!);

        setTaskOrder(tasksJson);
    }, []);

    const addTask = (task: TaskModel) => {
        setTaskOrder(prevState => [...prevState, task]);

        saveToLocalStorage();
    }

    const removeTask = (id: string) => {
        setTaskOrder(prevState => prevState.filter(list => list.id !== id));

        saveToLocalStorage();
    }

    const editTask = (task: TaskModel) => {
        setTaskOrder(prevState => {
            const taskIndex = prevState.findIndex(oldTask => oldTask.id = task.id);

            const updatedRenderOrder = [...prevState];

            updatedRenderOrder.splice(taskIndex, 1, task);
            return updatedRenderOrder;
        });

        saveToLocalStorage();
    }

    const getTasksByParentId = (id: string) => {
        return taskOrder.filter(task => task.parentListId === id);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(taskOrder));
    }

    return (
        <TaskRendererContext.Provider value={{ taskOrder, addTask, removeTask, editTask, getTasksByParentId }}>
            {children}
        </TaskRendererContext.Provider>
    );
};

export default TaskRendererContext;
