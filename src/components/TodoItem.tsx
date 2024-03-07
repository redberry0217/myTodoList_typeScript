import React from "react";
import styled from "styled-components";
import { Todo } from "../types/todoTypes";
import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../api/todoApi";
import { useNavigate } from "react-router-dom";
import { omitText } from "../util/content";

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
              $isDone={item.isDone}
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <Title $isDone={item.isDone}>
                {item.isDone ? "✔️" : null}
                {item.title}
              </Title>
              <Content>{omitText(item.content, 30)}</Content>
              <Btns $isDone={item.isDone}>
                {item.isDone ? null : (
                  <PriorityItem $priority={item.priority}>
                    {item.priority === 3
                      ? "매우중요"
                      : item.priority === 2
                      ? "중요"
                      : "보통"}
                  </PriorityItem>
                )}
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
  width: 220px;
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

const Btns = styled.div<IsDoneProps>`
  display: flex;
  justify-content: ${(props) => (props.$isDone ? "flex-end" : "space-between")};
  margin-top: 20px;
`;

type PriorityProps = {
  $priority: number;
};

const PriorityItem = styled.div<PriorityProps>`
  color: white;
  display: flex;
  align-items: center;
  padding: 0 5px;
  font-size: 10pt;
  border-radius: 12px;
  background-color: ${(props) => {
    switch (props.$priority) {
      case 1:
        return "#009650";
      case 2:
        return "#255efa";
      case 3:
        return "#ff3164";
      default:
        return "transparent";
    }
  }};
`;

const Button = styled.button`
  background-color: #b96e83;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
