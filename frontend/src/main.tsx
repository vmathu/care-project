import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "libs/ui/theme";
import { ReduxProvider } from "libs/redux/provider.tsx";
import SuspenseLoading from "libs/ui/components/SuspenseLoading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<SuspenseLoading />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
