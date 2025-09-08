// src/components/Modal.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export default function Modal({
  open = false,
  title = "",
  onClose,
  children,
  closeOnBackdrop = true,
}) {
  const dialogRef = useRef(null);

  // ESC로 닫기 + 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onClose?.();
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()} // 컨텐츠 클릭 시 닫힘 방지
      >
        <Header>
          <Title id="modal-title">{title}</Title>
          <CloseButton
            type="button"
            aria-label="닫기"
            onClick={onClose}
          >
            ✕
          </CloseButton>
        </Header>

        <Body>{children}</Body>
      </Dialog>
    </Backdrop>,
    document.body
  );
}

/* 스타일 */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 16px; /* 모바일 여백 */
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,.18);
  overflow: hidden; /* 둥근 모서리 유지 */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  color: #333;

  &:hover { background: rgba(0,0,0,.06); }
  &:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(255,168,83,.45); }
`;

const Body = styled.div`
  padding: 16px;
  max-height: min(70vh, 640px);
  overflow: auto;
  color: #333;

  /* 긴 단어/한글 줄바꿈 안정화 */
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: keep-all;
`;
