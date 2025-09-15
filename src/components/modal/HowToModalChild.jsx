import React, { useMemo } from "react";
import styled from "styled-components";
import { HOWTO_STEPS } from "../../constants/howToSteps";

export default function HowToModalChild() {
  const steps = useMemo(() => HOWTO_STEPS,[]);
  
  return (
    <Wrap>
      {steps.map((step, idx) => (
        <Step key={step.id}>
          <Num>{idx + 1}</Num>
          <Txt>
            <strong>{step.title}</strong>
            <span>{step.desc}</span>
          </Txt>
        </Step>
      ))}

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