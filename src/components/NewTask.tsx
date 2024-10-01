import React, {FormEvent} from "react";
import useTaskProvider from "../hooks/useTaskProvider.ts";
import "../css/NewTask.css"

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
            taskDeadline: { value: number };
        };

        if (!target.taskName.value) return

        createTask(props.parentListId, target.taskName.value, target.taskDescription.value, target.taskDeadline.value);
        props.setNewTaskClicked(false);
    }

    return (
        <form className="new-task-container" onSubmit={(e) => handleSubmit(e)}>
            <div className="new-task-container-left">
                <input type="text" name="taskName" placeholder="Task Name..." />
                <input type="text" name="taskDescription" placeholder="Task Description..." />
            </div>
            <div className="new-task-container-right">
                <input type="date" name="taskDeadline" />
                <button type="submit" className="button-normal-style">Add Task</button>
            </div>
        </form>
    );
};

export default NewTask;