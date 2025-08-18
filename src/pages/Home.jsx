import { styled } from 'styled-components';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { BUTTON_SIZES_TYPE } from '../constants/styled';
import TryImage from '../assets/try_site.svg'; 
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 맵 컴포넌트
import useMapController from '../hook/useMapController';
import { FILTER_LIST } from '../constants/filter';
import { useEffect } from 'react';

export default function Home() {
  const {
    center, isLoading, errMsg, onMapClick,
    chip, setChip,
    results, markers, searchFood,
  } = useMapController({ initialChip: FILTER_LIST[0], radius: 500 });



  useEffect(()=>{
    console.log("resultes: ",results);
    
  },[results])
  return (
    <HomeContainer>
      <MapArea>
        <MapBox>
          <Map
            center={center}
            style={{ width: "100%", height: "100%" }}
            level={3}
            onClick={onMapClick}
          >
            {!isLoading && (
              <MapMarker 
                position={center}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35
                  }, // 마커이미지의 크기입니다
                }}
              >
                <div style={{ padding: 5, color: "#000" }}>
                  {errMsg ? errMsg : "여기에 계신가요?!"}
                </div>
              </MapMarker>
            )}
            {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                // onClick={() => setInfo(marker)}
              >
                {/* {info &&info.content === marker.content && ( */}
                  <div style={{color:"#000"}}>{marker.content}</div>
                {/* )} */}
              </MapMarker>
            ))}
          </Map>
        </MapBox>

        <FilterArea>
          <FilterBox>
            <p>
              <FontAwesomeIcon icon={faFilter} />
              <span> 필터링</span>
            </p>
            <div className='filter-list'>
              {FILTER_LIST.map((c) => (
                <Button
                  key={c}
                  onClick={() => setChip(c)}
                  active={chip==c}
                  text={c}
                />
              ))}
            </div>
          </FilterBox>
          <Button 
            text="랜덤 음식점 찾기" 
            onClick={()=>{searchFood()}} 
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