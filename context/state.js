import React, { useState, useEffect } from "react";
import { supabase } from "../api";

const AppWrapper = React.createContext({
  posts: [],
  selectedTitle: "",
  setSelectedTitle: () => {},
  fetchSelectedTitle: () => {},
  setActiveContentOneHandler: () => {},
  setActiveContentTwoHandler: () => {},
  setActiveContentThreeHandler: () => {},
  setActiveContentFourHandler: () => {},
});

export const AppWrapperProvider = (props) => {
  const [activeContentOne, setActiveContentOne] = useState(false);
  const [activeContentTwo, setActiveContentTwo] = useState(false);
  const [activeContentThree, setActiveContentThree] = useState(false);
  const [activeContentFour, setActiveContentFour] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("全て");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("posts")
      .on("*", () => fetchPosts())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const titleSelectHandler = (title) => {
    setSelectedTitle(title);
  };

  const setActiveContentOneHandler = () => {
    setActiveContentOne(!activeContentOne);
  };

  const setActiveContentTwoHandler = () => {
    setActiveContentTwo(!activeContentTwo);
  };

  const setActiveContentThreeHandler = () => {
    setActiveContentThree(!activeContentThree);
  };

  const setActiveContentFourHandler = () => {
    setActiveContentFour(!activeContentFour);
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
    posts,
    activeContent1: activeContentOne,
    activeContent2: activeContentTwo,
    activeContent3: activeContentThree,
    activeContent4: activeContentFour,
    selectedTitle: selectedTitle,
    setSelectedTitle: titleSelectHandler,
    fetchSelectedTitle: fetchPosts,
    setActiveContentOneHandler,
    setActiveContentTwoHandler,
    setActiveContentThreeHandler,
    setActiveContentFourHandler,
  };

  return (
    <AppWrapper.Provider value={contextValue}>
      {props.children}
    </AppWrapper.Provider>
  );
};

export default AppWrapper;
