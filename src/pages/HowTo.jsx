import { useMemo } from "react";
import styled from "styled-components";

import { MOBILE_BREAKPOINT } from "../constants/styled";
import { HOWTO_STEPS } from "../constants/howToSteps";

export default function HowTo() {
  const steps = useMemo(() => HOWTO_STEPS,[]);

  return (
    <Page>
      <Header>
        <h1>이용 방법</h1>
        <p>
          “오늘 뭐 먹지?”는 현재 위치를 기준으로 근처 음식점을 찾아 랜덤으로 추천하는 서비스입니다.
          <br />
          아래 이용 방법을 참고하여 편리하게 이용해 보세요!
        </p>
      </Header>

      <TOC>
        <strong>바로가기</strong>
        <nav>
          {steps.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.title}</a>
          ))}
        </nav>
      </TOC>

      <Steps>
        {steps.map((s, idx) => (
          <Step key={s.id} id={s.id}>
            <StepIndex>{idx + 1}</StepIndex>
            <StepBody>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>

              {s.images?.length > 0 && (
                <ImageGrid>
                  {s.images.map((img, i) => (
                    <Thumb
                      key={i}
                      href={img.src}
                      target="_blank"
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" />
                      <span>클릭하여 크게 보기</span>
                    </Thumb>
                  ))}
                </ImageGrid>
              )}
            </StepBody>
          </Step>
        ))}
      </Steps>

    </Page>
  );
}

/* 스타일 */
/* 페이지 래퍼 */
const Page = styled.div`
  padding: 24px 16px 60px;
  max-width: 1000px;
  margin: 0 auto;
`;

/* 헤더 */
const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  h1 { 
    font-size: 1.6rem; 
    font-weight: 800; 
  }
  p { 
    line-height: 1.6; 
    font-size: 1rem;
  }
`;

/* 목차(TOC) */
const TOC = styled.aside`
  margin: 16px 0 32px;
  padding: 12px 14px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fffdfa;

  strong { 
    display:block; 
    margin-bottom: 8px; 
    color:#8a4b0f; 
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  a {
    font-size: .92rem;
    padding: 6px 10px;
    border-radius: 999px;
    background: #fff3e6;
    border: 1px solid #ffd8a8;
    color: #8a4b0f; 
    text-decoration: none;
  }
`;

/* 스텝 리스트 */
const Steps = styled.section`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

/* 단일 스텝: 번호 + 본문 (좌우 배치) */
const Step = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 10px;
  }
`;

/* 스텝 번호 */
const StepIndex = styled.div`
  flex: 0 0 auto;
  width: 48px; 
  height: 48px;
  border-radius: 12px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-weight: 800;
  background: #ffedd5; 
  border: 1px solid #fed7aa; 
  color: #8a4b0f;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 36px; 
    height: 36px; 
    font-size: .95rem;
  }
`;

/* 스텝 본문 */
const StepBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 { 
    font-size: 1.2rem; 
    font-weight: 800; 
    margin: 0; 
  }
  p { 
    line-height: 1.6; 
  }
`;

/* 이미지 썸네일 영역 (반응형 행 단위 래핑) */
const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

/* 썸네일 카드 */
const Thumb = styled.a`
  flex: 1 1 220px;        /* 최소 220px, 공간 되면 늘어남 */
  max-width: 100%;
  padding: 0; 
  border: 0; 
  background: transparent; 
  cursor: zoom-in;
  border-radius: 12px; 
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.05);

  img { 
    width: 100%; 
    height: auto; 
    display: block; 
  }
  span {
    display:block; 
    text-align:center; 
    font-size:.8rem; 
    color:#666; 
    padding:6px 0 2px;
    background: #fff;
  }

  &:hover { 
    box-shadow: 0 6px 16px rgba(0,0,0,.12); 
  }
`;
