import styles from "./styles/_App.module.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication, { action as AuthAction } from "./pages/Authentication";
import Root from "./pages/Root";
import ForgetPassword, {
  action as ForgetPasswordAction,
} from "./pages/ForgetPassword";
import Code, { action as CodeAction } from "./pages/Code";
import ResetPassword, { action as ResetAction } from "./pages/ResetPassword";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import HousePage, { loader as HouseLoader } from "./pages/HousePage";
import NewUser from "./pages/NewUser";
import AddBuilding from "./pages/AddBuilding";
import Review, { loader as ReviewsLoader } from "./pages/Review";
import Contract, { action as ContractAction } from "./pages/Contract";
import UserPermits from "./pages/userPermits";
import Contracts, { loader as ContractLoader } from "./pages/Contracts";
import EditContract, {
  loader as EditLoader,
  action as EditAction,
} from "./pages/EditContract";
import EditBuilding, {
  loader as EditBuildingLoader,
} from "./pages/EditBuilding";
import Profile, {
  loader as ProfileLoader,
  action as ProfileAction,
} from "./pages/Profile";
import Messages, {
  loader as MessagesLoader,
  action as MessagesAction,
} from "./pages/Messages";
import Notifications, {
  loader as NotificationsLoader,
} from "./pages/Notifications";
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
    path: "ForgetPassword",
    element: <ForgetPassword />,
    action: ForgetPasswordAction,
  },
  {
    path: "CheckCode",
    element: <Code />,
    action: CodeAction,
  },
  {
    path: "ResetPassword",
    element: <ResetPassword />,
    action: ResetAction,
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
      { path: "NewUser", element: <NewUser /> },
      { path: "UserPermits", element: <UserPermits /> },
      { path: "Contracts", element: <Contracts />, loader: ContractLoader },
      {
        path: "EditContract/:contractId",
        element: <EditContract />,
        loader: EditLoader,
        action: EditAction,
      },
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
        path: "EditBuilding",
        element: <EditBuilding />,
        loader: EditBuildingLoader,
      },
      {
        path: "Contract",
        element: <Contract />,
        action: ContractAction,
      },
      {
        path: "Notifications",
        element: <Notifications />,
        loader: NotificationsLoader,
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
    const storedUserData = sessionStorage.getItem("userData");
    const storedLang = sessionStorage.getItem("lang");
    if (storedLang) {
      i18n.changeLanguage(sessionStorage.getItem("lang"));
    }
    if (storedUserData && storedUserData !== undefined) {
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
