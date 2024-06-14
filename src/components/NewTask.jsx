import '../css/NewTask.css'
import Calendar from '../assets/calendar.svg?react';
import {TaskModel} from "../models/task-model.jsx";
import {useState} from "react";
import PropTypes from "prop-types";

const NewTask = ({ onAddTask }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const clickHandler = () => {
        const task = new TaskModel(title, description);
        onAddTask(task);

        setTitle('');
        setDescription('');
    }

    return (
        <div className="newTask">
            <div className="inputs">
                <input
                    type="text"
                    className="newTaskTitle"
                    placeholder="Task Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br/>
                <input
                    type="text"
                    className="newTaskDescription"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="buttons">
                <button className="deadlineButton">
                    <div>
                        <Calendar className="calendar"/>
                        <p>Deadline</p>
                    </div>
                </button>
                <button className="addButton" onClick={clickHandler}>Add</button>
            </div>
        </div>
    );
}

NewTask.propTypes = {
    onAddTask: PropTypes.func.isRequired,
}

export default NewTask