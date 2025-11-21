import React, { useState } from "react";
import AddTodo from "./Components/AddTodo";
import Todos from "./Components/Todos";

function App() {
  const [editTodo, setEditTodo] = useState(null);

  return (
    <div className="App">
      <AddTodo editTodo={editTodo} setEditTodo={setEditTodo} />
      <Todos setEditTodo={setEditTodo} />
    </div>
  );
}

export default App;
