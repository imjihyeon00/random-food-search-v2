# 🍽️ 오늘 뭐 먹지?

**오늘 뭐 먹지?**는 사용자의 현재 위치를 기반으로 주변 음식점을 검색하고,  
랜덤으로 한 곳을 추천해주는 웹 서비스입니다.  
메뉴 고르기 힘든 순간, 오늘의 식사 선택을 도와줍니다!  

👉 [서비스 바로가기](https://random-food-store.web.app/)
👉 [Figma 레이아웃 바로가기](https://www.figma.com/proto/Bg81NPxBdIBI1s3hoFtieG/%EC%98%A4%EB%8A%98-%EB%AD%90-%EB%A8%B9%EC%A7%80?page-id=0%3A1&node-id=1-2&p=f&viewport=89%2C-74%2C0.2&t=RmlIRQUFVQiuMKMf-1&scaling=min-zoom&content-scaling=fixed)

---

## ✨ 주요 기능

- **현재 위치 기반 추천**: 브라우저 위치 정보를 이용해 주변 음식점 탐색
- **랜덤 선택**: 검색된 음식점 중 한 곳을 무작위로 추천
- **필터 기능**: 한식/양식/일식/중식/분식/아시아음식/전체 카테고리별 검색 가능
- **지도 연동**: 카카오맵 SDK를 사용한 실시간 지도 표시 및 마커
- **문의하기**: 팝업에서 이메일/내용 입력 → 관리자가 메일로 확인 가능
- **정책 페이지**: 개인정보처리방침, 이용약관 등
- **반응형 디자인**: 모바일/데스크톱 모두 최적화
- **광고 준비**: 구글 애드센스 배너/인피드 광고 영역 확보

---

## 🛠️ 기술 스택

- **Frontend**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- **Styling**: [styled-components](https://styled-components.com/)
- **Map API**: [Kakao Maps SDK](https://apis.map.kakao.com/)
- **Routing**: [react-router-dom](https://reactrouter.com/)
- **Hosting**: [Firebase Hosting](https://firebase.google.com/)
- **CI/CD**: GitHub Actions

---

## 📂 프로젝트 구조 (발췌)

```
src/
 ├── assets/             # 이미지/아이콘
 ├── components/         # 재사용 가능한 UI 컴포넌트 (Header, Footer, Modal 등)
 ├── constants/          # 상수 (필터 리스트, 버튼 스타일 등)
 ├── hooks/              # 커스텀 훅 (useMapController, useKakaoPlacesByChip 등)
 ├── pages/              # 라우트 페이지 (Home, Blog, About, HowTo, Privacy, Terms 등)
 ├── styles/             # 글로벌 스타일, 테마
 ├── content/posts/      # (블로그) Markdown 글 저장 위치
 └── main.jsx            # 진입점
```

---

## 🚀 실행 방법

### 1. 클론 & 의존성 설치
```bash
git clone https://github.com/yourname/random-food-store.git
cd random-food-store
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 루트에 생성하고 아래 값을 채워주세요.

```
VITE_KAKAO_API_KEY=카카오맵_JavaScript_API_KEY
VITE_CONTACT_ENDPOINT=GoogleAppsScript_웹앱_URL
VITE_RECAPTCHA_SITE_KEY=구글_reCAPTCHA_v3_사이트키
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

### 5. Firebase Hosting 배포
```bash
firebase deploy
```

---

