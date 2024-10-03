import React, {useState} from "react";
import {TaskListModel} from "../models/tasklist-model.js";
import {useNavigate} from "react-router-dom";
import trashCan from "../assets/delete-stroke-rounded.svg"
import "../css/TaskList.css"
import useListProvider from "../hooks/useListProvider.ts";

type TaskListProps = {
    listModel: TaskListModel
}

const TaskList: React.FC<TaskListProps> = props => {
    const [isRightClicked, setRightClicked] = useState<boolean>(false);
    const [deleteClass, setDeleteClass] = useState<string>("tasklist-delete-area show-animation");
    const [isEditing, setEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(props.listModel.title);

    const {removeList, editList} = useListProvider();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`/${props.listModel.id}`);
    }

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isRightClicked) {
            setDeleteClass("tasklist-delete-area hide-animation");

            setTimeout(() => setRightClicked(false), 500);
            setEditing(false);
            return;
        }

        setRightClicked(true);
        setDeleteClass("tasklist-delete-area show-animation");
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        removeList(props.listModel.id);
    }

    const handleRenameClick = (e: React.MouseEvent) => {
        if (!isRightClicked) return;

        e.preventDefault();
        e.stopPropagation();

        setEditing(true);
    }

    const handleInputChange = (e: React.ChangeEvent) => {
        const target = e.target as typeof e.target & {
            value: string;
        };

        setEditedTitle(target.value);
    }

    const handleSave = () => {
        if (!isEditing) return;

        setEditing(false);
        if (editedTitle === props.listModel.title) return;

        editList({...props.listModel, title: editedTitle});
    }

    const tasklistDeleteArea =
        <div className={deleteClass} onClick={(e) => handleDeleteClick(e)}>
            <button className="button-transparent">
                <img src={trashCan} alt="Delete"/>
            </button>
        </div>

    return (
        <div className="tasklist-container" onClick={(e) => handleClick(e)} onContextMenu={(e) => handleRightClick(e)}>
            <div className="tasklist-content-left">
                {isEditing ?
                    <input type="text" className="input-transparent" value={editedTitle} onChange={(e) => handleInputChange(e)} onBlur={handleSave} autoFocus />
                    :
                    <h3 onClick={(e) => handleRenameClick(e)}>{editedTitle}</h3>
                }
                <p>Completed: 0</p>
                <p>Pending: 0</p>
            </div>

            {isRightClicked ? tasklistDeleteArea : null}
        </div>
    );
};

export default TaskList;