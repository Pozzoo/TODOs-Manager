import {TaskListModel} from "../models/tasklist-model.tsx";
import TaskList from "../components/TaskList.tsx";
import useListProvider from "../hooks/useListProvider.ts";

const ListPage = () => {
    const { listOrder } = useListProvider();

    return (
        <>
            <h1>TODOs MANAGER</h1>
            <div className="tasklist-wrapper">
                {listOrder.map((item: TaskListModel) => (
                    <TaskList key={item.id} listModel={item}/>
                ))}
            </div>
        </>
    );
};

export default ListPage;