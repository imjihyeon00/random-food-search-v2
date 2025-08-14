import React from "react";
import styled from "styled-components";
import { BUTTON_SIZES_TYPE } from "../constants/styled";

const BUTTON_SIZE = {
  [BUTTON_SIZES_TYPE.sm]: {
    PADDING: "5px 32px",
    PADDING_MOBILE: "5px 18px",
  },
  [BUTTON_SIZES_TYPE.lg]: {
    PADDING: "15px 80px",
    PADDING_MOBILE: "15px 80px",
  },
};

export default function Button({
  text="",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  size = BUTTON_SIZES_TYPE.sm, // 기본값은 SMALL
}) {
  return (
    <ButtonStyle
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      $fullWidth={fullWidth}
      $size={BUTTON_SIZE[size]}
    >
      {text}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  width: 100%;
  background-color: #fff;
  padding: ${({ $size }) => $size.PADDING || BUTTON_SIZE[BUTTON_SIZES_TYPE.sm].PADDING};
  border: 1px solid #ddd;
  border-radius: 99px;
  font-size: 1rem;
  word-break: keep-all;

  &:hover {
    background-color: #FFBC79;
    border-color: #FFBC79;
  }
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  
  &.active {
    background-color: #FFA853;
    border-color: #FFA853;
  }

  @media (max-width: 768px) {
    /* 모바일 전용 스타일 */
    padding: ${({ $size }) => $size.PADDING_MOBILE || BUTTON_SIZE[BUTTON_SIZES_TYPE.sm].PADDING_MOBILE};
  }
`;