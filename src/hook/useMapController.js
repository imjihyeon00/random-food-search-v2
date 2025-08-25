import { useCallback, useState } from "react";
import useGeolocation from "./useGeolocation";
import useKakaoPlacesByChip from "./useKakaoPlacesByChip";
import { FILTER_LIST } from "../constants/filter";

export default function useMapController({
  initialChip = FILTER_LIST[0],
  radius = 500,
} = {}) {
  const { center, setCenter, errMsg, setErrMsg, isLoading, supported } = useGeolocation();
  const [chip, setChip] = useState(initialChip);

  const { markers, results, status, error, ready: hasSDK, searchFood,} =
    useKakaoPlacesByChip({ chip, center, radius });

  const onMapClick = useCallback((_, mouseEvent) => {
    const latlng = mouseEvent?.latLng;
    if (!latlng) return;
    setCenter({ lat: latlng.getLat(), lng: latlng.getLng() }); // 뷰 중심 이동
    setErrMsg(null);
  }, [setCenter, setErrMsg]);

  return {
    // 뷰/위치
    center, setCenter, isLoading, errMsg, supported,

    // 칩/검색 기준점
    chip, setChip,

    // 검색
    markers, results, status, error, ready: hasSDK, searchFood,

    // 지도 이벤트
    onMapClick,
  };
}
