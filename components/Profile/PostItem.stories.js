import React from "react";

import PostItem from "./PostItem";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/PostItem",
  component: PostItem,
};

const Template = () => <PostItem />;

export const Default = Template.bind({});
