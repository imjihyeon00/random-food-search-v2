// 표시할 현재 버전과 노트만 바꿔서 배포
export const CHANGELOG = {
  version: "2.0.0",                 // ← 배포 때마다 올리기
  date: "2025-08-31",            // ← 배포 때마다 바꾸기 (YYYY-MM-DD)
  notes: [
    "v2.0.0 버전 출시",
    "전체 UI/UX 개선 및 반응형 디자인 적용",
    "React Router 적용 및 페이지 추가 (개인정보 처리방침, 이용약관)",
    "헤더에 홈 링크 추가",
    "Footer에 문의하기 모달 추가",
    "문의하기 reCAPTCHA 적용 및 CORS 개선",
    "검색 완료 시 지도 중심/레벨 자동 복구",
  ],
};

// localStorage에 저장할 키 (변경하지 말 것)
export const CHANGELOG_STORAGE_KEY = "todayRandomFood.changelog.version";
