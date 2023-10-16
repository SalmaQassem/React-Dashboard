import styles from "./styles/_App.module.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication, { action as AuthAction } from "./pages/Authentication";
import Root from "./pages/Root";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import HousePage, { loader as HouseLoader } from "./pages/HousePage";
import NewUser, { action as NewUserAction } from "./pages/NewUser";
import AddBuilding from "./pages/AddBuilding";
import Review, { loader as ReviewsLoader } from "./pages/Review";
import Contract, { action as ContractAction } from "./pages/Contract";
import UserPermits from "./pages/userPermits";
import Profile, {
  loader as ProfileLoader,
  action as ProfileAction,
} from "./pages/Profle";
import Messages, {
  loader as MessagesLoader,
  action as MessagesAction,
} from "./pages/Messages";
import { useEffect, useContext } from "react";
import UserContext from "./store/user-context";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    action: AuthAction,
  },
  {
    path: "dashboard",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      { path: "Houses/:imageId", element: <HousePage />, loader: HouseLoader },
      {
        path: "Messages",
        element: <Messages />,
        loader: MessagesLoader,
        action: MessagesAction,
      },
      { path: "NewUser", element: <NewUser />, action: NewUserAction },
      { path: "UserPermits", element: <UserPermits /> },
      {
        path: "Profile",
        element: <Profile />,
        loader: ProfileLoader,
        action: ProfileAction,
      },
      {
        path: "AddBuilding",
        element: <AddBuilding />,
      },
      { path: "Review", element: <Review />, loader: ReviewsLoader },
      {
        path: "Contract",
        element: <Contract />,
        action: ContractAction,
      },
    ],
  },
]);
function App() {
  const [t, i18n] = useTranslation("global");
  const context = useContext(UserContext);
  const [classState, setClass] = useState("rtl");
  useEffect(() => {
    if (i18n.language === "en") {
      setClass("ltr");
    } else {
      setClass("rtl");
    }
  }, [i18n.language]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedLang = sessionStorage.getItem("lang");
    if (storedLang) {
      i18n.changeLanguage(sessionStorage.getItem("lang"));
    }
    if (storedUserData) {
      const {
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at,
      } = JSON.parse(storedUserData);
      context.setUserData(
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at
      );
    } else {
      //console.log("empty");
    }
  }, []);

  return (
    <div className={classState === "rtl" ? styles.rtl : styles.ltr}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
