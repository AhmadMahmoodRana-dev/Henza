import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/Context.jsx";
import { MenuProvider } from "./Context/MenuContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
