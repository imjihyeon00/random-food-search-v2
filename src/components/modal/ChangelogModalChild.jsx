import React from "react";
import styled from "styled-components";
import { CHANGELOG } from "../../constants/changelog";
import Button from "../Button";
import { BUTTON_SIZES_TYPE } from "../../constants/styled";


/**
 * 이미 보유한 <Modal>의 children으로 꽂아 쓰는 내용물 컴포넌트
 * props:
 *  - onClose: 닫기
 *  - onDontShowAgain: 다시 보지 않기(현재 버전에 한해)
 */
export default function ChangelogModalChild({ onClose, onDontShowAgain }) {
  return (
    <Wrap>
      <Meta>
        <Info>
          <Title>업데이트</Title>
          <Badge>v{CHANGELOG.version}</Badge>
        </Info>
        <DateText>{CHANGELOG.date}</DateText>
      </Meta>

      <List>
        {CHANGELOG.notes.map((n, i) => (
          <Item key={i}>- {n}</Item>
        ))}
      </List>

      <Actions>
        <Button
          text="닫기"
          type="button"
          onClick={onClose}
          size={BUTTON_SIZES_TYPE.sm}
        />
        <Button
          text="다시 보지 않기"
          type="button"
          onClick={onDontShowAgain}
          size={BUTTON_SIZES_TYPE.sm}
          active={true}
        />
      </Actions>

      <Hint>버전이 업데이트되면 다시 안내가 표시됩니다.</Hint>
    </Wrap>
  );
}

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Meta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3px;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: row;
`;
const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  background: #fff3e6;
  color: #8a4b0f;
  font-weight: 700;
  font-size: 0.76rem;
  border: 1px solid #ffd8a8;
`;
const DateText = styled.span`
  color: #6b7280;
  font-size: 0.75rem;
`;
const List = styled.ul`
  margin: 6px 0 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Item = styled.li`
  list-style: none;
  color: #111;
  line-height: 1.4;
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;
const Hint = styled.div`
  color: #6b7280;
  font-size: 0.85rem;
`;
