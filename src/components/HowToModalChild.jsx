import React from "react";
import styled from "styled-components";

export default function HowToModalChild() {
  return (
    <Wrap>
      <Step>
        <Num>1</Num>
        <Txt>
          <strong>위치 확인</strong>
          <span>
            접속 시 현재 위치를 불러옵니다. 지도 중앙의 ⭐ 마커가 내 위치예요.
            기준점을 바꾸려면 지도를 클릭하세요.
          </span>
        </Txt>
      </Step>

      <Step>
        <Num>2</Num>
        <Txt>
          <strong>필터 선택</strong>
          <span>
            <Code>전체 / 한식 / 양식 / 일식 / 중식 / 아시아음식 / 분식</Code> 중
            원하는 카테고리를 고르세요.
          </span>
        </Txt>
      </Step>

      <Step>
        <Num>3</Num>
        <Txt>
          <strong>검색 시작</strong>
          <span>
            <b>“랜덤 음식점 찾기”</b> 버튼을 눌러 주변(<em>반경 약 500m</em>)을
            검색합니다. 결과는 지도와 목록으로 표시돼요.
          </span>
        </Txt>
      </Step>

      <Step>
        <Num>4</Num>
        <Txt>
          <strong>목록 확인</strong>
          <span>
            가게명, 카테고리, 주소, 전화번호를 확인하세요. 없으면 반경을 넓히거나
            필터를 바꿔보세요.
          </span>
        </Txt>
      </Step>

      <Step>
        <Num>5</Num>
        <Txt>
          <strong>상세 보기</strong>
          <span>
            목록 아이템을 누르면 팝업으로 상세 지도가 열립니다. 지도를 클릭하면
            <b> 카카오맵 상세 페이지</b>가 새 창으로 열려요.
          </span>
        </Txt>
      </Step>

      <Tips>
        <li>지도를 클릭하면 <b>검색 기준점</b>이 변경됩니다.</li>
        <li>가게명이 길면 말줄임 처리됩니다. 상세는 팝업에서 확인하세요.</li>
      </Tips>
    </Wrap>
  );
}

/* styled-components */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.95rem;
  color: #333;
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  align-items: start;
`;

const Num = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #ffa853;
  color: #111;
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 0.95rem;
`;

const Txt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong { font-weight: 800; }
  span { line-height: 1.45; color: #444; }
  em { font-style: normal; color: #666; }
`;

const Code = styled.code`
  background: #fff6ed;
  border: 1px solid #ffe2c6;
  padding: 2px 6px;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
`;

const Tips = styled.ul`
  margin-top: 4px;
  padding: 10px 12px;
  background: #f8fafc;
  border: 1px solid #e8edf3;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #4b5563;
  display: flex;
  flex-direction: column;
  gap: 6px;

  li { list-style: "💡 "; margin-left: 12px; }
`;