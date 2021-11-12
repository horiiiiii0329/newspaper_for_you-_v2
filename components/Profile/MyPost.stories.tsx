import React from "react";

import MyPost from "./MyPost";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/MyPost",
  component: MyPost,
};

const Template = () => <MyPost />;

export const Default = Template.bind({});
