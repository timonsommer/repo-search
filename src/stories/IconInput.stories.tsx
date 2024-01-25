import type { Meta, StoryObj } from "@storybook/react";

import IconInput from "../components/IconInput";
import { Search } from "react-feather";

const meta = {
  title: "RepoSearch/IconInput",
  component: IconInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    
  }
} satisfies Meta<typeof IconInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftIcon: <Search/>,
    children: <input type="search"/>
  },
};
