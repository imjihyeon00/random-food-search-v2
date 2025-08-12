import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import 'pretendard/dist/web/static/pretendard.css';  // npm 설치

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body, #root {
    height: 100%;
    font-family: 'Pretendard', 'Apple SD Gothic Neo', 'sans-serif';
    font-size: clamp(14px, 2.5vw, 16px);
    font-weight: 500;
    background: #fff;
    color: #333;
    letter-spacing: -0.03em;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, textarea {
    font-family: inherit;
    outline: none;
    border: none;
    background: none;
  }
  
  button {
    cursor: pointer;
  }
`;
