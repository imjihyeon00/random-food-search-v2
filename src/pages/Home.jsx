import { useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 맵 컴포넌트
import { styled } from 'styled-components';
import { BUTTON_SIZES_TYPE } from '../constants/styled';
import { FILTER_LIST } from '../constants/filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import useMapController from '../hook/useMapController';
import Button from '../components/Button';
import Modal from '../components/Modal';
import RandomModalChild from '../components/RandomModalChild';
import TryImage from '../assets/try_site.svg'; 
import StoreList from '../components/StoreList';
import ImageMessage from '../components/ImageMessage';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [selectStore, setSelectStore] = useState();
  const {
    center, isLoading, errMsg, onMapClick,
    chip, setChip,
    markers, results, status, error, ready, searchFood,
  } = useMapController({ initialChip: FILTER_LIST[0], radius: 500 });

  const onListClick = (item) => {
    setSelectStore(item)
    setModalOpen(true)
  }

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
              >
                <MarkerText>
                  {marker.content}
                </MarkerText>
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
            text={status==='loading' ? '검색 중…' : '검색'}
            disabled={!ready || status === "loading"}
            onClick={()=>{
              searchFood()
              setIsStart(true)
            }} 
            fullWidth={true}
            size={BUTTON_SIZES_TYPE.lg}
          />
        </FilterArea>
      </MapArea>
      {/* 음식점 리스트 */}
      <ListArea>
        {isStart ?
          <StoreList
            results={results}
            chip={chip}
            onItemClick={onListClick}
          />
          :
          <ImageMessage
            src={TryImage}
            text="오늘은 뭘 먹어볼까?!?!"
          />
        }
      </ListArea>
      <ImageMessage
        src={TryImage}
        text="오늘은 뭘 먹어볼까?!?!"
      />
      {/* Modal */}
      <Modal
        open={modalOpen}
        title="여기는 어때??"
        onClose={() => {
          setModalOpen(false)
          setSelectStore()
        }}
      >
        <RandomModalChild
          item={selectStore}
        />
      </Modal>
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
const MarkerText = styled.div`
  width: 100%;
  padding: 5px 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
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
  }

  @media (max-width: 768px) {
    /* 모바일 전용 스타일 */
    flex-direction: column;
  }
`;


const ListArea = styled.div`
  width: 100%;
  max-width: 1000px;
`;


