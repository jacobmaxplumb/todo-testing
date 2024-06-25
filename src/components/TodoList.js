import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    const todo = { title: newTodo };
    axios
      .post("http://localhost:5000/todos", todo)
      .then((res) => setTodos([...todos, res.data]));
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  return (
    <div>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
        <div>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo}/>)}
        </div>
    </div>
  )
};

export default TodoList;
