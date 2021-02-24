import React from "react";
import { Link } from "ice";
import pageHooksStore from "@/pages/TodoList/hooksStore";

export default function () {
  const [todoList, refresh] = pageHooksStore.useHooks("useTodoList");
  return (
    <div>
      <h2>404 Page...</h2>
      <Link to="/">Home</Link>
      <br />
      <Link to="/todoList">Todo List</Link>
      <br />
      <ul>
        {todoList.map(({ title }) => {
          return <li>{title}</li>;
        })}
      </ul>
    </div>
  );
}
