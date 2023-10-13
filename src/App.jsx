import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication, { action as AuthAction } from "./pages/Authentication";
import Root from "./pages/Root";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import NewUser, { action as NewUserAction } from "./pages/NewUser";
import AddBuilding, { action as AddBuildingAction } from "./pages/AddBuilding";
import Review from "./pages/Review";
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
        action: AddBuildingAction,
      },
      { path: "Review", element: <Review /> },
      { path: "Contract", element: <Contract />, action: ContractAction },
    ],
  },
]);
function App() {
  const context = useContext(UserContext);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
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

  return <RouterProvider router={router} />;
}

export default App;
