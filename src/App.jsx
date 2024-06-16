import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lists from "./pages/lists.jsx";
import List from "./pages/list.jsx";
import React, {useEffect, useState} from "react";
import {getFromDB, saveToDB} from "./db/StorageHandler.jsx";
import {ListModel} from "./models/list-model.jsx";

function App() {
    const [lists, setLists] = useState(getFromDB() || []);

    const dragItem = React.useRef(null);
    const dragOverItem = React.useRef(null);


    useEffect(() => {
        saveToDB(lists);
    }, [lists]);

    const handleDelete = (model) => {
        setLists(l => l.filter(item => item !== model));
    }

    const handleAdd = () => {
        let id = 0;

        if (lists.length > 0) {
            id = lists.at(lists.length - 1).id + 1;
        }

        const newList = new ListModel("List " + (id + 1), id); //TODO: ADD A TERNARY OPERATOR DO ADD A ZERO IN FRONT

        setLists(lists => [...lists, newList]);
    }

    const handleUpdate = (tasks, model) => {
        setLists(lists => {return lists.map(list => {
            if (list.id === model?.id) {
                let completed = 0;

                for (const task of tasks) {
                    if (task.completed) completed++;
                }

                return({...list, title: model.title, completed: completed, pending: tasks.length - completed, tasks: tasks});
            } else {
                return list
            }
        })});
    }

    const handleTitleChange = (title, model) => {
        setLists(lists => {return lists.map(list => list.id === model.id ? {...list, title: title} : list)});
    }

    const handleDragStart = (e, index) => {
        dragItem.current = index;
    }

    const handleDragOver = (e, index) => {
        dragOverItem.current = index;
    }

    const handleDragOrder = () => {
        let _lists = [...lists];

        const draggedItemContent = _lists.splice(dragItem.current, 1)[0];

        _lists.splice(dragOverItem.current, 0, draggedItemContent);

        dragItem.current = null;
        dragOverItem.current = null;

        setLists(_lists);
    }


    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Lists
                    lists={lists}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleTitleChange={handleTitleChange}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDragEnd={() => handleDragOrder()}
                    />
                }/>
                <Route path="/list/:id" element={<List handleUpdate={handleUpdate} />} />
            </Routes>
        </Router>
    );
}

export default App