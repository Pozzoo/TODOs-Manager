import '../css/list.css';
import ArrowLeft from '../assets/arrow-left.svg?react'
import {useLocation, useNavigate} from "react-router-dom";
import NewTask from "../components/NewTask.jsx";
import TaskItem from "../components/TaskItem.jsx";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";

const List = ({handleUpdate}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const model = location.state;

    const [tasks, setTasks] = useState(model?.tasks || []);

    useEffect(() => {
        handleUpdate(tasks, model);
    }, [tasks]);

    const handleArrowClick = () => {
        navigate('/');
    }

    const handleNewTask = (task) => {
        if (!task?.title) return;

        setTasks([...tasks, task]);
    }

    const handleTaskCompleted = (taskToUpdate, state) => {
        setTasks(tasks => {return tasks.map(task => task === taskToUpdate ? {...task, completed: state} : task)});


    }

    return (
        <div className="app">
            <div className="topBar">
                <ArrowLeft className="arrowLeft" onClick={handleArrowClick}/>
                <h2>{model.title}</h2>
            </div>
            <div className="tasks">
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <TaskItem task={task} handleTaskCompleted={handleTaskCompleted}/>
                        </li>
                    ))}
                    <li>
                        <NewTask onAddTask={handleNewTask} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

List.propTypes = {
    handleUpdate: PropTypes.func.isRequired,
}

export default List;