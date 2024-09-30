import React from "react";
import {useLoaderData} from "react-router-dom";
import useTaskProvider from "../hooks/useTaskProvider.ts";
import Task from "../components/Task.tsx";
import {TaskModel} from "../models/task-model.tsx";

const TaskListPage: React.FC = () => {
    const {getTasksByParentId} = useTaskProvider();
    const listId = useLoaderData() as string;

    return (
        <div className="tasks-wrapper">
            {getTasksByParentId(listId).map((item: TaskModel) => (
                <Task taskModel={item} key={item.id} />
            ))}

            <button>Add</button>
        </div>
    );
};

export default TaskListPage;