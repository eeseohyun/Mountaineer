# ⛰️ Mountaineer

등린이부터 등른이까지 모든 사람들을 위한 등산 커뮤니티 웹사이트

## 🧐 Introduction

---

등산을 사랑하는 이들이 모여 산악지식과 산행 경험을 공유하고, 함께 성장하고 소통하는 등산 커뮤니티 Mountaineer에서 등산을 더욱 풍요롭고 의미있게 즐겨보세요!
단순 사진 업로드를 넘어, 여행 경로, 산행 일정, 등산 코스에 대한 자세한 기록을 남길 수 있습니다. 여러분의 등산 일지를 통해 다른 사용자들에게 산행에 대한 정보와 팁을 제공하며, 여러분도 다른 등산객들의 경험을 공유하고 소통할 수 있습니다. 또한 다양한 산악회나 등산 그룹에 참여하여 멤버들과 함께 산행 일정을 계획하고 소통할 수도 있습니다.

## 🗓️ Period

---

- 23.4.24 ~ 5. 19 (약 4주)

## 🛠️ Installation

---

1. Clone this Repo by running `git clone https://github.com/eeseohyun/mountaineer`
2. `cd mountaineer`
3. `npm install`
4. `npm run dev`

## ⭐️ Project Doc

---

### ⚡️ Built with

| package name                                                                                                       | version |
| ------------------------------------------------------------------------------------------------------------------ | ------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">               | 18.2.0  |
| <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=black"> | 6.10.0  |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">     | 4.9.5   |
| <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=black"> | 3.3.2   |
| <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=black">           | 18.16.3 |
| <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=yellow">                | 4.2.0   |
| <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">         | 9.21.0  |
| <img src="https://img.shields.io/badge/.Env-ECD53F?style=for-the-badge&logo=.Env&logoColor=black">                 | 16.0.3  |

### 📂 Pages

- Home : 메인 홈페이지
- Join : 회원가입 페이지
- Login : 로그인 페이지
- Profile : 프로필 수정 페이지
- Search : 검색결과 페이지
- Post : 글쓰기 페이지
- ClubPage : 산악회 모집글 페이지
- Detail : 게시물 상세페이지
- Edit : 게시물 수정페이지 (Only User)
- MyClubs : 나의 참여 산악회 페이지
- MyPosts : 나의 게시물 페이지
- FreeBoard : 자유 게시판 페이지 (준비중)
- InfoBoard : 정보 게시판 페이지 (준비중)

### 💾 Database

- 게시글
  |필드명 |타입 |설명 |
  |------------|-------|-----|
  |id |string|게시글 ID |
  |userId |string |작성자(유저 기본키) |
  |title |string |글 제목 |
  |category |string |지역 카테고리(도 단위) |
  |schedule |string |산행 일정 |
  |context |string |본문내용 |
  |participantsNum |string |인원제한(명) |
  |isParticipationed |string |참가자 수 |
  |createdDate |string |작성날짜 |
  |img |string |글 이미지 |
  |userNickname |string |유저 닉네임 |
  |profileImg |string |유저 프로필 사진 |
- 댓글
  |필드명 |타입 |설명 |
  |------------|-------|-----|
  |id |string|댓글 ID |
  |postId |string |게시글 ID |
  |text |string |댓글 내용 |
  |userId|string |댓글 작성자(유저) |
  |userNickname |string |유저 닉네임 |
  |userProfile |string |유저 프로필 |
  |timestamp |timestamp |댓글 작성날짜 |
- 유저 정보
  `문서 ID = 유저ID로 설정`
  |필드명 |타입 |설명 |
  |------------|-------|-----|
  |displayNname |string |유저 닉네임 |
  |email |string |유저 이메일 |
  |photoURL |string |유저 프로필 |

## 📌 Information

---

- [Pre 기획](https://rustic-meat-d76.notion.site/Pre-_-b324698b5bf2475182deb35863118c3c)
- [프로젝트 주요 기능](https://rustic-meat-d76.notion.site/1e2b5f9121d4424fa09b5b7c2b502470)

## 추후 개선점

---

- 게시판 추가 (자유 & 정보 게시판)
- 댓글 알람
- 대댓글 기능 구현
- 검색 기능 향상
- 산악 정보 서비스 API

## Author

---

- [Seohyun Lee(이서현)]()
