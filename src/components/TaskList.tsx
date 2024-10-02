import React, {useState} from "react";
import {TaskListModel} from "../models/tasklist-model.js";
import {useNavigate} from "react-router-dom";
import trashCan from "../assets/delete-stroke-rounded.svg"
import "../css/TaskList.css"
import useListProvider from "../hooks/useListProvider.ts";

type TaskListProps = {
    listModel: TaskListModel
}

const TaskList: React.FC<TaskListProps> = props => {
    const [isRightClicked, setRightClicked] = useState<boolean>(false);
    const [deleteClass, setDeleteClass] = useState<string>("tasklist-delete-area show-animation");
    const {removeList} = useListProvider();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`/${props.listModel.id}`);
    }

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isRightClicked) {
            setDeleteClass("tasklist-delete-area hide-animation");

            setTimeout(() => setRightClicked(false), 500);
            return;
        }

        setRightClicked(true);
        setDeleteClass("tasklist-delete-area show-animation");
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        removeList(props.listModel.id);
    }

    const tasklistDeleteArea =
        <div className={deleteClass} onClick={(e) => handleDeleteClick(e)}>
            <button className="button-transparent">
                <img src={trashCan} alt="Delete"/>
            </button>
        </div>

    return (
        <div className="tasklist-container" onClick={(e) => handleClick(e)} onContextMenu={(e) => handleRightClick(e)}>
            <div className="tasklist-content-left">
                <h3>{props.listModel.title}</h3>
                <p>Completed: 0</p>
                <p>Pending: 0</p>
            </div>

            {isRightClicked ? tasklistDeleteArea : null}
        </div>

    );
};

export default TaskList;