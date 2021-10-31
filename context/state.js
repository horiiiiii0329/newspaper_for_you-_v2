import React, { useState, useEffect } from "react";
import { supabase } from "../api";

const AppWrapper = React.createContext({
  selectedContent: "",
  posts: [],
  selectedTitle: "",
  setSelectedTitle: () => {},
  fetchSelectedTitle: () => {},
  setActiveContent: () => {},
});

export const AppWrapperProvider = (props) => {
  const [activeContent, setActiveContent] = useState("Homepage");
  const [selectedTitle, setSelectedTitle] = useState("全て");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const titleSelectHandler = (title) => {
    setSelectedTitle(title);
  };

  const contentHandler = (content) => {
    setActiveContent(content);
  };

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .select("*")
      .match({ title: selectedTitle })
      .filter("user_id", "eq", user?.id);

    setPosts(data);
  }

  const contextValue = {
    selectedContent: activeContent,
    posts,
    selectedTitle: selectedTitle,
    setSelectedTitle: titleSelectHandler,
    fetchSelectedTitle: fetchPosts,
    setActiveContent: contentHandler,
  };

  console.log(activeContent);

  console.log(activeContent);

  return (
    <AppWrapper.Provider value={contextValue}>
      {props.children}
    </AppWrapper.Provider>
  );
};

export default AppWrapper;
