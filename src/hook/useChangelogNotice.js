// src/hooks/useChangelogGate.js
import { useEffect, useMemo, useRef, useState } from "react";
import { CHANGELOG_STORAGE_KEY } from "../constants/changelog";

/**
 * @param {object} opts
 * @param {string} opts.version            - 현재 앱 버전 (예: "2.0.0")
 * @param {string} opts.lastUpdatedDate    - 마지막 업데이트 일자 ("YYYY-MM-DD" 권장)
 * @param {number} opts.expireAfterDays    - N일 경과 시 모달 표시하지 않음 (기본 30일)
 *
 * 반환:
 * - shouldShow: 이번 버전을 모달로 보여줄지 여부
 * - markDismiss(): 이번 버전에 한해 '다시 보지 않기' 기록
 * - reset(): 기록 초기화(디버깅용)
 * - isExpired: 날짜 만료 여부
 */
export default function useChangelogNotice({
  version,
  lastUpdatedDate,
  expireAfterDays = 30,
}) {
  const [shouldShow, setShouldShow] = useState(false);
  const checkedRef = useRef(false);

  // 날짜 만료 여부 (일수 기준)
  const isExpired = useMemo(() => {
    if (!lastUpdatedDate) return false;
    // YYYY-MM-DD 권장 (타임존 흔들림 방지)
    const base = new Date(`${lastUpdatedDate}T00:00:00`);
    if (isNaN(base.getTime())) return false;

    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((Date.now() - base.getTime()) / msPerDay);
    return diffDays >= expireAfterDays;
  }, [lastUpdatedDate, expireAfterDays]);

  useEffect(() => {
    if (!version || checkedRef.current) return;
    checkedRef.current = true;

    // 1) 만료면 표시 안 함
    if (isExpired) {
      setShouldShow(false);
      return;
    }

    // 2) 버전 기반 로컬 기록 확인
    try {
      const saved = localStorage.getItem(CHANGELOG_STORAGE_KEY);

      // 이전 버전 기록이면 삭제(새 배포 시 자동 초기화)
      if (saved && saved !== version) {
        localStorage.removeItem(CHANGELOG_STORAGE_KEY);
      }

      const dismissed = localStorage.getItem(CHANGELOG_STORAGE_KEY);
      setShouldShow(!dismissed); // 기록이 없으면 보여주기
    } catch {
      setShouldShow(true); // localStorage 접근 불가 시엔 보여줌
    }
  }, [version, isExpired]);

  const markDismiss = () => {
    try {
      localStorage.setItem(CHANGELOG_STORAGE_KEY, version);
    } catch {
      console.error("Failed to save changelog dismissal to localStorage.");
      
    }
    setShouldShow(false);
  };

  const reset = () => {
    try { localStorage.removeItem(CHANGELOG_STORAGE_KEY); } catch {
      console.error("Failed to reset changelog dismissal in localStorage.");
    }
    setShouldShow(!isExpired);
  };

  return { shouldShow, markDismiss, reset, isExpired };
}
