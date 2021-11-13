import React, { useState } from "react";
import { ReactNode } from "react";
import { supabase } from "../api";

const AppWrapper = React.createContext({
  selectedContent: "",
  posts: [] as any,
  selectedTitle: "",
  setSelectedTitle: (title: string) => {},
  fetchSelectedTitle: (title: string) => {},
  setActiveContent: (content: string) => {},
  fetchPosts: () => {},
});

export const AppWrapperProvider = ({ children }: { children: ReactNode }) => {
  const [activeContent, setActiveContent] = useState("Homepage");
  const [selectedTitle, setSelectedTitle] = useState("全て");
  const [posts, setPosts] = useState<string[] | null>([]);

  const titleSelectHandler = (title: string) => {
    setSelectedTitle(title);
  };

  const contentHandler = (content: string) => {
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
    fetchPosts,
  };

  return (
    <AppWrapper.Provider value={contextValue}>{children}</AppWrapper.Provider>
  );
};

export default AppWrapper;
