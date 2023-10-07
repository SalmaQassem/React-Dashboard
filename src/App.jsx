import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Authentication from "./pages/Authentication";
import Root from "./pages/Root";

const router = createBrowserRouter([
  /*{
    path: "/",
    element: <Authentication />,
  },*/
  { path: "/", element: <Root /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
