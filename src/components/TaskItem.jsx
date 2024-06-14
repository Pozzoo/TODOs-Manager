import '../css/TaskItem.css'
import CheckmarkUnchecked from '../assets/circle-stroke-rounded.svg?react'
import PropTypes from "prop-types";
import {useState} from "react";

const TaskItem = ({task}) => {
    const model = task;

    const [descVisible, setDescVisible] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation()

        descVisible ? setDescVisible(!descVisible) : setDescVisible(!descVisible);
    }

    return(
        <div className="taskItem" onClick={handleClick}>
            <div className="firstRow">
                <CheckmarkUnchecked className="checkmark" />
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
}

export default TaskItem;