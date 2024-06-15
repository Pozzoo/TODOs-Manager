import ListItem from "../components/ListItem.jsx";
import PropTypes from "prop-types";

const Lists = ({lists, handleDelete, handleTitleChange, handleAdd}) => {

    return (
        <div className="app">
            <h2>TODOs LISTs</h2>
            <div className="lists">
                <ul>
                    {lists.map((item, index) => (

                        <li key={index}>
                            <ListItem item={item} onDeleteList={handleDelete} onTitleChange={handleTitleChange} initialTitle={item.title}/>
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
}

export default Lists;