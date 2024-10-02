import React, {createContext, ReactNode, useEffect, useState} from "react";
import {TaskListModel} from "../models/tasklist-model.tsx";
import useTaskProvider from "../hooks/useTaskProvider.ts";

type ListRendererContextType = {
    listOrder: TaskListModel[],
    setLists: (order: TaskListModel[]) => void,
    addList: (list: TaskListModel) => void,
    removeList: (id: string) => void,
    getListById: (id: string) => TaskListModel | undefined,
    createList: () => void,
}

const ListRendererContext = createContext<ListRendererContextType | undefined>(undefined)

type ListRenderProviderType = {
    children: ReactNode
}

export const ListRenderProvider: React.FC<ListRenderProviderType> = ({ children }) => {
    const [listOrder, setListOrder] = useState<TaskListModel[]>(JSON.parse(localStorage.getItem("lists")!));
    const {removeTask, getTasksByParentId} = useTaskProvider();

    useEffect(() => {
        saveToLocalStorage();
    }, [listOrder]);

    const setLists = (list: TaskListModel[]) => {
        setListOrder(list);
    }

    const addList = (list: TaskListModel) => {
        setListOrder(prevOrder => [...prevOrder, list]);
    }

    const removeList = (id: string) => {
        setListOrder(prevState => prevState.filter(list => list.id !== id));

        const tasks = getTasksByParentId(id);

        tasks.forEach(task => {
            removeTask(task.id);
        })
    }

    const getListById = (id: string) => {
        return listOrder.find(list => list.id === id);
    }

    const createList = () => {
        let id = "";

        do {
            id = (Math.random() + 1).toString(36).substring(2);
        } while ((listOrder.find(list => list.id === id)) !== undefined);

        const newList = new TaskListModel(id, `List ${listOrder.length + 1}`);
        addList(newList);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("lists", JSON.stringify(listOrder));
    }

    return (
        <ListRendererContext.Provider value={{ listOrder, addList, removeList, getListById, setLists, createList }}>
            {children}
        </ListRendererContext.Provider>
    );
};

export default ListRendererContext;
