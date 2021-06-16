import React,{ useState,useEffect, useContext} from 'react';
import { CredentialsContext } from "../App";

export default function Todos(){

    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [credentials] = useContext(CredentialsContext);

    const persist = (newTodos) => {
      fetch(`http://localhost:4000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        body: JSON.stringify(newTodos),
      })
      .then(() => {});
    };

    useEffect(() => {
      fetch(`http://localhost:4000/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
      })
        .then((response) => response.json())
        .then((todos) => setTodos(todos));
    });

    const addTodo = (e) => {
        e.preventDefault();
        if (!todoText) return;
        const newTodo = { checked:false,text:todoText}
        const newTodos = [...todos,newTodo]
        setTodos(newTodos);
        setTodoText("");
        persist(newTodos);
      };
   // const toggleTodo = (index) => {
    //  const newTodoList = [...todos];
     // newTodoList[index].checked = !newTodoList[index].checked;
     //// setTodos(newTodoList);
    //  persist(newTodoList);
   // };
    return(
        <div>
           <h4>MY TODO'S</h4>
          <ol id="olist">
        {todos.map((todo) => (
        <div key={todo.id}>
          <li className="list-item" >{todo.text}</li>
        </div>
      ))}</ol>
      <br />
      <form onSubmit={addTodo}>
        <input
         className="task-input"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        ></input>
        <button id="btnTodo" className="btn btn-light" type="submit">Add</button>
      </form>
    </div>
    )
}