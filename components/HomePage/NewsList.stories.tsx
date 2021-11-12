import React from "react";

import NewsList from "./NewsList";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/NewsList",
  component: NewsList,
};

const Template = () => <NewsList newsData />;

export const Default = Template.bind({});
