import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <Header />
    </ThemeProvider>
  );
}

export default App;
