import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import { useContext, useEffect } from "react";
import BuildingContext from "../../store/building-context";
//import AsideContext from "../../store/aside-context";

const AddBuildingForm = (props) => {
  const context = useContext(BuildingContext);
  const houseId = sessionStorage.getItem("houseId");
  //const asideContext = useContext(AsideContext);
  useEffect(() => {
    context.setPage(0);
  }, []);
  return (
    <>
      {context.page === 0 && (
        <FirstPage
          state={props.state}
          firstPageData={props.state === "edit" && props.firstPageData}
        />
      )}
      {context.page === 1 && (
        <SecondPage
          state={props.state}
          secondPageData={props.state === "edit" && props.secondPageData}
        />
      )}
      {context.page === 2 && (
        <ThirdPage
          state={props.state}
          url={
            props.state === "add"
              ? "https://zadapp.mqawilk.com/api/houses/store"
              : "https://zadapp.mqawilk.com/api/update/selfhoues/" + houseId
          }
        />
      )}
    </>
  );
};

export default AddBuildingForm;
