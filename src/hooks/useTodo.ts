import { useQuery } from "react-query";
import { Todo } from "../types/todoTypes";
import { getTodos } from "../api/todoApi";

export const useTodo = () => {
  const { isLoading, isError, data, isIdle } = useQuery<Todo[]>(
    "todos",
    getTodos
  );
  const todoItemList = data?.filter((item) => item.isDone === false) ?? [];
  const doneItemList = data?.filter((item) => item.isDone === true) ?? [];

  return {
    isLoading,
    data,
    isError,
    isIdle,
    todoItemList,
    doneItemList,
  };
};
