import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Go to school", isCompleted: true },
    { id: 2, title: "Code" },
    { id: 3, title: "Sleep" },
    { id: 4, title: "Hang out with girl friend" },
  ]);

  const [inputSearch, setInputSearch] = useState("");

  const onInputChange = (e) => {
    setInputSearch(e.target.value);
  };

  const addTodo = () => {
    const newTodos = [...todos];

    let lastId = 0;
    if (newTodos.length > 0) {
      lastId = newTodos[newTodos.length - 1].id;
    }

    if (inputSearch.trim() !== "") {
      newTodos.push({ id: lastId + 1, title: inputSearch.trim() });
      console.log({ newTodos });
      setTodos(newTodos);
      setInputSearch("");
    }
  };

  const handleItemClick = (id) => {
    //Find item by id
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const onKeyUp = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      addTodo();
    }
  };
  return (
    <div className="app">
      <div className="app__header">
        <input value={inputSearch} onChange={onInputChange} onKeyUp={onKeyUp} />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="app__todo-list">
        {todos.map(({ id, title, isCompleted }) => (
          <li
            className={isCompleted ? "app__todo-item--completed" : ""}
            key={id}
            onClick={() => {
              handleItemClick(id);
            }}
          >
            {title}
            <button
              className="app__delete-btn"
              onClick={(e) => {
                onDelete(e, id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
