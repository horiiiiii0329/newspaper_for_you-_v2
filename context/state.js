import React, { useState } from "react";

const AppWrapper = React.createContext({
  selectedTitle: "",
  setSelectedTitle: () => {},
});

export const AppWrapperProvider = (props) => {
  const [selectedTitle, setSelectedTitle] = useState("全て");

  const titleSelectHandler = (title) => {
    setSelectedTitle(title);
  };

  const contextValue = {
    selectedTitle: selectedTitle,
    setSelectedTitle: titleSelectHandler,
  };

  return (
    <AppWrapper.Provider value={contextValue}>
      {props.children}
    </AppWrapper.Provider>
  );
};

export default AppWrapper;
