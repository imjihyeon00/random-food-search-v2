import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
