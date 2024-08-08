
# Node.js와 React를 사용한 BLOG

## 개요

이 프로젝트는 Node.js와 React를 사용하여 만든 블로그입니다. 회원가입과 로그인, 게시글 기능을 제공합니다.

## 주요 라이브러리 설치

### 서버 (Node.js)

서버 측에서 필요한 주요 라이브러리는 다음과 같습니다:

```bash
npm install express mongoose dotenv bcryptjs cookie-parser cors
```

### 클라이언트 (React)

클라이언트 측에서 필요한 주요 라이브러리는 다음과 같습니다:

```bash
npm install @mui/material @emotion/react @emotion/styled react-router-dom react-redux @reduxjs/toolkit redux-persist
```
## 기능 설명

### 회원가입

1. 사용자는 회원가입 페이지에서 이름, 이메일, 패스워드를 입력합니다.
2. `SignUp.jsx` 컴포넌트는 입력된 데이터를 서버의 `/api/auth/signup` 엔드포인트로 전송합니다.
3. 서버는 데이터를 받아 MongoDB에 사용자를 저장하고, 성공 시 클라이언트에 성공 메시지를 반환합니다.

### 로그인

1. 사용자는 로그인 페이지에서 이메일과 패스워드를 입력합니다.
2. `SignIn.jsx` 컴포넌트는 입력된 데이터를 서버의 `/api/auth/signin` 엔드포인트로 전송합니다.
3. 서버는 데이터를 검증하고, 성공 시 JWT 토큰을 생성하여 클라이언트에 반환합니다.
4. 클라이언트는 토큰을 저장하고 사용자를 로그인 상태로 변경합니다.

### 로그아웃

1. 사용자는 로그아웃 버튼을 클릭하여 로그아웃 요청을 보냅니다.
2. 클라이언트는 저장된 토큰을 삭제하고 사용자를 로그아웃 상태로 변경합니다.
