import React from "react";

import Article from "./Article";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Article",
  component: Article,
};

const Template = () => <Article />;

export const Default = Template.bind({});
