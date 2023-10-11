import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication, { action as AuthAction } from "./pages/Authentication";
import Root from "./pages/Root";
import Dashboard from "./pages/dashboard";
import NewUser from "./pages/NewUser";
import AddBuilding from "./pages/AddBuilding";
import Review from "./pages/Review";
import Contract from "./pages/Contract";
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
      { index: true, element: <Dashboard /> },
      { path: "NewUser", element: <NewUser /> },
      { path: "AddBuilding", element: <AddBuilding /> },
      { path: "Review", element: <Review /> },
      { path: "Contract", element: <Contract /> },
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
