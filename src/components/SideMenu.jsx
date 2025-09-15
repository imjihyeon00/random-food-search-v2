import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MENU_ITEMS = [
  { name: "홈", path: "/" },
  { name: "이용방법", path: "/how-to" },
  { name: "블로그 / 소식(준비중)", path: null },
];  

const SUB_MENU_ITEMS = [
  { name: "개인정보처리방침", path: "/privacy" },
  { name: "이용약관", path: "/terms" },
];

export default function SideMenu({
  open = false,
  onClose,
}) {

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

  return createPortal(
    <Backdrop>
      <SideMenuArea>
        <Header>
          <Title>MENU</Title>
          <CloseButton
            type="button"
            aria-label="닫기"
            onClick={onClose}
          >
            ✕
          </CloseButton>
        </Header>
        <MenuList>
          {
            MENU_ITEMS.map((item) => (
              <MenuItem key={item.name}>
                {item.path ? (
                  <MenuItemLink
                    to={item.path}
                    onClick={onClose}
                  >
                    {item.name}
                  </MenuItemLink>
                ) : (
                  <MenuItemLink as="span">{item.name}</MenuItemLink>
                )}
              </MenuItem>
            ))
          }
        </MenuList>
        <DivisionLine />
        <SubMenuList>
          {
            SUB_MENU_ITEMS.map((item) => (
              <MenuItem key={item.name}>
                <SubItemLink
                  to={item.path}
                  onClick={onClose}
                >
                  {item.name}
                </SubItemLink>
              </MenuItem>
            ))
          }
        </SubMenuList>
      </SideMenuArea>
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

const SideMenuArea = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 30px;
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

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const MenuItem = styled.li`
`;
const MenuItemLink = styled(Link)`
  display: inline-block;
  color: #333;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
`;
const SubMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SubItemLink = styled(Link)`
  display: inline-block;
  color: #333;
  text-decoration: none;
  font-size: 0.75rem;
`;
const DivisionLine = styled.hr`
  border: none;
  border-top: 1px solid #333;
  margin: 0;
  padding: 0;
  max-width: 100px;
`;