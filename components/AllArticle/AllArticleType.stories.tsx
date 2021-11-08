import React from "react";

import AllArticleType from "./AllArticleType";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/AllArticleType",
  component: AllArticleType,
};

const Template = () => <AllArticleType title="琉球新聞" index="1" />;

export const Default = Template.bind({});
