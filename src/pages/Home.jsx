import React from 'react';
import { styled } from 'styled-components';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { BUTTON_SIZES_TYPE } from '../constants/styled';
import TryImage from '../assets/try_site.svg'; 
export default function Home() {
  return (
    <HomeContainer>
      <MapArea>
        <MapBox>
          map위치
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