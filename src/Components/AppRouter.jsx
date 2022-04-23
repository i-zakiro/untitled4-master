import React, {useContext, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../routes/routes";
import Login from "../pages/Login";
import {AuthContext} from "../context/context";

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
        isAuth
        ?
            <Routes>
                {privateRoutes.map((route) =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )}

                <Route path="/" element={<Posts />} />
                <Route path="*" element={<Error />} />
            </Routes>
        :
            <Routes>
                {publicRoutes.map((route) =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )}

                <Route path="/" element={<Login replace to="/q" />} />
                <Route path="*" element={<Login replace to="/q" />} />
            </Routes>
    );
};

export default AppRouter;