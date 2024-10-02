import React, {FormEvent} from "react";
import useTaskProvider from "../hooks/useTaskProvider.ts";
import cancelButton from "../assets/cancel-square-stroke-rounded.svg";
import "../css/NewTask.css";

type NewTaskProps = {
    parentListId: string,
    setNewTaskClicked:  React.Dispatch<React.SetStateAction<boolean>>
}

const NewTask: React.FC<NewTaskProps> = props => {
    const {createTask} = useTaskProvider();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const target = e.target as typeof e.target & {
            taskName: { value: string };
            taskDescription: { value: string };
            taskDeadline: { value: Date };
        };

        if (!target.taskName.value) return

        createTask(props.parentListId, target.taskName.value, target.taskDescription.value, new Date(target.taskDeadline.value).toString());
        props.setNewTaskClicked(false);
    }

    const handleReset = () => {
        props.setNewTaskClicked(false);
    }

    return (
        <form className="new-task-container" onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
            <div className="new-task-container-left">
                <input type="text" name="taskName" placeholder="Task Name..." />
                <input type="text" name="taskDescription" placeholder="Task Description..." />
            </div>
            <div className="new-task-container-right">
                <button className="button-transparent" type="reset"><img src={cancelButton} alt="Cancel"/></button>
                <div className="deadline-container">
                    <label htmlFor="taskDeadline">Deadline:</label>
                    <input type="date" name="taskDeadline" />
                </div>
                <button type="submit" className="button-normal-style">Add Task</button>
            </div>
        </form>
    );
};

export default NewTask;