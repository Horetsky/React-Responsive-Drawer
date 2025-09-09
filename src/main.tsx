import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { QuerySelectorProvider } from "./providers";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QuerySelectorProvider>
            <App />
        </QuerySelectorProvider>
    </StrictMode>,
);