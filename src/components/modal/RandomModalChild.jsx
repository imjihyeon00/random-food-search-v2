import styled from "styled-components";
import { StaticMap } from "react-kakao-maps-sdk";
import { useMemo } from "react";
import Button from "../Button";
import { BUTTON_SIZES_TYPE } from "../../constants/styled";

export default function RandomModalChild({ item }) { // ✅ 구조분해로 받기
  // Kakao API의 x/y는 문자열일 수 있으니 숫자로 변환
  const center = useMemo(() => ({
    lat: Number(item?.y),
    lng: Number(item?.x),
  }), [item?.y, item?.x]);

  const markers = useMemo(() => [{
    position: { lat: Number(item?.y), lng: Number(item?.x) },
    text: item?.place_name,
  }], [item?.y, item?.x, item?.place_name]);
  
  if (!item) return null;


  return(
    <Wrap>
      <StoreArea>

        <StaticMap
          center={center}
          style={{ width: "300px", height: "200px" }}
          level={3}
          onClick={() => {
            window.open(item.place_url, "_blank", "noopener,noreferrer");
          }}
          marker={markers}
        />
        <StoreInfo>
          <div className="title">
            <h2>{item.place_name}</h2>
            <span>{item.category_name.split(">").map(c => c.trim()).pop()}</span>
          </div>
          <p>{item.road_address_name}</p>
        </StoreInfo>
      </StoreArea>
      <Button
        text="카카오 맵으로 이동"
        size={BUTTON_SIZES_TYPE.lg}
        fullWidth={true}
        onClick={()=>{window.open(item.place_url, "_blank", "noopener,noreferrer");}}
      />

    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const StoreArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;
    font-size: 1rem;
    gap: 8px;

    h2 {
      font-size: 1.125rem;
      font-weight: 700;  
    }
    span {
      font-size: 0.875em;
    }
  }
`;