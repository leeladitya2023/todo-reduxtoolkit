import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo,updateTodo } from "../Features/Todo/TodoSlice";
function AddTodo({ editTodo, setEditTodo }) {
  const [input, setInput] = React.useState("");
  const dispatch = useDispatch();

  // Load the todo being edited into input field
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.text);
    }
  }, [editTodo]);

  const addTodoHandler = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    if (editTodo) {
      dispatch(updateTodo({ id: editTodo.id, text: trimmed }));
      setEditTodo(null); 
    } else {
      dispatch(addTodo(trimmed));
    }

    setInput(""); // Clear input
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className={`text-white ${
          editTodo ? "bg-yellow-600 hover:bg-yellow-700" : "bg-indigo-600 hover:bg-indigo-700"
        } border-0 py-2 px-6 rounded`}
      >
        {editTodo ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default AddTodo;
