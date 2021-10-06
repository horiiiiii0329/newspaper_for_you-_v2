import React from "react";

import SectionHeader from "./SectionHeader";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/SectionHeader",
  component: SectionHeader,
};

const Template = () => <SectionHeader number="01" title="個人" />;

export const Default = Template.bind({});
