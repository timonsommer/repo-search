import type { Meta, StoryObj } from '@storybook/react';

import RepoFilter from '../components/RepoFilter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'RepoSearch/RepoFilter',
  component: RepoFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    userQuery: { control: 'text' },
  },
} satisfies Meta<typeof RepoFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userQuery: "timonso",
  },
};
