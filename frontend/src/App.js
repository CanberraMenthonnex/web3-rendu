// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Sidebar from "./components/Sidebar";
import './styles/_app.scss';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        {/* Ajoutez d'autres routes pour chaque page */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};



export default App;
