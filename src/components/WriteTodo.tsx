import React, { useState } from "react";
import styled from "styled-components";

export default function WriteTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onSubmitHandler = () => {};

  return (
    <WriteTodoContainer>
      <Title>❤️ MY TODO LIST ❤️</Title>
      <InputArea onSubmit={onSubmitHandler}>
        <input
          placeholder="제목"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="내용"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button>등록</Button>
      </InputArea>
    </WriteTodoContainer>
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
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputArea = styled.form`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #b96e83;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
