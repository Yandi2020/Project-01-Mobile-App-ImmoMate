import React, { createContext, useState } from 'react'
import users from '../config/users'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [authenticated, setAuthticated] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const register = (values) => {
        let newUser = {
            id: Math.random(),
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            gender: values.gender,
        }
        setAuthticated(true);
        setCurrentUser(newUser);
        return [...users, newUser]
    }

    const login = ({ email, password }) => {
        const user = users.find(user => user.email === email && user.password === password); 
        if(user){
            setAuthticated(true);
            setCurrentUser(user);
        }
    }

    const logout = () => {
        setAuthticated(false);
    }

    return (
        <AuthContext.Provider value={{ 
            currentUser, authenticated, register, login, logout, 
        }} >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

