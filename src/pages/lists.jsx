import ListItem from "../components/ListItem.jsx";
import {useEffect, useState} from "react";
import {ListModel} from "../models/list-model.jsx";
import {getFromDB, saveToDB} from "../db/StorageHandler.jsx";

const Lists = () => {
    const [lists, setLists] = useState(getFromDB() || []);

    useEffect(() => {
        saveToDB(lists);
    }, [lists]);

    function handleDelete(model) {
        setLists(l => l.filter(item => item !== model));
    }

    function handleAdd() {
        let id = 0;

        if (lists.length > 0) {
            id = lists.at(lists.length - 1).id + 1;
        }

        const newList = new ListModel("List " + (id + 1), id); //TODO: ADD A TERNARY OPERATOR DO ADD A ZERO IN FRONT

        setLists(lists => [...lists, newList]);
    }

    const handleTitleChange = (title, model) => {

    }

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

export default Lists;