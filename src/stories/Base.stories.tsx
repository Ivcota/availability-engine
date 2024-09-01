import type { Meta, StoryObj } from "@storybook/react";
import DashboardPage from "~/app/dashboard/page";

const meta = {
  title: "App/Page",
  component: DashboardPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _DashboardPage: Story = {
  args: {},
  render: (args) => <DashboardPage {...args} />,
};
