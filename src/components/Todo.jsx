import { useState } from "react";
import "./Todo.css";
import trashCan from "../assets/trash-can.svg";

function Todo({
    id,
    text,
    isDone: done,
    handleTodoCompletion,
    handleTodoDeletionById,
}) {
    const [isDone, setIsDone] = useState(done);
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
            <button
                className="btn btn-square btn-sm btn-error"
                onClick={() => handleTodoDeletionById(id)}
            >
                <img src={trashCan} alt="trashCan" className="h-4/5" />
            </button>
        </div>
    );
}

export default Todo;
