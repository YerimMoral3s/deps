import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "styled-components";
import theme from "./assets/theme";

import GlobalStyles from "./assets/GlobalStyles";

import { Router } from "./routing";
import { LoadingBarContainer } from "react-top-loading-bar";
import { Toaster } from "react-hot-toast";
import theme_l from "./assets/theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoadingBarContainer props={{ color: theme_l.colors.accent }}>
          <Toaster position="top-right" reverseOrder={false} />
          <Router />
        </LoadingBarContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
