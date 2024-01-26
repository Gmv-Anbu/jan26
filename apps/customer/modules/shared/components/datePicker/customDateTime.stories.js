import CustomInputDatePicker from './customDateTime'

export default {
    title: 'DateTime Picker',
    component: CustomInputDatePicker,
}

const Template = args => <CustomInputDatePicker {...args} />

export const Basic = Template.bind({})
Basic.args = {
    label: `From`,
    timeLabel: 'Start With',
}