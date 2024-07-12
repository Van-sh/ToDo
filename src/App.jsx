import "./App.css";
import TodoControls from "./components/TodoControls";
import Todo from "./components/Todo";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function pushToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function pullFromLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data === null) {
        data = [];
        pushToLocalStorage(key, data)
    }
    return data;
}

function App() {
    const [todoList, setTodoList] = useState(pullFromLocalStorage("todoList"));

    function handleTodoCreation(newTodo) {
        newTodo = { id: uuidv4(), ...newTodo };
        let newTodoList = [...todoList, newTodo];
        pushToLocalStorage("todoList", newTodoList);
        setTodoList(newTodoList);
    }

    function handleTodoCompletion(id) {
        let newTodoList = todoList;
        newTodoList.map((todo) => {
            if (todo.id == id) {
                todo.isDone = !todo.isDone;
            }
        });
        console.log(newTodoList);

        pushToLocalStorage("todoList", newTodoList);
        setTodoList(newTodoList);
    }

    function handleTodoDeletionById(id) {
        let newTodoList = todoList.filter((todo) => todo.id != id);
        pushToLocalStorage("todoList", newTodoList);
        setTodoList(newTodoList);
    }
    function handleTodoDeletion(isDone) {
        let newTodoList = todoList.filter((todo) => isDone && !(todo.isDone));
        pushToLocalStorage("todoList", newTodoList);
        setTodoList(newTodoList);
    }

    const renderedTodos = todoList.map((todo) => (
        <Todo
            key={todo.id}
            {...todo}
            handleTodoCompletion={handleTodoCompletion}
            handleTodoDeletionById={handleTodoDeletionById}
        ></Todo>
    ));

    return (
        <main className="bg-base-300 rounded-xl flex flex-col items-center">
            <h1 className="text-5xl mb-3">Todos</h1>
            <TodoControls
                handleTodoCreation={handleTodoCreation}
                handleTodoDeletion={handleTodoDeletion}
            ></TodoControls>
            <div className="divider"></div>
            <div className="w-4/6 flex flex-col gap-1">{renderedTodos}</div>
        </main>
    );
}

export default App;
