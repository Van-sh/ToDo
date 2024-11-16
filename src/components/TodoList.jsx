import Todo from "./Todo";

function TodoList({ todoList, handleTodoCompletion, handleTodoDeletionById, handleTodoEdit }) {
   const renderedTodos = todoList.map((todo) => (
      <Todo
         key={todo.id}
         {...todo}
         handleTodoCompletion={handleTodoCompletion}
         handleTodoDeletionById={handleTodoDeletionById}
         handleTodoEdit={handleTodoEdit}
      ></Todo>
   ));
   return <div className="w-4/6 flex flex-col gap-1">{renderedTodos}</div>;
}

export default TodoList;
