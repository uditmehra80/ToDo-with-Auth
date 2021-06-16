import React, { useContext } from 'react';
import { Link  } from "react-router-dom";
import {  CredentialsContext } from '../App';
import Todos  from '../components/Todos'

export default function Home(){
    const [ credentials,setCredentials ] = useContext(CredentialsContext)

    const logout =() => {
        setCredentials(null);
    }
    return(
        <div className="App">
        {credentials && <h1>Welcome... {credentials.username}</h1>}
        {!credentials && <Link className="btn btn-primary" to="/register">Register</Link>}
        {!credentials && <Link className="btn btn-success" to="/login">LogIn</Link>}
        <br/>
        {credentials && <Todos/>}
        <br/>
        {credentials && <button className="btn btn-danger" onClick={logout}>Logout</button>}
        </div>
    )
}