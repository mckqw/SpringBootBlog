import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import PostCreatorPage from './pages/PostCreatorPage';
import './App.scss';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/create-post" element={<PostCreatorPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;