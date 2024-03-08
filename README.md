# ❤️ MY TODO LIST❤️

![image](https://github.com/redberry0217/myTodoList_typeScript/assets/153061626/e9c81d97-c98e-4557-b3fe-e703e2494feb)

TypeScript를 활용하여 다시 만들어 본 투두리스트 입니다.

우선순위 설정, 정렬 기능, 상세페이지 기능도 추가해보았습니다.

## ✨개발 기간

2024.02.04(월) ~ 08(금)

## ✨시작 가이드

```
$ git clone https://github.com/redberry0217/myTodoList_typeScript.git
$ npm install
$ npm run db (localhost:4000)
$ npm start
```

## ✨페이지와 기능
### 메인 페이지
  * 헤더에서 제목, 내용을 입력하고 우선순위를 선택하여 새로운 Todo를 등록
  * 등록된 Todo List와 Done List를 아래에 표시
  * 우상단에 있는 select를 통해 우선순, 최신등록순으로 Todo List를 소팅
  * Todo의 내용이 길어지면 ...로 생략처리
  * Todo의 완료버튼 클릭 시 해당 Todo를 Done List로 이동
  * Done List에서 취소버튼 클릭 시 해당 Todo를 Todo List로 이동
  * Todo 클릭 시 해당 Todo의 상세페이지로 이동

### 상세 페이지
  * 클릭한 Todo의 상세 페이지
  * 메인에서 ...로 생략되었던 내용을 모두 표시
  * Todo의 등록일시와 완료 여부를 표시
  * 수정 버튼을 클릭하여 Todo의 제목, 내용, 우선순위를 수정
  * 삭제 버튼을 클릭하여 해당 Todo를 삭제
  * 뒤로가기 버튼 클릭 시 메인 페이지로 이

## ✨사용된 기술

  * React
  * React-Query
  * Axios
  * Styled-components
  * Json-server
  * TypeScript

## ✨어려웠던 점

  * `TypeScript`가 가장 어려웠습니다. 새로운 Type(Interface)를 만들어주고 적용해주는 것이 낯설었고, '보내주기로 한 데이터'와 '받기로 한 데이터'의 타입을 일치시켜 주는 것이 어려웠습니다. 특히 관련해서는 Todo를 수정하는 부분에서 가장 헤맸던 것 같습니다.
  * 이렇게나 많은 에러 가능성이 도처에 도사리고 있는 채로 기존에 개발을 했었구나 하고 깨달을 수 있기도 했습니다.
  * 처음에는 Todo 우선순위 3가지(보통, 중요, 매우중요)를 `enum`으로 작성해보려고 했는데 잘 안되어서 포기했습니다. enum, object literal에 대해서 좀 더 공부해야겠다고 생각했습니다.
