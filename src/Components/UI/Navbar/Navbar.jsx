import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('isAuth');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Exit
            </MyButton>
            <div className="navbar__links">
                <Link to="/About">About</Link>
                <Link to="/Posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;