import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss";
import { UserContextProvider } from "./store/user-context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
