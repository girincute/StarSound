StarSound
=============

## 기술스택
### Client
* React
* EJS (templete Engine)
* HTML / CSS
### Server
* Docker
  * https://github.com/osixia/docker-openldap
  * https://github.com/osixia/docker-phpLDAPadmin
* Node JS
### DB
* MySQL

## 팀
* 김예빈 미림여자정보과학고등학교
* 김두리 미림여자정보과학고등학교
* 김민근 서울아이티고등학교
* 이현찬 경기자동차과학고등학교
* 김영서 평촌경영고등학교

## API
객체 응답 결과는 JSON 이다

```js

#Board

GET SERVER/board 전체 글 보기
GET SERVER/board/:id 특정 글 보기
GET SERVER/board/:id/like 특정 글 좋아요
GET SERVER/board/search/:description 특정 내용 검색

POST /board 글 보내기
body : 
  title : 제목
  description : 내용

DELETE /board/:id 특정 글 지우기


```
