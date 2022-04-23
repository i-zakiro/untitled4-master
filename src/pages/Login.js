import React, {useContext} from 'react';
import MyInput from "../Components/UI/input/MyInput";
import MyButton from "../Components/UI/button/MyButton";
import {AuthContext} from "../context/context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('isAuth', 'true');
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <MyInput  type={"text"} placeholder={"enter login"} />
                <MyInput  type={"password"} placeholder={"enter password"} />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;