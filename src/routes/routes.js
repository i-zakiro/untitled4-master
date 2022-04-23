import About from "../pages/About";
import React from "react";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

export const privateRoutes = [
        {path: "/About", element: <About />},
        {path: "/Posts", element: <Posts />},
        {path: "/Posts/:id", element: <PostIdPage />},
    ]

export const publicRoutes = [
        {path: "/Login", element: <Login />},
    ]