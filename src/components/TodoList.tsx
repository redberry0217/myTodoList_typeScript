import React from "react";
import styled from "styled-components";
import { getTodos } from "../axios/todos";
import { useQuery } from "react-query";
import { Todo } from "../axios/todos";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { isLoading, isError, data, isIdle } = useQuery<Todo[]>(
    "todos",
    getTodos
  );

  if (isLoading || isIdle) {
    return <div>데이터 로드중...</div>;
  }

  if (isError) {
    return <div>데이터를 가져올 수 없습니다. 다시 시도하세요.</div>;
  }

  const todoItemList = data.filter((item) => item.isDone === false);
  const doneItemList = data.filter((item) => item.isDone === true);

  return (
    <TodoListContainer>
      <AreaLabel>❤︎ Todo List</AreaLabel>
      <TodoArea>
        <TodoItem data={todoItemList} />
      </TodoArea>
      <AreaLabel>❤︎ Done List</AreaLabel>
      <TodoArea>
        <TodoItem data={doneItemList} />
      </TodoArea>
    </TodoListContainer>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff7f2;
`;

const AreaLabel = styled.div`
  width: 70%;
  margin-left: 20px;
  font-size: 15pt;
  line-height: 190%;
  font-weight: bold;
  margin-top: 30px;
`;

const TodoArea = styled.div`
  width: 70%;
  background-color: #dab1bc;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  box-shadow: 2px 2px 7px #966874;
`;
