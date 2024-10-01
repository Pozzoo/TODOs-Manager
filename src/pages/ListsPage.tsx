import {TaskListModel} from "../models/tasklist-model.tsx";
import TaskList from "../components/TaskList.tsx";
import useListProvider from "../hooks/useListProvider.ts";
import "../css/ListsPage.css"

const ListsPage = () => {
    const { listOrder, createList } = useListProvider();

    const handleNewButton = () => {
        createList();
    }

    return (
        <>
            <div className="tasklist-wrapper">
                {listOrder.map((item: TaskListModel) => (
                    <TaskList key={item.id} listModel={item}/>
                ))}
            </div>

            <button className="button-normal-style" onClick={() => handleNewButton()}>New</button>

        </>
    );
};

export default ListsPage;