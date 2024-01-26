import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MutiSelectFilterCheckbox  from './muti-select-filter-checkbox';

export default {
  title: 'Multi Select Filter',
  component: MutiSelectFilterCheckbox,
  argTypes: {
    onChange: { action: 'checked Value'}
  }
} as ComponentMeta<typeof MutiSelectFilterCheckbox>;

const Template: ComponentStory<typeof MutiSelectFilterCheckbox> = (args) => <MutiSelectFilterCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isToggle: true,
    name: 'Gender',
    filterData: [{ name: 'Male', id: 1}, { name: 'Female', id: 2}]
};
