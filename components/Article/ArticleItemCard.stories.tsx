import React from "react";

import ArticleItemCard from "./ArticleItemCard";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/ArticleItemCard",
  component: ArticleItemCard,
};

const newsList = {
  id: "124315",
  insertat: "82718937192",
  headline: "ぉぉぉっぉｌこ",
  link: "wewewewewewewewewe",
  title: "んくぇうｇｈｋｂふぇｆ",
};

const Template = () => (
  <ArticleItemCard item={newsList} key={1} onDeleteHandler={() => {}} />
);

export const Default = Template.bind({});
