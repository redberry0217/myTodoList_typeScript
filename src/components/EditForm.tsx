import React, { useState } from "react";
import styled from "styled-components";
import { Todo } from "../types/todoTypes";

export default function EditForm({
  todoData,
  setIsEditing,
}: {
  todoData: Todo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState(todoData.title);
  const [content, setContent] = useState(todoData.content);
  const [priority, setPriority] = useState(todoData.priority);

  const cancelOnClickHandler = () => {
    if (!window.confirm(`Todo 수정을 취소하시겠습니까?`)) return;
    setIsEditing(false);
  };

  return (
    <FormContainer>
      <TitleAndPriority>
        <Box>
          <Label>제목</Label>
          <input
            placeholder="제목(15자까지 입력)"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={15}
          />
        </Box>
        <Box>
          <Label>우선순위</Label>
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
        </Box>
      </TitleAndPriority>
      <ContentBox>
        <Label>내용</Label>
        <input
          placeholder="내용(40자까지 입력)"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={30}
        />
      </ContentBox>
      <BtnBox>
        <Button type="button" onClick={cancelOnClickHandler}>
          취소
        </Button>
        <Button type="submit">완료</Button>
      </BtnBox>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const TitleAndPriority = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 12pt;
  color: #b96e83;
  font-weight: bold;
  padding-left: 5px;
`;

const Box = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > input {
    height: 30px;
    border: 1px solid #966874;
    border-radius: 12px;
    padding-left: 10px;
    font-size: 12pt;
  }

  & > select {
    height: 30px;
    border: 1px solid #966874;
    border-radius: 12px;
    padding-left: 10px;
    font-size: 12pt;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > input {
    height: 30px;
    border: 1px solid #966874;
    border-radius: 12px;
    padding-left: 10px;
    font-size: 12pt;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #b96e83;
  width: 50px;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 12pt;
  cursor: pointer;
`;
