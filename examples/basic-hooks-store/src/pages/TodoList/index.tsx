import React, { useEffect } from "react";
import hooksStore from "@/hooksStore";
import pageHooksStore from "@/pages/TodoList/hooksStore";

export default function () {
  const [user, login] = hooksStore.useHooks("useUser");
  const [todoList, refresh] = pageHooksStore.useHooks("useTodoList");
  const { name } = user;

  useEffect(function () {
    login();
    refresh();
  }, []);

  return (
    <div>
      <div>{name}, these are your todo list:</div>
      <ul>
        {todoList.map(({ title }) => {
          return <li>{title}</li>;
        })}
      </ul>
    </div>
  );
}
