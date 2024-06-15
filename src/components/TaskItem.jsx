import '../css/TaskItem.css'
import CheckmarkUnchecked from '../assets/circle-stroke-rounded.svg?react'
import CheckmarkChecked from '../assets/checkmark-circle-02-stroke-rounded.svg?react'
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const TaskItem = ({task, handleTaskCompleted}) => {
    const model = task;

    const [descVisible, setDescVisible] = useState(false);
    const [completed, setCompleted] = useState(model.completed);

    const handleClick = (e) => {
        e.stopPropagation()

        setDescVisible(!descVisible);
    }

    const handleCheckboxClick = (e) => {
        e.stopPropagation()

        setCompleted(!completed);
    }

    useEffect(() => {
        handleTaskCompleted(model, completed);
    }, [completed]);

    return(
        <div className="taskItem" onClick={handleClick}>
            <div className="firstRow">
                {completed ? (
                    <CheckmarkChecked onClick={handleCheckboxClick} className="checkmark" />
                ) : (
                    <CheckmarkUnchecked onClick={handleCheckboxClick} className="checkmark" />
                )}
                <h3 className="taskTitle">{model.title}</h3>
            </div>

            { descVisible ? (
                <p className="taskDescription">{model.description}</p>
            ) : (
                <p className="taskDescription invisible"></p>
            )}
        </div>

    );
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    handleTaskCompleted: PropTypes.func.isRequired,
}

export default TaskItem;