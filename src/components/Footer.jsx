import { styled } from "styled-components";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <FooterStyle>
      <FooterBox>
        <FooterText className="copyright">© 2025 오늘 뭐 먹지? All rights reserved.</FooterText>
        {/* <PolicyLinks>
          <Link to="/">[개인정보 처리방침]</Link>
          <Link to="/">[이용약관]</Link>
          <Link to="/">[쿠키 정책]</Link>
        </PolicyLinks>
        <FooterText>이 사이트는 광고를 포함하고 있으며, 일부 서비스는 위치 정보를 기반으로 동작합니다.</FooterText> */}
      </FooterBox>
    </FooterStyle>
  );
}


const FooterStyle = styled.footer`
  border-top: 1px solid #ccc;
  padding: 10px 14px 40px;
`;

const FooterBox = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #333;
  margin: 0.5rem 0;

  &.copyright {
    font-weight: 700;
  }
`;

const PolicyLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  a {
    font-size: 0.875rem;
    font-weight: 700;
  }
`;
