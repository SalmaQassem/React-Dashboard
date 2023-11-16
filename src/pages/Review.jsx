import House from "../components/Dashboard/House";
import { useLoaderData } from "react-router-dom";
import { useEffect, useContext } from "react";
import { getAuthToken } from "../util/auth";
import BuildingContext from "../store/building-context";

const Review = () => {
  const loaderData = useLoaderData();
  const context = useContext(BuildingContext);

  useEffect(() => {
    if (context) context.setPage(0);
  }, [context]);

  return <House data={loaderData} mode="showHouse" />;
};

export default Review;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const id = sessionStorage.getItem("houseId");
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
