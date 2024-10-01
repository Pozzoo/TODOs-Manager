import React from "react";
import {TaskListModel} from "../models/tasklist-model.js";
import {useNavigate} from "react-router-dom";
import "../css/TaskList.css"

type TaskListProps = {
    listModel: TaskListModel
}

const TaskList: React.FC<TaskListProps> = props => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`/${props.listModel.id}`);
    }

    return (
        <div className="tasklist-container" onClick={(e) => handleClick(e)}>
            <div className="tasklist-content-left">
                <h3>{props.listModel.title}</h3>
                <p>Completed: 0</p>
                <p>Pending: 0</p>
            </div>

        </div>

    );
};

export default TaskList;