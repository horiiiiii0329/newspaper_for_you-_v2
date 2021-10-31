import React from "react";

import NewsListItem from "./NewsListItem";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/NewsListItem",
  component: NewsListItem,
};

const Template = () => <NewsListItem />;

export const Default = Template.bind({});
