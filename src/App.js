import React, {useEffect, useState} from "react";
import './styles/App.css';
import About from "./pages/About";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts";
import Navbar from "./Components/UI/Navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./Components/AppRouter";
import {AuthContext} from "./context/context";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
      if (localStorage.getItem('isAuth')) {
          setIsAuth(true) 
      }
  },[])

  return (
      <AuthContext.Provider
          value={{
              isAuth: isAuth,
              setIsAuth: setIsAuth,
          }}
      >
          <BrowserRouter>
              <Navbar />
              <AppRouter />
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
