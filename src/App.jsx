import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lists from "./pages/lists.jsx";
import List from "./pages/list.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Lists/>} />
                <Route path="/list/:id" element={<List />} />
            </Routes>
        </Router>
    );
}

export default App