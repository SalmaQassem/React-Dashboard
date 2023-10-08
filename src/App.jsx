import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication, { action as AuthAction } from "./pages/Authentication";
import Root from "./pages/Root";
import Cookies from "js-cookie";
import { useEffect, useContext } from "react";
import UserContext from "./store/user-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    action: AuthAction,
  },
  { path: "dashboard", element: <Root /> },
]);
function App() {
  const context = useContext(UserContext);
  useEffect(() => {
    const storedUserData = Cookies.get("userData");
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
