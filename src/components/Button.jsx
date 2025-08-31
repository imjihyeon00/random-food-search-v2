import React from "react";
import styled from "styled-components";
import { BUTTON_SIZES_TYPE } from "../constants/styled";

const BUTTON_SIZE = {
  [BUTTON_SIZES_TYPE.sm]: {
    PADDING: "5px 32px",
    PADDING_MOBILE: "5px 18px",
    FONT_SIZE: "0.875rem",
  },
  [BUTTON_SIZES_TYPE.lg]: {
    PADDING: "15px 80px",
    PADDING_MOBILE: "15px 80px",
    FONT_SIZE: "1rem",
  },
};

export default function Button({
  text="",
  type="button",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  size = BUTTON_SIZES_TYPE.sm, // 기본값은 SMALL
  active=false
}) {
  return (
    <ButtonStyle
      type={type}
      className={`custom-button ${className} ${active?"active":""}`}
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
  width: ${({ $fullWidth }) => $fullWidth ? "100%" : "auto"};
  background-color: #fff;
  padding: ${({ $size }) => $size.PADDING || BUTTON_SIZE[BUTTON_SIZES_TYPE.sm].PADDING};
  border: 1px solid #ddd;
  border-radius: 99px;
  font-size: ${({ $size }) => $size.FONT_SIZE || BUTTON_SIZE[BUTTON_SIZES_TYPE.sm].FONT_SIZE};
  word-break: keep-all;
  color: #333;

  &:hover {
    background-color: #FFBC79;
    border-color: #FFBC79;
  }
  
  &.active {
    background-color: #FFA853;
    border-color: #FFA853;
  }

  &:disabled {
    background-color: #e0e0e0;
    border-color: #c3c3c3ff;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    /* 모바일 전용 스타일 */
    padding: ${({ $size }) => $size.PADDING_MOBILE || BUTTON_SIZE[BUTTON_SIZES_TYPE.sm].PADDING_MOBILE};
  }
`;