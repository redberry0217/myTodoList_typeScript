import React from "react";
import axios from "axios";
import { Todo } from "../types/todoTypes";

//axios instance 만들어서 반복되는 부분 줄이기

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>(
      `${process.env.REACT_APP_JSON_SERVER_URL}/todos`
    );
    console.log("받아온 데이터", response.data);
    return response.data;
  } catch (error) {
    console.log(`데이터 불러오기 실패`, error);
    return [];
  }
};

export const addTodo = async (newTodo: Todo) => {
  try {
    await axios.post(`${process.env.REACT_APP_JSON_SERVER_URL}/todos`, newTodo);
  } catch (error) {
    console.log("게시글 등록 오류", error);
  }
};

//id를 Todo의 id로 지정하는 것이 좋음
export const deleteTodo = async (id: string) => {
  try {
    await axios.delete(`${process.env.REACT_APP_JSON_SERVER_URL}/todos/${id}`);
  } catch (error) {
    console.log("Todo 삭제 에러", error);
  }
};

export type updatedTodo = Pick<Todo, "id" | "isDone">;

export const updateTodo = async (todo: updatedTodo) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/todos/${todo.id}`,
      {
        isDone: todo.isDone,
      }
    );
  } catch (error) {
    console.log("Todo 상태 변경 에러", error);
  }
};

export type editedTodo = Pick<Todo, "title" | "content" | "priority">;
export const editTodo = async (id: string, editedTodo: editedTodo) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/todos/${id}`,
      editedTodo
    );
  } catch (error) {
    console.log("Todo 수정 에러", error);
  }
};
