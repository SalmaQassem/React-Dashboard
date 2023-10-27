import React from "react";
import { useState } from "react";

const ModeContext = React.createContext({
  mode: "light",
  setMode: () => {},
});

export const ModeContextProvider = (props) => {
  const [modeState, setModeState] = useState("light");

  const setModeHandler = () => {
    setModeState((prevState) => {
      if (prevState === "light") return "dark";
      else return "light";
    });
  };
  return (
    <ModeContext.Provider
      value={{
        mode: modeState,
        setMode: setModeHandler,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
