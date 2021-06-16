import React,{ useContext, useState } from 'react';
import { useHistory  } from "react-router-dom";
import {  CredentialsContext } from '../App';

import { handleErrors } from './Login';

export default function Register(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);
    
    const register =(e) =>{
        e.preventDefault();
        fetch(`http://localhost:4000/register`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
              }),
        })
        .then(handleErrors)
        .then(() => {
            setCredentials({
                username,
                password,
            });
            history.push('/');
        })
        .catch((error) =>{
            setError(error.message);
        });
    };
    const history = useHistory();
    
    return(
        <div>
            <h1 className="head">Register</h1>
            {error && (<span style={{color:"red"}}>{error}</span>)}
            <form onSubmit={register}>
                <input required minLength="4" className="form-control" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" ></input> <br/>
                <input required minLength="4" className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" ></input> <br/>
                <button className="btn btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    )
}