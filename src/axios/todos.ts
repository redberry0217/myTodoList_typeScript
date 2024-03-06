import React from "react";
import axios from "axios";

export type Todo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

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
    alert(`게시글을 등록하지 못했습니다. 다시 시도해주세요.`);
    console.log("게시글 등록 오류", error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    if (!window.confirm(`Todo를 삭제하시겠습니까?`)) return;
    await axios.delete(`${process.env.REACT_APP_JSON_SERVER_URL}/todos/${id}`);
  } catch (error) {
    alert(`Todo를 삭제하지 못했습니다. 다시 시도해주세요.`);
    console.log("Todo 삭제 에러", error);
  }
};
