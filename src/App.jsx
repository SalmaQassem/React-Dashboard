import styles from "./styles/_App.module.scss";
import { useState, useEffect, useContext, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContext from "./store/user-context";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
const Loading = lazy(() => import("./components/UI/Loading"));
const Error = lazy(() => import("./components/UI/Error"));
const Authentication = lazy(() => import("./pages/Authentication"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Code = lazy(() => import("./pages/Code"));
const Root = lazy(() => import("./pages/Root"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const HousePage = lazy(() => import("./pages/HousePage"));
const Messages = lazy(() => import("./pages/Messages"));
const Conversations = lazy(() => import("./pages/Conversations"));
const Chat = lazy(() => import("./pages/Chat"));
const NewUser = lazy(() => import("./pages/NewUser"));
const UserPermits = lazy(() => import("./pages/UserPermits"));
const Contracts = lazy(() => import("./pages/Contracts"));
const Reports = lazy(() => import("./pages/Reports"));
const AllSeasons = lazy(() => import("./pages/AllSeasons"));
const EditContract = lazy(() => import("./pages/EditContract"));
const Profile = lazy(() => import("./pages/Profile"));
const AddBuilding = lazy(() => import("./pages/AddBuilding"));
const EditBuilding = lazy(() => import("./pages/EditBuilding"));
const Contract = lazy(() => import("./pages/Contract"));
const Notifications = lazy(() => import("./pages/Notifications"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Authentication />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "ForgetPassword",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgetPassword />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "CheckCode",
    element: (
      <Suspense fallback={<Loading />}>
        <Code />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "ResetPassword",
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <Root />
      </Suspense>
    ),
    errorElement: <Error />,
    loader: () => import("./pages/Root").then((module) => module.loader()),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/Dashboard").then((module) => module.loader()),
      },
      {
        path: "Houses/:imageId",
        element: (
          <Suspense fallback={<Loading />}>
            <HousePage />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: ({ params }) =>
          import("./pages/HousePage").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Messages",
        element: (
          <Suspense fallback={<Loading />}>
            <Messages />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/Messages").then((module) => module.loader()),
      },
      {
        path: "Conversations",
        element: (
          <Suspense fallback={<p>loading...</p>}>
            <Conversations />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/Conversations").then((module) => module.loader()),
      },
      {
        path: "Chat/:mode/:userId",
        element: (
          <Suspense fallback={<p>loading...</p>}>
            <Chat />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: ({ params }) =>
          import("./pages/Chat").then((module) => module.loader({ params })),
      },
      {
        path: "NewUser",
        element: (
          <Suspense fallback={<Loading />}>
            <NewUser />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "UserPermits",
        element: (
          <Suspense fallback={<Loading />}>
            <UserPermits />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "Contracts",
        element: (
          <Suspense fallback={<Loading />}>
            <Contracts />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/Contracts").then((module) => module.loader()),
      },
      {
        path: "Reports",
        element: (
          <Suspense fallback={<Loading />}>
            <Reports />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "AllSeasons",
        element: (
          <Suspense fallback={<Loading />}>
            <AllSeasons />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/AllSeasons").then((module) => module.loader()),
      },
      {
        path: "EditContract/:contractId",
        element: (
          <Suspense fallback={<Loading />}>
            <EditContract />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: ({ params }) =>
          import("./pages/EditContract").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/Profile").then((module) => module.loader()),
      },
      {
        path: "AddBuilding",
        element: (
          <Suspense fallback={<Loading />}>
            <AddBuilding />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "EditBuilding/:buildingId",
        element: (
          <Suspense fallback={<Loading />}>
            <EditBuilding />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: ({ params }) =>
          import("./pages/EditBuilding").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Contract/:houseId",
        element: (
          <Suspense fallback={<Loading />}>
            <Contract />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: ({ params }) =>
          import("./pages/Contract").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Notifications",
        element: (
          <Suspense fallback={<Loading />}>
            <Notifications />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: () =>
          import("./pages/Notifications").then((module) => module.loader()),
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
    const storedUserData = Cookies.get("userData");
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
        password,
        image,
      } = JSON.parse(storedUserData);
      context.setUserData(
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at,
        password,
        image
      );
    }
  }, []);

  return (
    <div className={classState === "rtl" ? styles.rtl : styles.ltr}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
