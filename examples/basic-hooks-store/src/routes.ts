import Layout from "@/layouts/basic";
import Home from "@/pages/Home";
import TodoList from "@/pages/TodoList";
import NotFound from "@/pages/NotFound";
import hooksStore from "./hooksStore";
import todoListStore from "./pages/TodoList/hooksStore";

export default [
  {
    path: "/",
    component: Layout,
    rootStore: hooksStore,
    children: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/todoList",
        component: TodoList,
        store: todoListStore,
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];
