import React from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { deleteTodo } from "../api/todoApi";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormat } from "../util/date";
import { useTodo } from "../hooks/useTodo";

export default function Detail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /** Todo 삭제 */
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      alert(`Todo가 삭제되었습니다.`);
      queryClient.invalidateQueries("todos");
      navigate(`/`);
    },
  });

  const deteleOnClickHanlder = (id: string) => {
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
        <AreaLabel>❤︎ 내용 자세히 보기</AreaLabel>
        <DetailArea>
          <DetailContent>
            <Title>{todoData.title}</Title>
            <Content>{todoData.content}</Content>
            <MoreInfo>❤️등록일: {formattedData}</MoreInfo>
            <MoreInfo>
              ❤️상태: {todoData.isDone ? "✔️이미 완료됨!" : "😮이제 해야함!"}
            </MoreInfo>
          </DetailContent>
          <Btns>
            <Button>수정</Button>
            <Button onClick={() => deteleOnClickHanlder(id)}>삭제</Button>
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
  background-color: #dab1bc;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 15px;
  box-shadow: 2px 2px 7px #966874;
`;

const DetailContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Btns = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
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
  height: 60px;
`;

const MoreInfo = styled.span`
  font-size: 12pt;
  line-height: 190%;
`;

const Button = styled.button`
  background-color: #b96e83;
  width: 40px;
  color: white;
  border: none;
  border-radius: 12px;
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
