import Icon from './icon'

export default {
    title: 'Icon',
    component: Icon,
    argTypes: {
        name: {
            description: 'Name of the svg',
            control: {
                type: 'select',
                options: ['arrow-up', 'arrow-down', 'search', 'verified', 'share', 'heart'],
            },
        },
        fill: {
            description: 'Color of svg',
        }
    }
}

const Template = args => <Icon {...args} ></Icon>

export const Basic = Template.bind({})
Basic.args = {
    name: 'search',
    fill: '',
}