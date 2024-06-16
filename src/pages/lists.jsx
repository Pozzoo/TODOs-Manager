import ListItem from "../components/ListItem.jsx";
import PropTypes from "prop-types";

const Lists = ({lists, handleDelete, handleTitleChange, handleAdd, handleDragStart, handleDragOver, handleDragEnd}) => {

    return (
        <div className="app">
            <h2>TODOs LISTs</h2>
            <div className="lists">
                <ul>
                    {lists.map((item, index) => (

                        <li
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragOver(e, index)}
                            onDragEnd={(e) => handleDragEnd(e)}
                            onDragOver={(e) => e.preventDefault()}
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