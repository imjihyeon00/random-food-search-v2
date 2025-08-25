// src/hooks/useKakaoPlacesByChip.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FILTER_LIST } from "../constants/filter";

export default function useKakaoPlacesByChip({
  chip = FILTER_LIST[0],
  center,
  radius = 500,
  pageSize = 15,
  maxPages = 3,        // Kakao JS SDK는 보통 3페이지(45개) 한계
} = {}) {
  const [results, setResults] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|ok|zero|error
  const [error, setError] = useState(null);
  const [randomStore, setRandomStore] = useState()


  const psRef = useRef(null);
  const centerRef = useRef(center);
  const searchTokenRef = useRef(0);
  useEffect(() => { centerRef.current = center; }, [center]);

  const hasSDK = useMemo(() => {
    const k = typeof window !== "undefined" ? window.kakao : undefined;
    return !!(k && k.maps && k.maps.services && k.maps.services.Places);
  }, []);

  const ensureService = useCallback(() => {
    if (!hasSDK) return null;
    if (!psRef.current) {
      psRef.current = new window.kakao.maps.services.Places();
    }
    return psRef.current;
  }, [hasSDK]);

  const isAll = chip === "전체";

  // ❶ 단일 페이지를 Promise로 감싸기 (SDK의 pagination → 우리쪽 isEnd)
  const fetchPage = useCallback((ps, loc, page) => {
    return new Promise((resolve) => {
      const opts = { location: loc, radius, page, size: pageSize };
      const cb = (data, s, pagination) => {
        if (s === window.kakao.maps.services.Status.OK) {
          const pageData = isAll ? data : data.filter(d => d.category_group_code === "FD6");
          const isEnd = !(pagination?.hasNextPage) || page >= maxPages; // ← SDK를 isEnd로 추상화
          resolve({ ok: true, isEnd, data: pageData });
        } else if (s === window.kakao.maps.services.Status.ZERO_RESULT) {
          resolve({ ok: true, isEnd: true, data: [] });
        } else {
          resolve({ ok: false, isEnd: true, data: [], error: "검색 중 오류가 발생했어요." });
        }
      };
      isAll ? ps.categorySearch("FD6", cb, opts) : ps.keywordSearch(chip, cb, opts);
    });
  }, [radius, pageSize, maxPages, isAll, chip]);

  // ❷ 전체 페이지 수집
  const searchFood = useCallback(async () => {
    const token = ++searchTokenRef.current;

    if (!hasSDK) { setStatus("error"); setError("Kakao SDK not ready"); return; }
    const c = centerRef.current;
    if (!c?.lat || !c?.lng) { setStatus("error"); setError("검색 기준 좌표가 없습니다."); return; }

    const ps = ensureService();
    if (!ps) return;

    setStatus("loading");
    setError(null);
    setResults([]);
    setMarkers([]);

    const loc = new window.kakao.maps.LatLng(Number(c.lat), Number(c.lng));

    const acc = [];
    const accMarkers = [];

    let page = 1;
    while (true) {
      const res = await fetchPage(ps, loc, page);
      // 중간에 새 검색이 시작되면 중단
      if (token !== searchTokenRef.current) return;

      if (!res.ok) {
        setResults([]);
        setMarkers([]);
        setStatus("error");
        setError(res.error || "검색 중 오류가 발생했어요.");
        return;
      }

      acc.push(...res.data);
      for (const d of res.data) {
        accMarkers.push({
          position: { lat: Number(d.y), lng: Number(d.x) },
          content: d.place_name,
        });
      }

      if (res.isEnd) break;
      page += 1;
    }

    setResults(acc);
    setMarkers(accMarkers);
    setStatus(acc.length ? "ok" : "zero");
    setRandomStore(acc[Math.floor(Math.random() * acc.length)]);

  }, [hasSDK, ensureService, fetchPage]);

  return {
    markers,
    results,
    randomStore,
    status,
    error,
    ready: hasSDK,   // 버튼 활성화에 사용
    searchFood,      // 버튼 클릭 시 호출
  };
}
