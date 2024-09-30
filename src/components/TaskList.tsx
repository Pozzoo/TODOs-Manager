import React from "react";
import {TaskListModel} from "../models/tasklist-model.js";
import {Link} from "react-router-dom";

type TaskListProps = {
    listModel: TaskListModel
}

const TaskList: React.FC<TaskListProps> = props => {

    return (
        <Link to={props.listModel.id}>
            <div className="tasklist-container">
                <h4>{props.listModel.title}</h4>
            </div>
        </Link>
    );
};

export default TaskList;