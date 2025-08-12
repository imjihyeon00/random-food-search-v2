// App.jsx
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

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
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
