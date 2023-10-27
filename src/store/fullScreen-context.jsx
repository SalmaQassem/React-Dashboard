import React from "react";
import { useFullScreenHandle } from "react-full-screen";

const FullScreenContext = React.createContext({
  handle: null,
});

export const FullScreenContextProvider = (props) => {
  return (
    <FullScreenContext.Provider
      value={{
        handle: useFullScreenHandle(),
      }}
    >
      {props.children}
    </FullScreenContext.Provider>
  );
};

export default FullScreenContext;
