import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ThemeController from "./components/ThemeController";
import TodoControls from "./components/TodoControls";
import TodoList from "./components/TodoList";

function pushToLocalStorage(key, object) {
   localStorage.setItem(key, JSON.stringify(object));
}

function pullFromLocalStorage(key) {
   let data = JSON.parse(localStorage.getItem(key));
   if (data === null) {
      data = [];
      pushToLocalStorage(key, data);
   }
   return data;
}

function App() {
   const [todoList, setTodoList] = useState(pullFromLocalStorage("todoList"));

   const handleTodoCreation = useCallback(
      (newTodo) => {
         newTodo = { id: uuidv4(), ...newTodo };
         setTodoList((prev) => [...prev, newTodo]);
         pushToLocalStorage("todoList", todoList);
      },
      [todoList],
   );

   const handleTodoCompletion = useCallback(
      (id) => {
         setTodoList((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));

         pushToLocalStorage("todoList", todoList);
      },
      [todoList],
   );

   const handleTodoDeletionById = useCallback(
      (id) => {
         setTodoList((prev) => prev.filter((todo) => todo.id != id));
         pushToLocalStorage("todoList", todoList);
      },
      [todoList],
   );

   const handleTodoDeletion = useCallback(
      (isDone) => {
         setTodoList((prev) => prev.filter((todo) => isDone && !todo.isDone));

         pushToLocalStorage("todoList", todoList);
      },
      [todoList],
   );

   const handleTodoEdit = useCallback(
      (id, newText) => {
         setTodoList((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));

         pushToLocalStorage("todoList", todoList);
      },
      [todoList],
   );

   return (
      <>
         <main className="bg-base-300 rounded-xl flex flex-col items-center mx-auto my-4 p-8 w-full md:w-3/5 lg:w-2/5">
            <h1 className="text-5xl mb-3">Todos</h1>
            <TodoControls
               handleTodoCreation={handleTodoCreation}
               handleTodoDeletion={handleTodoDeletion}
            ></TodoControls>
            {todoList.length > 0 ? (
               <>
                  <div className="divider"></div>
                  <TodoList
                     todoList={todoList}
                     handleTodoCompletion={handleTodoCompletion}
                     handleTodoDeletionById={handleTodoDeletionById}
                     handleTodoEdit={handleTodoEdit}
                  ></TodoList>
               </>
            ) : (
               <></>
            )}
         </main>
         <ThemeController></ThemeController>
      </>
   );
}

export default App;
