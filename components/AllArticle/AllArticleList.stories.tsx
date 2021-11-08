import React from "react";

import AllArticleList from "./AllArticleList";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/AllArticleList",
  component: AllArticleList,
};

const Template = () => (
  <AllArticleList
    title="京王線でジョーカー男"
    time="18：26"
    company="琉球新聞"
    link="/"
  />
);

export const Default = Template.bind({});
