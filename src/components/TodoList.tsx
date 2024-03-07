import React, { useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodo } from "../hooks/useTodo";
import { Todo } from "../types/todoTypes";

export default function TodoList() {
  const [sortBy, setSortBy] = useState("");
  const { isLoading, isError, isIdle, doneItemList, todoItemList } = useTodo();
  const [sortedData, setSortedData] = useState<Todo[]>(todoItemList);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortBy(selectedValue);
    if (selectedValue === "우선순") {
      const sortedByPriority = [...todoItemList].sort(
        (a: Todo, b: Todo) => b.priority - a.priority
      );
      setSortedData(sortedByPriority);
    } else if (selectedValue === "최신순") {
      const sortedByDate = [...todoItemList].sort((a: Todo, b: Todo) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setSortedData(sortedByDate);
    } else {
      setSortedData([...todoItemList]);
    }
  };

  if (isLoading || isIdle) {
    return <div>데이터 로드중...</div>;
  }
  if (isError) {
    return <div>데이터를 가져올 수 없습니다. 다시 시도하세요.</div>;
  }

  return (
    <TodoListContainer>
      <LabelAndSort>
        <AreaLabel>❤︎ Todo List</AreaLabel>
        <SortTodo value={sortBy} onChange={handleSortChange}>
          <option value="">정렬</option>
          <option value="우선순">우선순</option>
          <option value="최신순">최신순</option>
        </SortTodo>
      </LabelAndSort>
      <TodoArea>
        <TodoItem data={sortedData} />
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

const LabelAndSort = styled.div`
  width: 70%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-right: 20px;
`;

const AreaLabel = styled.div`
  width: 70%;
  margin-left: 20px;
  font-size: 15pt;
  line-height: 190%;
  font-weight: bold;
  margin-top: 40px;
`;

const SortTodo = styled.select`
  width: 70px;
  border-radius: 5px;
  text-align: center;
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
