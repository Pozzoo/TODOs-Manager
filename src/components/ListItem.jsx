import '../css/ListItem.css'
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {ListModel} from "../models/list-model.jsx";
import {useState} from "react";

const ListItem = ({item, onDeleteList, onTitleChange, initialTitle}) => {

    const model = item;
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }

    const handleBlur = () => {
        setIsEditing(false);
        onTitleChange(title, model);
    }

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    }

    const handleClick = (e) => {
        e.stopPropagation();

        if (isEditing) return;

        navigate(`/list/${model.id}`, {state: model});
    }

    const handleAuxClick = (e) => {
        e.preventDefault();

        if (isEditing) return;

        onDeleteList(model);
    }

    return(
        <div className="list" onClick={handleClick} onContextMenu={handleAuxClick}>
            {isEditing ? (
                <input
                type="text"
                value={title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoFocus
                />
            ) : (
             <span className="listTitle" onClick={handleEditClick}>{title}</span>
            )}

            <div className="listPriority">
                <p className="priorityText">{model.priority}</p>
            </div>
            <div className="listDescription">
                <p className="completedText">Completed: {model.completed}</p>
                <p className="pendingText">Pending: {model.pending}</p>
            </div>
        </div>
    );
}

ListItem.propTypes = {
    item: PropTypes.instanceOf(ListModel).isRequired,
    onDeleteList: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    initialTitle: PropTypes.string.isRequired
}

export default ListItem;