import { useEffect, useMemo, useRef, useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk"; // 카카오 맵 컴포넌트
import styled, { keyframes } from 'styled-components';
import { BUTTON_SIZES_TYPE } from '../constants/styled';
import { FILTER_LIST } from '../constants/filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import TryImage from '../assets/try_site.svg'; 
import ErrorIcon from '../assets/error_icon.svg'; 
import useMapController from '../hook/useMapController';
import Button from '../components/Button';
import Modal from '../components/modal/Modal';
import RandomModalChild from '../components/modal/RandomModalChild';
import ImageMessage from '../components/ImageMessage';
import StoreList from '../components/StoreList';
import ChangelogModalChild from '../components/modal/ChangelogModalChild';
import useChangelogNotice from '../hook/useChangelogNotice';
import { CHANGELOG } from '../constants/changelog';

export default function Home() {
  const mapRef = useRef(null);

  const [isStart, setIsStart] = useState(false);
  const {
    center, isLoading, errMsg, onMapClick,
    chip, setChip,
    markers, results, status, error, ready, searchFood, randomStore
  } = useMapController({ initialChip: FILTER_LIST[0], radius: 500 });

  /**
   * 모달 관리
   */
  // 1) 홈 진입 시 보여줄지 판단
  const { shouldShow, markDismiss } = useChangelogNotice({
    version: CHANGELOG.version,
    lastUpdatedDate: CHANGELOG.date, // "YYYY-MM-DD" 권장
    expireAfterDays: 30,             // ✅ 30일 기준
  });

  // 2) 공용 모달 매니저 (type으로 Child 스위칭)
  const [modal, setModal] = useState({
    open: false,
    type: null,          // 'changelog' | 'contact' | 'random' | ...
    props: {},
    title: "",
  });

  const REGISTRY = useMemo(() => ({
    changelog: ChangelogModalChild,
    random:  RandomModalChild,
  }), []);

  const openModal = (type, { title = "", props = {} } = {}) =>
    setModal({ open: true, type, props, title });

  const closeModal = () =>
    setModal(prev => ({ ...prev, open: false }));

  // 3) 진입 시 필요할 때만 changelog 자동 오픈(1회)
  useEffect(() => {
    if (shouldShow) openModal("changelog", { title: "업데이트 안내" });
  }, [shouldShow]);

  // 4) Child 선택
  const ActiveChild = modal.type ? REGISTRY[modal.type] : null;

  // 5) 다시 보지 않기(해당 모달 열려 있을 때만)
  const handleDontShowAgain = () => {
    if (modal.type !== "changelog") return;
    markDismiss();
    closeModal();
  };
  

  /**
   * 리스트 아이템 클릭 시 모달 열기
   * @param {*} item 
   */
  const onListClick = (item) => {
    openModal("random", { title: "여기는 어때?!?!", props: { item } });
  }

  // Random으로 가져온 음식점 모달띄우기
  useEffect(() => {
    if (results.length > 0 && randomStore) {
      onListClick(randomStore);
    }
  }, [results]);

  // 검색 완료 후 map위치 변경
  useEffect(() => {
    if (!mapRef.current || !center) return;
    if (!(status === "ok" || status === "zero" || status === "error")) return;
    if (!window.kakao?.maps?.LatLng) return;

    const latlng = new window.kakao.maps.LatLng(Number(center.lat), Number(center.lng));
    mapRef.current.setCenter(latlng);
    mapRef.current.setLevel(4);
  }, [status, center]);

  return (
    <HomeContainer>
      <MapArea>
        <MapBox>
          <Map
            center={center}
            style={{ width: "100%", height: "100%" }}
            level={3}
            onClick={onMapClick}
            onCreate={(map) => { mapRef.current = map; }}
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
        {error &&
          <ImageMessage
            src={ErrorIcon}
            text={error}
          />
        }
        {isStart ?
          <>
            {status === "loading" ?
              <Loading>
                <div></div>
                <div></div>
                <div></div>
              </Loading>
              :
              <>
                {!error &&
                  <StoreList
                    results={results}
                    chip={chip}
                    onItemClick={onListClick}
                  />
                }
              </>
            }
          </>
          :
          <ImageMessage
            src={TryImage}
            text="오늘은 뭘 먹어볼까?!?!"
          />
        }
      </ListArea>
      {/* Modal */}
      {/* <Modal
        open={modal?.open}
        title={modal?.title}
        onClose={closeModal}
        onClose={() => {
          setModalOpen(false)
          setSelectStore()
        }}
      >
        <RandomModalChild
          item={selectStore}
        />
      </Modal> */}
      {/* 공용 모달 */}
      <Modal 
        open={modal.open} 
        title={modal.title} 
        onClose={closeModal}
      >
        {ActiveChild && (
          <ActiveChild
            {...modal.props}
            onClose={closeModal}
            onDontShowAgain={handleDontShowAgain} // ChangelogContent에서만 사용
          />
        )}
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

const bounce = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1rem, 0);
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;

  div {
    width: 1rem;
    height: 1rem;
    margin: 2rem 0.3rem;
    background: #FFA853;
    border-radius: 50%;
    animation: 0.9s ${bounce} infinite alternate;

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }
`;
