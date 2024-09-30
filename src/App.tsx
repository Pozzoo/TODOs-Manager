import ListPage from "./pages/ListPage.tsx";
import {useLoaderData} from "react-router-dom";
import {TaskListModel} from "./models/tasklist-model.tsx";
import useListProvider from "./hooks/useListProvider.ts";
import {useEffect} from "react";

const App = () => {
    const lists = useLoaderData() as TaskListModel[];
    const {setLists} = useListProvider();

    useEffect(() => {
        setLists(lists);
    }, []);

    return (
        <ListPage/>
    );
};

export default App;