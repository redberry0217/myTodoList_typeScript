import React from "react";
import styled from "styled-components";
import Todo from "./Todo";

export default function TodoList() {
  return (
    <TodoListContainer>
      <AreaLabel>✨Todo List</AreaLabel>
      <TodoArea>
        <Box>
          <Title>방청소하기</Title>
          <Content>방청소해야함....ㅠㅠ 귀찮아 너무 귀찮아</Content>
          <Btns>
            <Button>삭제</Button>
            <Button>완료</Button>
          </Btns>
        </Box>
      </TodoArea>
      <AreaLabel>✨Done List</AreaLabel>
      <TodoArea>{/* <Todo></Todo> */}</TodoArea>
    </TodoListContainer>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AreaLabel = styled.div`
  width: 70%;
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
`;

const Box = styled.div`
  width: 200px;
  padding: 10px;
  background-color: white;
  border: 1px solid #000000;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 14pt;
  font-weight: bold;
  color: #b96e83;
  line-height: 190%;
`;

const Content = styled.span`
  line-height: 180%;
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 7px;
`;

const Button = styled.button`
  background-color: #b96e83;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
