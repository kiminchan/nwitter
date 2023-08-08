import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";



const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <nav>

            </nav>

            <Routes>
                <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

        </Router>
    );
}

export default AppRouter;
