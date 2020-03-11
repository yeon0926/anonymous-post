## 기획
### 개요

많은사람들이 이 게시판에 들어와서 익명으로 자유롭게 여러주제로 이야기를 나누고 소통을 하는 공간이다.

### API spec


`POST /api/main` : 게시물목록을 한번에 응답하는 API. pageNum을 받으면 그 페이지에 들어갈 모든 데이터들을 배열로 정렬해서 불러온뒤 id, date, title, commany로 응답한다.
- Request Header : X
- Params : X
- Request Body : pageNum
- Success Code : X
- Response Header : id, date, title, commany

`POST /api/writePost` : 게시물 작성 API. 날짜와 제목 내용을 주면 db에 댓글수와 id를 추가하여 넣고, 성공시 success = true로 응답한다.
  - Request Header : X
  - Params : X
  - Request Body : date, contents, title
  - Success Code : X
  - Response Header : success

`POST /api/Post` : 게시물 조회 API. 게시물의 id를 주면 제목과 내용, 날짜, 댓글수를 응답한다.
  - Request Header : X
  - Params : X
  - Request Body : id
  - Success Code : X
  - Response Header : title, contents, date, commany

`POST /api/commentPost` : 댓글 작성 API. 게시물 id 와 comment를 저장해주고, 성공시 success = true로 응답한다. O
  - Request Header : X
  - Params : X
  - Request Body : id, comments
  - Success Code : X
  - Response Header : success

`GET /api/comment` : 댓글 목록 API. 게시물 id를 받으면 날짜순으로 정렬한 댓글을 배열로 응답한다. O
  - Request Header : X
  - Params : X
  - Request Body : id
  - Success Code : X
  - Response Header : comments