import React from "react";

import Post from "./Post";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Post",
  component: Post,
};

const Template = () => <Post />;

export const Default = Template.bind({});
