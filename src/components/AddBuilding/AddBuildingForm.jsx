import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import { useContext } from "react";
//import { useActionData } from "react-router-dom";
import BuildingContext from "../../store/building-context";
//import AsideContext from "../../store/aside-context";

const AddBuildingForm = () => {
  //const data = useActionData();
  const context = useContext(BuildingContext);
  //const asideContext = useContext(AsideContext);
  return (
    <>
      {context.page === 0 && <FirstPage />}
      {context.page === 1 && <SecondPage />}
      {context.page === 2 && <ThirdPage />}
    </>
  );
};
export default AddBuildingForm;
