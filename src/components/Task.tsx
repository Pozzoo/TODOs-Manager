import React, {useState} from "react";
import {TaskModel} from "../models/task-model.tsx";
import "../css/Task.css";
import circleNotChecked from "../assets/circle-stroke-rounded.svg";
import circleChecked from "../assets/checkmark-circle-stroke-rounded.svg";
import arrowDown from "../assets/arrow-down-stroke-rounded.svg";
import arrowUp from "../assets/arrow-up-stroke-rounded.svg";
import useTaskProvider from "../hooks/useTaskProvider.ts";

type taskProps = {
    taskModel: TaskModel
}

const Task: React.FC<taskProps> = props => {
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(props.taskModel.completed);
    const [editing, setEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.taskModel.name);

    const {editTask} = useTaskProvider();

    const handleCheckmarkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        editTask({...props.taskModel, completed: !completed});
        setCompleted(!completed);
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setShowDescription(!showDescription);
    }

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setEditing(true);
    }

    const handleBlur = () => {
        setEditing(false);
        editTask({...props.taskModel, name: name});
    }

    return (
        <div className="task-container">
            <img onClick={(event) => handleCheckmarkClick(event)} src={props.taskModel.completed ? circleChecked : circleNotChecked} alt={props.taskModel.completed ? "Completed" : "Pending"}/>
            
            <div className="task-content">
                <div className="task-title-area">
                    {editing ?
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur}
                               autoFocus/>
                        : <h4 onContextMenu={(event) => handleRightClick(event)}>{props.taskModel.name}</h4>
                    }

                    {showDescription ?
                        <img src={arrowDown} onClick={(e) => handleClick(e)} alt="Show Description"/>
                        :
                        <img src={arrowUp} onClick={(e) => handleClick(e)} alt="Hide Description"/>
                    }
                </div>

                <p style={{display: showDescription ? "block" : "none"}}>{props.taskModel.description}</p>
            </div>
        </div>
    );
};

export default Task;