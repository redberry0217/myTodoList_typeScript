import React from "react";
import WriteTodo from "../components/WriteTodo";
import TodoList from "../components/TodoList";

function Home() {
  return (
    <>
      <WriteTodo />
      <TodoList />
    </>
  );
}

export default Home;
