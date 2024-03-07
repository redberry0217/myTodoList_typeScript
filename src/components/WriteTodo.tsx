import React, { useState } from "react";
import styled from "styled-components";
import uuid4 from "uuid4";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/todoApi";
import { Outlet, useNavigate } from "react-router-dom";

export default function WriteTodo() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      alert(`Todo가 등록되었습니다.`);
      queryClient.invalidateQueries("todos");
    },
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      alert(`제목과 내용을 모두 입력해주세요.`);
      return;
    }

    if (!priority) {
      alert(`우선순위를 선택해주세요.`);
      return;
    }

    const newTodo = {
      id: uuid4(),
      title,
      content,
      isDone: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    mutation.mutate(newTodo);
    navigate(`/`);
    setTitle("");
    setContent("");
    setPriority(0);
  };

  return (
    <>
      <WriteTodoContainer>
        <Title>❤️ MY TODO LIST ❤️</Title>
        <InputArea onSubmit={onSubmitHandler}>
          <input
            placeholder="제목(15자까지 입력)"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={15}
          />
          <input
            placeholder="내용(40자까지 입력)"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={40}
          />
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
          >
            <option value={0}>우선순위</option>
            <option value={1}>보통</option>
            <option value={2}>중요</option>
            <option value={3}>매우중요</option>
          </select>
          <Button $hasContent={!!title && !!content}>등록하기</Button>
        </InputArea>
      </WriteTodoContainer>
      <Outlet />
    </>
  );
}

const WriteTodoContainer = styled.div`
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #000000;
  background-color: #fae3e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 17pt;
  margin-bottom: 20px;
  font-weight: bolder;
`;

const InputArea = styled.form`
  display: flex;
  gap: 10px;

  & > input {
    width: 250px;
    height: 30px;
    border: 1px solid #966874;
    border-radius: 12px;
    padding-left: 10px;
    font-size: 12pt;
  }

  & > select {
    width: 100px;
    height: 30px;
    border: 1px solid #966874;
    border-radius: 12px;
    padding-left: 10px;
    font-size: 12pt;
  }
`;

type HasContentProps = {
  $hasContent: boolean;
};

const Button = styled.button<HasContentProps>`
  background-color: ${(props) => (props.$hasContent ? "#b96e83" : "gray")};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 13pt;
  padding: 0 10px;
`;
