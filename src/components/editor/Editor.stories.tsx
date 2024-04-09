import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";
import { mockPage } from "@root/src/lib/mock";
import styles from "@root/src/styles/Index.module.scss";
import classNames from "classnames";

const meta = {
  title: "Editor/Editor",
  component: Editor,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    page: mockPage,
  },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditorStory: Story = {
  render: (args) => (
    <div className={classNames(styles.editorContainer, styles.editorTime)}>
      <Editor {...args} />
    </div>
  ),
};
