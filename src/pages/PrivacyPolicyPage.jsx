// src/pages/legal/PrivacyPolicyPage.jsx
import React from "react";
import {
  LegalLayout, LegalTitle, UpdatedAt,
  LegalSection, SectionTitle, SectionBody,
  BulletList, BulletItem
} from "../styles/CommonLegalStyles";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout>
      <LegalTitle>개인정보처리방침</LegalTitle>
      <UpdatedAt>최종 업데이트: 2025-08-31</UpdatedAt>

      <Section intro />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
    </LegalLayout>
  );
}

/* 섹션 분리(가독성/유지보수 용이) */
function Section() {
  return (
    <LegalSection>
      <SectionBody>
        본 개인정보처리방침은 <b>오늘 뭐 먹지?</b>(이하 “서비스”)에서 제공하는 기능과 관련하여,
        이용자의 개인정보 처리에 관한 내용을 안내합니다.
      </SectionBody>
    </LegalSection>
  );
}

function Section1() {
  return (
    <LegalSection>
      <SectionTitle>1. 수집하는 개인정보 항목</SectionTitle>
      <BulletList>
        <BulletItem>서비스는 회원가입 절차가 없으며, 별도의 개인정보를 저장하지 않습니다.</BulletItem>
        <BulletItem>
          단, <b>문의하기 기능</b> 이용 시 아래 항목이 수집될 수 있습니다.
          <BulletList>
            <BulletItem>작성자 이메일(필수)</BulletItem>
            <BulletItem>작성자 이름(선택)</BulletItem>
            <BulletItem>문의 내용(필수)</BulletItem>
          </BulletList>
        </BulletItem>
        <BulletItem>
          서비스 개선을 위해 브라우저 환경 정보(User Agent), 접속 시간 등이 함께 수집될 수 있습니다.
        </BulletItem>
      </BulletList>
    </LegalSection>
  );
}

function Section2() {
  return (
    <LegalSection>
      <SectionTitle>2. 개인정보의 수집 및 이용 목적</SectionTitle>
      <BulletList>
        <BulletItem>문의사항에 대한 회신</BulletItem>
        <BulletItem>서비스 개선 및 오류 대응</BulletItem>
      </BulletList>
    </LegalSection>
  );
}

function Section3() {
  return (
    <LegalSection>
      <SectionTitle>3. 개인정보의 보관 및 파기</SectionTitle>
      <BulletList>
        <BulletItem>수집된 개인정보는 문의사항 처리 후 지체 없이 삭제합니다.</BulletItem>
        <BulletItem>법령에 따라 보관이 필요한 경우 해당 기간을 초과하여 보관하지 않습니다.</BulletItem>
      </BulletList>
    </LegalSection>
  );
}

function Section4() {
  return (
    <LegalSection>
      <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
      <SectionBody>본 서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</SectionBody>
    </LegalSection>
  );
}

function Section5() {
  return (
    <LegalSection>
      <SectionTitle>5. 개인정보 처리 위탁</SectionTitle>
      <SectionBody>본 서비스는 이용자의 개인정보를 외부에 위탁하지 않습니다.</SectionBody>
    </LegalSection>
  );
}

function Section6() {
  return (
    <LegalSection>
      <SectionTitle>6. 위치정보 처리</SectionTitle>
      <SectionBody>
        본 서비스는 카카오맵 API를 활용하여 사용자의 <b>현재 위치 기반 음식점 검색</b> 기능을 제공합니다.
        위치 정보는 검색 기준으로만 사용되며, 서버에 저장되지 않습니다.
      </SectionBody>
    </LegalSection>
  );
}

function Section7() {
  return (
    <LegalSection>
      <SectionTitle>7. 이용자의 권리</SectionTitle>
      <SectionBody>
        이용자는 개인정보 제공을 거부할 권리가 있으며, 필수 항목(이메일, 문의 내용) 미제공 시 문의 접수가 제한될 수 있습니다.
      </SectionBody>
    </LegalSection>
  );
}

function Section8() {
  return (
    <LegalSection>
      <SectionTitle>8. 문의</SectionTitle>
      <SectionBody>개인정보 처리 관련 문의는 서비스 내 “문의하기” 기능을 통해 연락하실 수 있습니다.</SectionBody>
    </LegalSection>
  );
}
