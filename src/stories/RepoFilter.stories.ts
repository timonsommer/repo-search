import type { Meta, StoryObj } from "@storybook/react";

import RepoFilter from "../components/RepoFilter";

const meta = {
  title: "RepoSearch/RepoFilter",
  component: RepoFilter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RepoFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userQuery: "c9s",
  },
};
