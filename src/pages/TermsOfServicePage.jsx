// src/pages/legal/TermsOfServicePage.jsx
import React from "react";
import {
  LegalLayout, LegalTitle, UpdatedAt,
  LegalSection, SectionTitle, SectionBody,
  BulletList, BulletItem
} from "../styles/CommonLegalStyles";

export default function TermsOfServicePage() {
  return (
    <LegalLayout>
      <LegalTitle>이용약관</LegalTitle>
      <UpdatedAt>최종 업데이트: 2025-08-31</UpdatedAt>

      <S0 />
      <S1 />
      <S2 />
      <S3 />
      <S4 />
      <S5 />
      <S6 />
      <S7 />
    </LegalLayout>
  );
}

function S0() {
  return (
    <LegalSection>
      <SectionBody>
        본 약관은 <b>오늘 뭐 먹지?</b>(이하 “서비스”)의 이용과 관련하여 필요한 사항을 규정합니다.
      </SectionBody>
    </LegalSection>
  );
}

function S1() {
  return (
    <LegalSection>
      <SectionTitle>제1조 (목적)</SectionTitle>
      <SectionBody>본 약관은 서비스 이용과 관련된 기본적인 사항을 규정함을 목적으로 합니다.</SectionBody>
    </LegalSection>
  );
}

function S2() {
  return (
    <LegalSection>
      <SectionTitle>제2조 (서비스의 제공)</SectionTitle>
      <BulletList>
        <BulletItem>서비스는 사용자의 현재 위치를 기반으로 주변 음식점을 검색하고, 무작위로 음식점을 추천합니다.</BulletItem>
        <BulletItem>서비스는 기본적으로 무료로 제공됩니다.</BulletItem>
      </BulletList>
    </LegalSection>
  );
}

function S3() {
  return (
    <LegalSection>
      <SectionTitle>제3조 (이용자의 의무)</SectionTitle>
      <BulletList>
        <BulletItem>이용자는 서비스를 법령 및 본 약관에 위반하여 사용하지 않습니다.</BulletItem>
        <BulletItem>타인의 권리를 침해하거나 불법적인 정보를 게시해서는 안 됩니다.</BulletItem>
      </BulletList>
    </LegalSection>
  );
}

function S4() {
  return (
    <LegalSection>
      <SectionTitle>제4조 (책임의 한계)</SectionTitle>
      <BulletList>
        <BulletItem>음식점 정보는 카카오맵 API를 통해 제공되며, 정확성 및 최신성이 보장되지 않을 수 있습니다.</BulletItem>
        <BulletItem>추천 음식점 이용 과정에서 발생하는 문제에 대해 서비스는 책임을 지지 않습니다.</BulletItem>
      </BulletList>
    </LegalSection>
  );
}

function S5() {
  return (
    <LegalSection>
      <SectionTitle>제5조 (광고 노출)</SectionTitle>
      <SectionBody>
        서비스는 구글 애드센스 등 광고를 게재할 수 있으며, 이용자는 이에 동의합니다.
      </SectionBody>
    </LegalSection>
  );
}

function S6() {
  return (
    <LegalSection>
      <SectionTitle>제6조 (약관의 변경)</SectionTitle>
      <SectionBody>
        서비스는 필요 시 약관을 개정할 수 있으며, 변경된 약관은 서비스 화면에 공지합니다.
      </SectionBody>
    </LegalSection>
  );
}

function S7() {
  return (
    <LegalSection>
      <SectionTitle>제7조 (문의)</SectionTitle>
      <SectionBody>서비스와 관련된 문의는 “문의하기” 기능을 통해 가능합니다.</SectionBody>
    </LegalSection>
  );
}
