import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  return (
    <HeaderStyle>
      <HeaderText>오늘 뭐 먹지?<span>v2.0</span></HeaderText>
      <SiteInfoBtn>
        <FontAwesomeIcon icon={faCircleQuestion} />
        <span>이용방법</span>
      </SiteInfoBtn>
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
  font-size: 2rem;
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
  font-size: 2rem;
  font-weight: normal;

  span {
    font-size: 0.625em;
  }
`;