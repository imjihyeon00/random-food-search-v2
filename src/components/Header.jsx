import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import Modal from "./modal/Modal";
import { useState } from "react";
import HowToModalChild from "./modal/HowToModalChild";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "./SideMenu";
import { MOBILE_BREAKPOINT } from "../constants/styled";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const onClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <HeaderStyle>
      <LeftItems>
        <CloseButton
          type="button"
          aria-label="사이드메뉴"
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </CloseButton>
        <Link to="/">
          <HeaderText>오늘 뭐 먹지?<span>v2.0</span></HeaderText>
        </Link>
      </LeftItems>
      <SiteInfoBtn type="button" onClick={()=>{setIsModalOpen(true)}}>
        <FontAwesomeIcon icon={faCircleQuestion} />
        <span>이용방법</span>
      </SiteInfoBtn>
      <Modal
        open={isModalOpen}
        title="이용방법"
        onClose={()=>{setIsModalOpen(false)}}
      >
        <HowToModalChild/>
      </Modal>
      <SideMenu
        open={isSideMenuOpen}
        onClose={()=>{setIsSideMenuOpen(false)}}
      />
    </HeaderStyle>
  );
}

export default Header;

const HeaderStyle = styled.header`
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const HeaderText = styled.h1`
  font-size: 1.85rem;
  font-weight: bold;

  span {
    margin-left: 6px;
    font-size: 0.75em;
  }
`;

const SiteInfoBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.75rem;
  font-weight: normal;
  color: #333;

  span {
    font-size: 0.715em;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    span {
      display: none;
    }
  }
`;

const LeftItems = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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