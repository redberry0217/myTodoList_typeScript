import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodo } from "../hooks/useTodo";

export default function TodoList() {
  const { isLoading, isError, isIdle, doneItemList, todoItemList } = useTodo();

  if (isLoading || isIdle) {
    return <div>데이터 로드중...</div>;
  }

  if (isError) {
    return <div>데이터를 가져올 수 없습니다. 다시 시도하세요.</div>;
  }

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
  margin-top: 40px;
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
