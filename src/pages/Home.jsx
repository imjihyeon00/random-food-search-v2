import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { BUTTON_SIZES_TYPE } from '../constants/styled';
import TryImage from '../assets/try_site.svg'; 
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 맵 컴포넌트

export default function Home() {
  const [mpaState, setMapState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setMapState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMapState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  return (
    <HomeContainer>
      <MapArea>
        <MapBox>
          <Map // 지도를 표시할 Container
            center={mpaState.center}
            style={{
              // 지도의 크기
              width: "100%",
              height: "100%",
            }}
            level={3} // 지도의 확대 레벨
          >
            {!mpaState.isLoading && (
              <MapMarker position={mpaState.center}>
                <div style={{ padding: "5px", color: "#000" }}>
                  {mpaState.errMsg ? mpaState.errMsg : "여기에 계신가요?!"}
                </div>
              </MapMarker>
            )}
          </Map>
        </MapBox>

        <FilterArea>
          <FilterBox>
            <p>
              <FontAwesomeIcon icon={faFilter} />
              <span> 필터링</span>
            </p>
            <div className='filter-list'>
              <Button 
                text="전체" 
                className="active" 
                onClick={() => {}}
              />
              <Button 
                text="한식" 
                onClick={()=>{}}
              />
              <Button 
                text="양식" 
                onClick={()=>{}}
              />
              <Button 
                text="아시아음식" 
                onClick={()=>{}}
              />
              <Button 
                text="일식" 
                onClick={()=>{}}
              />
              <Button 
                text="중식" 
                onClick={()=>{}}
              />
              <Button 
                text="분식" 
                onClick={()=>{}}
              />
              {/* <Button text="카페/디저트" /> */}
            </div>
          </FilterBox>
          <Button 
            text="랜덤 음식점 찾기" 
            onClick={() => alert('랜덤 음식점 찾기 클릭!')} 
            fullWidth={true}
            size={BUTTON_SIZES_TYPE.lg}
          />
        </FilterArea>
      </MapArea>
      <ListArea>
        <TryBox>
          <img src={TryImage} alt="랜덤 음식점 찾기" />
          <p>오늘은 뭘 먹어볼까?!?!</p>
        </TryBox>
      </ListArea>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;  
`;

const MapArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;  
`;
// 600 * 450 비율에 맞춰서 설정
const MapBox = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 600 / 450;
  background-color: #e0e0e0;
`;
const FilterArea = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  gap: 10px;

  p {
    white-space: nowrap;
  }

  .filter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    button {
      width: auto;
    }
  }

  @media (max-width: 768px) {
    /* 모바일 전용 스타일 */
    flex-direction: column;
  }
`;


const ListArea = styled.div`
  width: 100%;
`;

const TryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 70px 0;

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  p {
    text-align: center;
    font-size: 1rem;
    color: #666;
  }
`;