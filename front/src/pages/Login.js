import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
    if (!response.ok) {
      const { message } = await response.json();
      throw Error(message);
    }
    return response.json();
  };

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);
  
    const login = (e) => {
      e.preventDefault();
      fetch(`http://localhost:4000/login`, {
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
          history.push("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
    const history = useHistory();
  
    return (
      <div className="container">
        <h1 className="head">Login</h1>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form onSubmit={login}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required minLength="4" className="form-control"
          />
          <br />
          <input
            type="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required minLength="4" className="form-control"
          />
          <br />
          <button className="btn btn-success btn-block" type="submit">Login</button>
        </form>
      </div>
    );
  }