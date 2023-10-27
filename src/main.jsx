import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss";
import { UserContextProvider } from "./store/user-context.jsx";
import { BuildingContextProvider } from "./store/building-context.jsx";
import { AsideContextProvider } from "./store/aside-context.jsx";
import { FullScreenContextProvider } from "./store/fullScreen-context.jsx";
import { ModeContextProvider } from "./store/mode-context.jsx";
import global_en from "../src/translations/en/global.json";
import global_ar from "../src/translations/ar/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: true },
  lng: "ar",
  resources: {
    en: { global: global_en },
    ar: { global: global_ar },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18next}>
    <ModeContextProvider>
      <FullScreenContextProvider>
        <AsideContextProvider>
          <UserContextProvider>
            <BuildingContextProvider>
              <App />
            </BuildingContextProvider>
          </UserContextProvider>
        </AsideContextProvider>
      </FullScreenContextProvider>
    </ModeContextProvider>
  </I18nextProvider>
);
