import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import { useContext } from "react";
import BuildingContext from "../../store/building-context";
//import AsideContext from "../../store/aside-context";

const AddBuildingForm = () => {
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
