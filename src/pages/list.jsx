import '../css/list.css';
import ArrowLeft from '../assets/arrow-left.svg?react'
import {useLocation, useNavigate} from "react-router-dom";
import NewTask from "../components/NewTask.jsx";
import TaskItem from "../components/TaskItem.jsx";
import {useState, useEffect} from "react";

const List = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const model = location.state;

    // Create state for tasks
    const [tasks, setTasks] = useState(model?.tasks || []);

    useEffect(() => {
        if (model) {
            setTasks(model.tasks);
        }
    }, [model]);

    function handleArrowClick() {
        navigate('/');
    }

    function handleNewTask(task) {
        if (!task.title) return;

        setTasks([...tasks, task]);
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
                            <TaskItem task={task}/>
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

export default List;