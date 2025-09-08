import { useEffect, useRef, useState } from "react";
import { CHANGELOG_STORAGE_KEY } from "../constants/changelog";

/**
 * - shouldShow: 이번 버전의 변경 이력을 보여줄지 여부
 * - markDismiss(): '다시 보지 않기' 기록 저장(이번 버전에 한해)
 * - reset(): 기록 초기화(디버깅용)
 * - 진입 시 이전 버전 기록은 자동 삭제
 */
export default function useChangelogGate(currentVersion) {
  const [shouldShow, setShouldShow] = useState(false);
  const checkedRef = useRef(false); // 중복 체크 방지

  useEffect(() => {
    if (!currentVersion || checkedRef.current) return;
    checkedRef.current = true;

    try {
      const saved = localStorage.getItem(CHANGELOG_STORAGE_KEY);

      // 이전 버전 기록이면 삭제(새 배포 시 자동 초기화)
      if (saved && saved !== currentVersion) {
        localStorage.removeItem(CHANGELOG_STORAGE_KEY);
      }

      const dismissed = localStorage.getItem(CHANGELOG_STORAGE_KEY);
      setShouldShow(!dismissed); // 기록이 없으면 보여주기
    } catch {
      setShouldShow(true); // localStorage 접근 안 되면 그냥 보여줌
    }
  }, [currentVersion]);

  const markDismiss = () => {
    try {
      localStorage.setItem(CHANGELOG_STORAGE_KEY, currentVersion);
    } catch {
      console.error("Failed to save changelog dismissal.");
      
    }
    setShouldShow(false);
  };

  const reset = () => {
    try { localStorage.removeItem(CHANGELOG_STORAGE_KEY); } catch {
      console.error("Failed to reset changelog dismissal.");
    }
    setShouldShow(true);
  };

  return { shouldShow, markDismiss, reset };
}
