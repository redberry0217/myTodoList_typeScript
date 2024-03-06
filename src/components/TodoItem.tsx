import React from "react";
import styled from "styled-components";
import { Todo } from "../axios/todos";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../axios/todos";

export default function TodoItem({ data }: { data: Todo[] }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      alert(`Todo가 삭제되었습니다.`);
      queryClient.invalidateQueries("todos");
    },
  });

  const deteleOnClickHanlder = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <>
      {data.map((item) => (
        <Box key={item.id}>
          <Title>{item.title}</Title>
          <Content>{item.content}</Content>
          <Btns>
            <Button onClick={() => deteleOnClickHanlder(item.id)}>삭제</Button>
            <Button>{item.isDone ? "취소" : "완료"}</Button>
          </Btns>
        </Box>
      ))}
    </>
  );
}

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
