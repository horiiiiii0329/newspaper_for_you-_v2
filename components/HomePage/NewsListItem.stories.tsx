import React from "react";
import ArticleItemCardStories from "../Article/ArticleItemCard.stories";

import NewsListItem from "./NewsListItem";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/NewsListItem",
  component: NewsListItem,
};

const Template = () => (
  <NewsListItem
    item={{
      title: "wwwwwwwww",
      href: "33333333333",
      company: "浅子新聞",
      time: "222222222222",
      id: "111111111",
    }}
  />
);

export const Default = Template.bind({});
