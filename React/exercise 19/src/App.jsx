import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
    ]);

    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="page">
      <div className="todo-container">

        <h1>My Todo List</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-row">

            <input
              className="todo-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new todo..."
            />

            <button
              className="add-button"
              type="submit"
            >
              Add
            </button>

          </div>
        </form>

        <div className="todo-list">
          {todos.map(todo => (
            <div className="todo-item" key={todo.id}>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>

              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>

            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="empty-message">
            No todos yet. Add some tasks above!
          </p>
        )}

      </div>
    </div>
  );
}

export default App;