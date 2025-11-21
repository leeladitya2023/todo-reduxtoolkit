import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../Features/Todo/TodoSlice";

function Todos({ setEditTodo }) {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  return (
    <div className="mt-8 text-center">
      <h2 className="text-xl font-semibold mb-4 text-white">Todo List </h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-between w-1/2 mx-auto"
          >
            {" "}
            <span>{todo.text}</span>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setEditTodo(todo)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
            >
              Edit ✏️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
