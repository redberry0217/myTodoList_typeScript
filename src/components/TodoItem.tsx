import React from "react";
import styled from "styled-components";
import { Todo } from "../axios/todos";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../axios/todos";
import { updateTodo } from "../axios/todos";

export default function TodoItem({ data }: { data: Todo[] }) {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      alert(`Todo가 삭제되었습니다.`);
      queryClient.invalidateQueries("todos");
    },
  });

  const deteleOnClickHanlder = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const isDoneToggleMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const isDoneToggleHandler = (id: string, isDone: boolean) => {
    const updatedTodo = {
      id: id,
      isDone: !isDone,
    };
    isDoneToggleMutation.mutate(updatedTodo);
  };

  return (
    <>
      {data.map((item) => (
        <Box key={item.id} $isDone={item.isDone as boolean}>
          <Title $isDone={item.isDone as boolean}>{item.title}</Title>
          <Content>{item.content}</Content>
          <Btns>
            <Button onClick={() => deteleOnClickHanlder(item.id)}>삭제</Button>
            <Button onClick={() => isDoneToggleHandler(item.id, item.isDone)}>
              {item.isDone ? "취소" : "완료"}
            </Button>
          </Btns>
        </Box>
      ))}
    </>
  );
}

type IsDoneProps = {
  $isDone: boolean;
};

const Box = styled.div<IsDoneProps>`
  width: 200px;
  padding: 10px;
  background-color: ${(props) => (props.$isDone ? "#fae3e9" : "white")};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span<IsDoneProps>`
  font-size: 14pt;
  font-weight: bold;
  text-decoration: underline;
  color: ${(props) => (props.$isDone ? "#525252" : "#b96e83")};
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
