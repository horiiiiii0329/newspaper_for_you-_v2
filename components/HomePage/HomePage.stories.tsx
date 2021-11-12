import React from "react";

import HomePage from "./HomePage";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/HomePage",
  component: HomePage,
};

const Template = () => (
  <HomePage
    user="true"
    weatherNews={[]}
    asahiData={[]}
    yomiuriData={[]}
    sankeiData={[]}
    mainichiData={[]}
    nikkeiData={[]}
  />
);

export const Default = Template.bind({});
