import { useState } from "react";

function TodoControls({ handleTodoCreation, handleTodoDeletion }) {
   const [inputValue, setInputValue] = useState("");

   function todoCreation() {
      handleTodoCreation({ text: inputValue, isDone: false });
      setInputValue("");
   }

   return (
      <>
         <div className="todo-controls flex flex-col gap-2">
            <input
               className="input w-full input-bordered flex-grow-0 todo-input"
               type="text"
               placeholder="eg. Eat Food"
               autoFocus
               onChange={(event) => setInputValue(event.target.value.trim())}
               onKeyDown={(event) => {
                  if (event.key === "Enter" && inputValue != "") {
                     todoCreation();
                  }
               }}
               value={inputValue}
            />
            <div className="buttons flex gap-1 justify-start">
               <button
                  className="btn btn-primary"
                  onClick={() => {
                     if (inputValue != "") todoCreation();
                  }}
               >
                  Add
               </button>
               <button
                  className="btn btn-secondary"
                  onClick={() => handleTodoDeletion(true)}
               >
                  Clear Completed
               </button>
               <button
                  className="btn btn-error"
                  onClick={() => handleTodoDeletion(false)}
               >
                  Clear All
               </button>
            </div>
         </div>
      </>
   );
}

export default TodoControls;
