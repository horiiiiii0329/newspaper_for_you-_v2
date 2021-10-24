import React, { useState, useEffect } from "react";
import { supabase } from "../api";

const AppWrapper = React.createContext({
  activeHomepage: null,
  activeContent1: null,
  activeContent2: null,
  activeContent3: null,
  activeContent4: null,
  posts: [],
  selectedTitle: "",
  setSelectedTitle: () => {},
  fetchSelectedTitle: () => {},
  setActiveContentOneHandler: () => {},
  setActiveContentTwoHandler: () => {},
  setActiveContentThreeHandler: () => {},
  setActiveContentFourHandler: () => {},
  setActiveHomePageHandler: () => {},
});

export const AppWrapperProvider = (props) => {
  const [activeContentOne, setActiveContentOne] = useState(false);
  const [activeContentTwo, setActiveContentTwo] = useState(false);
  const [activeContentThree, setActiveContentThree] = useState(false);
  const [activeContentFour, setActiveContentFour] = useState(false);
  const [activeHomepage, setActiveHomePage] = useState(true);

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

  const setActiveHomePageHandler = () => {
    setActiveHomePage(true);
    setActiveContentOne(false);
    setActiveContentTwo(false);
    setActiveContentThree(false);
    setActiveContentFour(false);
  };

  const setActiveContentOneHandler = () => {
    setActiveHomePage(false);
    setActiveContentOne(true);
    setActiveContentTwo(false);
    setActiveContentThree(false);
    setActiveContentFour(false);
  };

  const setActiveContentTwoHandler = () => {
    setActiveHomePage(false);
    setActiveContentOne(false);
    setActiveContentTwo(true);
    setActiveContentThree(false);
    setActiveContentFour(false);
  };

  const setActiveContentThreeHandler = () => {
    setActiveHomePage(false);
    setActiveContentOne(false);
    setActiveContentTwo(false);
    setActiveContentThree(true);
    setActiveContentFour(false);
  };

  const setActiveContentFourHandler = () => {
    setActiveHomePage(false);
    setActiveContentOne(false);
    setActiveContentTwo(false);
    setActiveContentThree(false);
    setActiveContentFour(true);
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
    activeHomepage: activeHomepage,
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
    setActiveHomePageHandler,
  };

  return (
    <AppWrapper.Provider value={contextValue}>
      {props.children}
    </AppWrapper.Provider>
  );
};

export default AppWrapper;
