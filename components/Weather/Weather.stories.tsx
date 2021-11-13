import React from "react";

import Weather from "./Weather";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Weather",
  component: Weather,
};

const Template = () => <Weather />;

export const Default = Template.bind({});
