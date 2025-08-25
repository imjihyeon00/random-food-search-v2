import styled from "styled-components";

export default function ImageMessage({src, text=""}) {
  return(
    <Box>
      <img src={src} alt="랜덤 음식점 찾기" />
      <p>{text}</p>
    </Box>
  )
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 70px 0;
  width: 100%;

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  p {
    text-align: center;
    font-size: 1rem;
    color: #666;
  }
`;

