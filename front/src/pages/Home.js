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
        <div>
        {!credentials && <h3>Create an account or LogIn</h3>}<br/><br/><br/>
        {!credentials && <Link className="btn btn-primary btn-block" to="/register">Register</Link>}
        {!credentials && <Link className="btn btn-success btn-block" to="/login">LogIn</Link>}
        {credentials && <h1>Welcome... {credentials.username}</h1>}
        <br/>
        {credentials && <Todos/>}
        <br/>
        {credentials && <button className="btn btn-danger" onClick={logout}>Logout</button>}
        </div>
    )
}