// 표시할 현재 버전과 노트만 바꿔서 배포
export const CHANGELOG = {
  version: "2.0.1",                 // ← 배포 때마다 올리기
  date: "2025-09-15",            // ← 배포 때마다 바꾸기 (YYYY-MM-DD)
  notes: [
    "사이드 메뉴 추가",
    "이용 방법 페이지 추가",
    "그 외 일부 버그 수정 및 개선",
  ],
};

// localStorage에 저장할 키 (변경하지 말 것)
export const CHANGELOG_STORAGE_KEY = "todayRandomFood.changelog.version";
