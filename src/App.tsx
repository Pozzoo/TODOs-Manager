import "./css/App.css"
import ListsPage from "./pages/ListsPage.tsx";
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
        <div className="app-container">
            <h1>TODOs MANAGER</h1>
            <ListsPage/>
        </div>

);
};

export default App;