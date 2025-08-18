import { useEffect, useMemo, useState } from "react";

export default function useGeolocation(initialCenter = { lat: 37.5665, lng: 126.9780 }) {
  const [center, setCenter] = useState(initialCenter);
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const supported = useMemo(() => typeof window !== "undefined" && "geolocation" in navigator, []);

  useEffect(() => {
    if (!supported) {
      setErrMsg("geolocation을 사용할 수 없어요.");
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setErrMsg(null);
        setIsLoading(false);
      },
      (err) => {
        console.error(err?.message);
        
        setErrMsg("현재 위치를 가져오지 못했어요. 원하는 위치를 클릭해 주세요.");
        setIsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }, [supported]);

  return { center, setCenter, errMsg, setErrMsg, isLoading, supported };
}
