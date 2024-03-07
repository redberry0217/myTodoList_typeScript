import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { deleteTodo } from "../api/todoApi";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormat } from "../util/date";
import { useTodo } from "../hooks/useTodo";
import EditForm from "../components/EditForm";

export default function Detail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const editOnClickHandler = () => {
    setIsEditing(true);
  };

  /** Todo 삭제하기 */
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      navigate(`/`);
    },
  });

  const deteleOnClickHanlder = (id: string) => {
    if (!window.confirm(`Todo를 삭제하시겠습니까?`)) return;
    deleteTodoMutation.mutate(id);
  };

  /** 클릭한 Todo 내용 불러오기 */
  const { data, isLoading, isError, isIdle } = useTodo();

  if (isLoading || isIdle) {
    return <div>데이터 로드중...</div>;
  }
  if (isError) {
    return <div>데이터를 가져올 수 없습니다. 다시 시도하세요.</div>;
  }
  if (!data) {
    return <div>데이터를 가져올 수 없습니다. 다시 시도하세요.</div>;
  }

  const todoData = data.find((item) => item.id === id);
  if (!todoData) {
    return <div>해당 Todo를 찾을 수 없습니다.</div>;
  }

  const formattedData = dateFormat(todoData.createdAt);

  if (!id) {
    return navigate(`/`);
  }

  return (
    <>
      <DetailContainer>
        <AreaLabel>
          {isEditing ? "❤︎ 내용 수정하기" : "❤︎ 내용 자세히 보기"}
        </AreaLabel>
        <DetailArea>
          <DetailContent>
            {isEditing ? (
              <EditForm todoData={todoData} setIsEditing={setIsEditing} />
            ) : (
              <>
                <TitleAndPriority>
                  <Title>{todoData.title}</Title>
                  <PriorityItem $priority={todoData.priority}>
                    {todoData.priority === 3
                      ? "매우중요"
                      : todoData.priority === 2
                      ? "중요"
                      : "보통"}
                  </PriorityItem>
                </TitleAndPriority>
                <Content>{todoData.content}</Content>
                <MoreInfo>❤️등록일: {formattedData}</MoreInfo>
                <MoreInfo>
                  ❤️상태:{" "}
                  {todoData.isDone ? "✔️이미 완료됨!" : "😮이제 해야함!"}
                </MoreInfo>
              </>
            )}
          </DetailContent>
          <Btns>
            {isEditing ? null : (
              <>
                <Button onClick={editOnClickHandler}>수정</Button>
                <Button onClick={() => deteleOnClickHanlder(id)}>삭제</Button>
              </>
            )}
          </Btns>
        </DetailArea>
        <GoBackBtn onClick={() => navigate(`/`)}>뒤로가기</GoBackBtn>
      </DetailContainer>
    </>
  );
}

const DetailContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff7f2;
`;

const AreaLabel = styled.div`
  width: 60%;
  margin-left: 20px;
  font-size: 15pt;
  line-height: 190%;
  font-weight: bold;
  margin-top: 30px;
`;

const DetailArea = styled.div`
  width: 60%;
  height: 300px;
  background-color: #dab1bc;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 2px 2px 7px #966874;
`;

const DetailContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const TitleAndPriority = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const Title = styled.span`
  font-size: 20pt;
  font-weight: bold;
  text-decoration: underline;
  color: #b96e83;
  line-height: 190%;
`;

const Content = styled.span`
  line-height: 180%;
  font-size: 15pt;
  height: 70px;
`;

const MoreInfo = styled.span`
  font-size: 12pt;
  line-height: 190%;
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

const GoBackBtn = styled.button`
  margin-top: 30px;
  height: 30px;
  padding: 0 10px;
  background-color: #b96e83;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 13pt;
  cursor: pointer;
`;

type PriorityProps = {
  $priority: number;
};

const PriorityItem = styled.div<PriorityProps>`
  width: 60px;
  height: 20px;
  color: white;
  display: flex;
  justify-content: center;
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
