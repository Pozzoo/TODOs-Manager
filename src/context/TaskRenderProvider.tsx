import React, {createContext, ReactNode, useEffect, useState} from "react";
import {TaskModel} from "../models/task-model.tsx";

type TaskRendererContextType = {
    taskOrder: TaskModel[],
    addTask: (task: TaskModel) => void,
    removeTask: (id: string) => void,
    editTask: (task: TaskModel) => void,
    getTasksByParentId: (id: string) => TaskModel[],
    createTask: (parentId: string, name: string, description: string, deadline: number) => void,
}

const TaskRendererContext = createContext<TaskRendererContextType | undefined>(undefined)

type ListRenderProviderType = {
    children: ReactNode
}

export const TaskRenderProvider: React.FC<ListRenderProviderType> = ({ children }) => {
    const [taskOrder, setTaskOrder] = useState<TaskModel[]>(JSON.parse(localStorage.getItem("tasks")!));

    useEffect(() => {
        saveToLocalStorage();
    }, [taskOrder]);

    const addTask = (task: TaskModel) => {
        setTaskOrder(prevState => [...prevState, task]);
    }

    const removeTask = (id: string) => {
        setTaskOrder(prevState => prevState.filter(list => list.id !== id));
    }

    const editTask = (task: TaskModel) => {
        setTaskOrder(prevState => {
            const taskIndex = prevState.findIndex(oldTask => oldTask.id === task.id);

            const updatedRenderOrder = [...prevState];

            updatedRenderOrder.splice(taskIndex, 1, task);
            return updatedRenderOrder;
        });
    }

    const getTasksByParentId = (id: string) => {
        return taskOrder.filter(task => task.parentListId === id);
    }


    const createTask = (parentId: string, name: string, description: string, deadline: number) => {
        let id = "";

        do {
            id = (Math.random() + 1).toString(36).substring(2);
        } while ((taskOrder.find(task => task.id === id)) !== undefined);

        const newTask = new TaskModel(id, parentId, name, description, false, Date.now(), deadline);
        addTask(newTask);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(taskOrder));
    }

    return (
        <TaskRendererContext.Provider value={{ taskOrder, addTask, removeTask, editTask, getTasksByParentId, createTask }}>
            {children}
        </TaskRendererContext.Provider>
    );
};

export default TaskRendererContext;
