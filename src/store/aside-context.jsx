import React, { useState } from "react";

const AsideContext = React.createContext({
  isOpened: false,
  setIsOpened: () => {},
});

export const AsideContextProvider = (props) => {
  const [isAsideOpened, setIsAsideOpened] = useState(false);

  const handleState = () => {
    setIsAsideOpened((prevState) => {
      return !prevState;
    });
  };

  return (
    <AsideContext.Provider
      value={{ isOpened: isAsideOpened, setIsOpened: handleState }}
    >
      {props.children}
    </AsideContext.Provider>
  );
};

export default AsideContext;
