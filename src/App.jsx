// App.jsx
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import NotFound from "./pages/NotFound";
import HowTo from "./pages/HowTo";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import useScrollToTop from "./hook/useScrollToTop";

function Layout() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "60vh" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAOMAP_API_KEY, // 반드시 VITE_ 접두사
    libraries: ["services"],                    // ← Places 필수
  });

  // 페이지 전환 시 최상단 스크롤
  useScrollToTop();

  if (error) return <div>카카오 지도 로드 오류: {String(error)}</div>;
  if (loading) return <div>지도를 준비 중…</div>;
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/how-to" element={<HowTo />} />
          {/* 
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
