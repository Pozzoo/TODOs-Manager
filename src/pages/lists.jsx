import ListItem from "../components/ListItem.jsx";
import PropTypes from "prop-types";
import React from "react";

const Lists = ({lists, handleDelete, handleTitleChange, handleAdd, handleDragStart, handleDragOver, handleDragEnd}) => {

    const listsRef = React.useRef([]);
    const dragItem = React.useRef(null);

    const handleStartAnimation = (model, index) => {
        handleDragStart(model);
        dragItem.current = index;

        listsRef.current[index].style.visibility = "hidden";
    }

    const handleOverAnimation = (model, index) => {
        handleDragOver(model);

        listsRef.current[index].style.visibility = "hidden";
        listsRef.current[dragItem.current].style.visibility = "visible";

        dragItem.current = index;
    }

    const handleEndAnimation = () => {
        handleDragEnd();

        listsRef.current[dragItem.current].style.visibility = "visible";
        dragItem.current = null;
    }

    return (
        <div className="app">
            <h2>TODOs LISTs</h2>
            <div className="lists">
                <ul>
                    {lists.map((item, index) => (
                        <li
                            key={index}
                            ref={(el) => (listsRef.current[index] = el)}
                            draggable
                            onDragStart={() => handleStartAnimation(item, index)}
                            onDragEnter={() => handleOverAnimation(item, index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnd={handleEndAnimation}
                        >
                            <ListItem
                                item={item}
                                onDeleteList={handleDelete}
                                onTitleChange={handleTitleChange}
                            />
                        </li>
                    ))}
                    <li>
                        <button onClick={handleAdd}>New</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

Lists.propTypes = {
    lists: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDragStart: PropTypes.func.isRequired,
    handleDragOver: PropTypes.func.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
}

export default Lists;