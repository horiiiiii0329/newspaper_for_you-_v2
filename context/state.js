import React, { useState } from "react";

const AppWrapper = React.createContext({
  savedTitle: [],
  name: "",
  filterData: (token) => {},
  logout: () => {},
  setName: (name) => {},
});

export const AppWrapperProvider = (props) => {
  const contextValue = {
    savedTitle: [],
    filterData: (token) => {},
  };

  return (
    <AppWrapper.Provider value={contextValue}>
      {props.children}
    </AppWrapper.Provider>
  );
};

export default AuthContext;
