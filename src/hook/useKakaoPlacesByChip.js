// src/hooks/useKakaoPlacesByChip.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FILTER_LIST } from "../constants/filter";

// chip: "전체" | "한식" | ...
export default function useKakaoPlacesByChip({
  chip = FILTER_LIST[0],
  center,           // { lat, lng } - 검색 기준점(내가 정한 위치)
  radius = 3000,    // meters
} = {}) {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|ok|zero|error
  const [error, setError] = useState(null);
  const psRef = useRef(null);
  const centerRef = useRef(center);
  useEffect(() => { centerRef.current = center; }, [center]);

  // SDK 준비 여부
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

  const searchFood = useCallback(() => {
    
    // 필수 전제 체크
    if (!hasSDK) {
      
      setError("Kakao SDK not ready");
      return;
    }
    const currentCenter = centerRef.current;
    if (!currentCenter?.lat || !currentCenter?.lng) {
      
      setError("검색 기준 좌표가 없습니다.");
      return;
    }
    const ps = ensureService();
    if (!ps) return;

    setStatus("loading");
    setError(null);

    const loc = new window.kakao.maps.LatLng(currentCenter.lat, currentCenter.lng);
    const opts = { location: loc, radius, page: 1, size: 15 };

    const cb = (data, s, _pagination) => {
      if (s === window.kakao.maps.services.Status.OK) {
        const filtered = isAll ? data : data.filter(d => d.category_group_code === "FD6");
        setResults(filtered);
        setStatus(filtered.length ? "ok" : "zero");
        console.log(filtered);
        
      } else if (s === window.kakao.maps.services.Status.ZERO_RESULT) {
        setResults([]);
        setStatus("zero");
      } else {
        setResults([]);
        setStatus("error");
        setError("검색 중 오류가 발생했어요.");
      }
    };

    if (isAll) {
      // 음식점 전체: FD6
      ps.categorySearch("FD6", cb, opts);
    } else {
      // 특정 카테고리 키워드
      ps.keywordSearch(chip, cb, opts);
    }
  }, [hasSDK, radius, isAll, chip, ensureService]);


  return {
    results,
    status,
    error,
    ready: hasSDK,   // 버튼 활성화에 사용
    searchFood,      // 버튼 클릭 시 호출
  };
}
