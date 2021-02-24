import React, { useEffect } from "react";
import hooksStore from "@/hooksStore";

export default function () {
  const { useHooks, Provider } = hooksStore;
  const [user, login] = useHooks("useUser");

  // console.log("123");

  useEffect(function () {
    login();
  }, []);

  const { name } = user;
  return <div>Hello, {name}!</div>;
}
