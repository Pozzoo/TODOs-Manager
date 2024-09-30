import React from "react";
import {TaskModel} from "../models/task-model.tsx";

type taskProps = {
    taskModel: TaskModel
}

const Task: React.FC<taskProps> = props => {
    return (
        <div className="task-container">
            <h4>{props.taskModel.name}</h4>
            <p>{props.taskModel.description}</p>
        </div>
    );
};

export default Task;