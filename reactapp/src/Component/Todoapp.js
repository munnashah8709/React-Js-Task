import React, { useState } from 'react'
import '../Component/Todo.css'
import { useNavigate } from 'react-router-dom';

function Todoapp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const navigate=useNavigate()
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const submit=()=>{
        navigate("/weatherapp")
    }
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (inputValue.trim() !== '') {
        const newTodo = {
          id: new Date().getTime(),
          text: inputValue,
          completed: false
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
      }
    };
  
    const handleTodoComplete = (id) => {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    };
  
    const handleTodoRemove = (id) => {
      const filteredTodos = todos.filter(todo => todo.id !== id);
      setTodos(filteredTodos);
    };
  
    return (
      <div className="App">
        <h1>To-Do List</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter a to-do item..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              className={todo.completed ? 'completed' : ''}
            >
              <span>{todo.text}</span>
              <button onClick={() => handleTodoComplete(todo.id)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleTodoRemove(todo.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

      <button onClick={submit} style={{marginTop:"300px", backgroundColor:"blue", color:"white", height:"50px"}}>Move to Api Fatch</button>

      </div>
    );
}

export default Todoapp
