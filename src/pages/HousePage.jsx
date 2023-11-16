import House from "../components/Dashboard/House";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import { useEffect, useContext } from "react";
import BuildingContext from "../store/building-context";

const HousePage = () => {
  const loaderData = useLoaderData();
  const context = useContext(BuildingContext);

  useEffect(() => {
    if (context) context.setPage(0);
  }, [context]);

  return <House data={loaderData} mode="" />;
};

export default HousePage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const id = params.imageId;
  const token = getAuthToken();
  let response = "";
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/show/selfhoues/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
