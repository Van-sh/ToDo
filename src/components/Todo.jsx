import { useCallback, useState } from "react";

import "./Todo.css";

import check from "../assets/check.svg";
import cross from "../assets/cross.svg";
import edit from "../assets/edit.svg";
import trashCan from "../assets/trash-can.svg";

function Todo({
   id,
   text,
   isDone: done,
   handleTodoCompletion,
   handleTodoDeletionById,
   handleTodoEdit,
}) {
   const [isDone, setIsDone] = useState(done);
   const [isEditing, setIsEditing] = useState(false);

   return (
      <>
         {isEditing ? (
            <TodoEdit
               id={id}
               text={text}
               isDone={isDone}
               setIsDone={setIsDone}
               setIsEditing={setIsEditing}
               handleTodoCompletion={handleTodoCompletion}
               handleTodoEdit={handleTodoEdit}
            />
         ) : (
            <TodoItem
               id={id}
               text={text}
               isDone={isDone}
               setIsDone={setIsDone}
               setIsEditing={setIsEditing}
               handleTodoCompletion={handleTodoCompletion}
               handleTodoDeletionById={handleTodoDeletionById}
            />
         )}
      </>
   );
}

const TodoItem = ({
   id,
   text,
   isDone,
   setIsDone,
   setIsEditing,
   handleTodoCompletion,
   handleTodoDeletionById,
}) => {
   return (
      <div className="todo flex justify-between w-full">
         <label className={"label cursor-pointer justify-start gap-2 p-0"}>
            <input
               type="checkbox"
               className="checkbox checkbox-primary checkbox-sm"
               checked={isDone}
               onChange={() => {
                  handleTodoCompletion(id);
                  setIsDone(!isDone);
               }}
            />
            <span
               className={
                  "label label-text text-md p-1 after:bg-base-content" +
                  (isDone ? " done" : "")
               }
            >
               {text}
            </span>
         </label>
         <div className="flex gap-1">
            <button
               className="btn btn-square btn-sm btn-info"
               onClick={() => setIsEditing(true)}
            >
               <img src={edit} alt="edit" className="h-4/5" />
            </button>
            <button
               className="btn btn-square btn-sm btn-error"
               onClick={() => handleTodoDeletionById(id)}
            >
               <img src={trashCan} alt="trashCan" className="h-4/5" />
            </button>
         </div>
      </div>
   );
};

const TodoEdit = ({
   id,
   text,
   isDone,
   setIsDone,
   setIsEditing,
   handleTodoCompletion,
   handleTodoEdit,
}) => {
   const [editText, setEditText] = useState(text);

   const handleEdit = useCallback(() => {
      setIsEditing(false);
      handleTodoEdit(id, editText);
   }, [id, editText, handleTodoEdit, setIsEditing]);

   return (
      <div className="flex flex-row gap-2">
         <label className={"label cursor-pointer justify-start gap-2 p-0"}>
            <input
               type="checkbox"
               className="checkbox checkbox-primary checkbox-sm"
               checked={isDone}
               onChange={() => {
                  handleTodoCompletion(id);
                  setIsDone(!isDone);
               }}
            />
         </label>
         <input
            className="input input-sm w-full input-bordered flex-grow-0"
            type="text"
            placeholder="eg. Eat Food"
            autoFocus
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={(event) => {
               if (event.key === "Enter" && editText !== "") {
                  handleEdit();
               }
            }}
            value={editText}
         />
         <div className="flex gap-1">
            <button
               className="btn btn-square btn-sm btn-success"
               onClick={() => {
                  handleEdit();
               }}
            >
               <img src={check} alt="edit" className="h-4/5" />
            </button>
            <button
               className="btn btn-square btn-sm btn-error"
               onClick={() => {
                  setEditText(text);
                  setIsEditing(false);
               }}
            >
               <img src={cross} alt="edit" className="h-4/5" />
            </button>
         </div>
      </div>
   );
};

export default Todo;
