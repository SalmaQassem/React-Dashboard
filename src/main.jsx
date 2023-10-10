import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss";
import { UserContextProvider } from "./store/user-context.jsx";
import { BuildingContextProvider } from "./store/building-context.jsx";
import { AsideContextProvider } from "./store/aside-context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AsideContextProvider>
    <UserContextProvider>
      <BuildingContextProvider>
        <App />
      </BuildingContextProvider>
    </UserContextProvider>
  </AsideContextProvider>
);
