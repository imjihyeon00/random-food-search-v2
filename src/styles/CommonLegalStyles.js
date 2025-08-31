
// src/pages/legal/CommonLegalStyles.js (선택: 한 파일에 함께 정의해도 됩니다)
import styled from "styled-components";

export const LegalLayout = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 20px 80px;
  color: #222;
  line-height: 1.7;
`;

export const LegalTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 8px;
`;

export const UpdatedAt = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0 0 24px;
`;

export const LegalSection = styled.section`
  margin: 20px 0 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 8px;
`;

export const SectionBody = styled.p`
  margin: 0 0 8px;
  color: #333;
`;

export const BulletList = styled.ul`
  margin: 6px 0 8px 18px;
  padding: 0;
`;

export const BulletItem = styled.li`
  list-style: disc;
  margin: 4px 0;
  color: #333;
`;
