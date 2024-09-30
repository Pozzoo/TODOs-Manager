import React, {createContext, ReactNode, useEffect, useState} from "react";
import {TaskListModel} from "../models/tasklist-model.tsx";

type ListRendererContextType = {
    listOrder: TaskListModel[],
    setLists: (order: TaskListModel[]) => void,
    addList: (list: TaskListModel) => void,
    removeList: (id: string) => void,
    getListById: (id: string) => TaskListModel | undefined,
}

const ListRendererContext = createContext<ListRendererContextType | undefined>(undefined)

type ListRenderProviderType = {
    children: ReactNode
}

export const ListRenderProvider: React.FC<ListRenderProviderType> = ({ children }) => {
    const [listOrder, setListOrder] = useState<TaskListModel[]>([]);

    useEffect(() => {
        const listsJson = JSON.parse(localStorage.getItem("lists")!);

        setListOrder(listsJson);
    }, []);

    const setLists = (list: TaskListModel[]) => {
        setListOrder(list);
    }

    const addList = (list: TaskListModel) => {
        setListOrder(prevOrder => [...prevOrder, list]);
    }

    const removeList = (id: string) => {
        setListOrder(prevState => prevState.filter(list => list.id !== id));
    }

    const getListById = (id: string) => {
        return listOrder.find(list => list.id === id);
    }

    return (
        <ListRendererContext.Provider value={{ listOrder, addList, removeList, getListById, setLists }}>
            {children}
        </ListRendererContext.Provider>
    );
};

export default ListRendererContext;
