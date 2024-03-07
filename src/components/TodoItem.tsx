import React from "react";
import styled from "styled-components";
import { Todo } from "../axios/todos";
import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../axios/todos";
import { useNavigate } from "react-router-dom";

export default function TodoItem({ data }: { data: Todo[] }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /** Todo 완료 상태 토글 */
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
      {data.length === 0
        ? "항목이 없습니다."
        : data.map((item) => (
            <Box
              key={item.id}
              $isDone={item.isDone as boolean}
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <Title $isDone={item.isDone as boolean}>
                {item.isDone ? "✔️" : null}
                {item.title}
              </Title>
              <Content>{item.content}</Content>
              <Btns>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    isDoneToggleHandler(item.id, item.isDone);
                  }}
                >
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
  cursor: pointer;
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
  height: 60px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 7px;
  bottom: 0px;
`;

const Button = styled.button`
  background-color: #b96e83;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
