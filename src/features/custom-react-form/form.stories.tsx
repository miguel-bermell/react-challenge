import type { Meta, StoryObj } from '@storybook/react-vite';

import { CustomReactForm } from './form';

const meta: Meta<typeof CustomReactForm> = {
  title: 'Components/CustomReactForm',
  component: CustomReactForm,
};

export default meta;

type Story = StoryObj<typeof CustomReactForm>;

export const Default: Story = {
  args: {
    hostRef: document.createElement('div'),
  },
  render: (args) => (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <CustomReactForm {...args} />
    </div>
  ),
};
