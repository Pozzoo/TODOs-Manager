import React, {useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import useTaskProvider from "../hooks/useTaskProvider.ts";
import Task from "../components/Task.tsx";
import {TaskModel} from "../models/task-model.tsx";
import arrowLeft from "../assets/arrow-left-stroke-rounded.svg";
import "../css/TaskListPage.css"
import useListProvider from "../hooks/useListProvider.ts";
import NewTask from "../components/NewTask.tsx";

const TaskListPage: React.FC = () => {
    const [newTaskClicked, setNewTaskClicked] = useState<boolean>(false);

    const {getTasksByParentId} = useTaskProvider();
    const {getListById} = useListProvider();
    const listId = useLoaderData() as string;

    const list = getListById(listId);

    const handleClick = () => {
        setNewTaskClicked(true);
    }

    return (
        <>
            <div className="tasklistpage-top">
                <Link to="/" className="back-arrow">
                    <img src={arrowLeft} alt="Back"/>
                </Link>

                <h2 className="title">{list?.title}</h2>
            </div>

            <div className="tasks-wrapper">
                {getTasksByParentId(listId).map((item: TaskModel) => (
                    <Task taskModel={item} key={item.id} />
                ))}

                {newTaskClicked ?
                    <NewTask parentListId={listId} setNewTaskClicked={setNewTaskClicked} />
                    :
                    <button onClick={() => handleClick()} className="button-normal-style">Add</button>
                }
            </div>
        </>
    );
};

export default TaskListPage;