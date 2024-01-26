import { Button, ButtonPrimary, ButtonSecondary, ButtonPrimaryOutline, ButtonGradientPrimary, ButtonBid, ButtonTransparent } from './button'

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        size: {
            description: 'Size defines width of btn',
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },
        },
        blockBtn: {
            defaultValue: false,
            description: 'Btn with full width',
            table: {
                defaultValue: { summary: false }
            },
            control: {
                type: 'select',
                options: [true, false],
            },
        },
        fs: {
            description: 'Font size in rem',
        },
        marginBottom: {
            description: 'Margin bottom in rem',
        }
    }
}

const Template = args => <Button {...args} >Button text</Button>

export const Basic = Template.bind({})
Basic.args = {
    size: "md",
    fs: 1.8,
    blockBtn: false,
    marginBottom: 1,
}

export const Primary = () => <ButtonPrimary fs="1.5" size="md" >Button text</ButtonPrimary> 

export const Secondary = () => <ButtonSecondary fs="1.8" size="lg" >Button text</ButtonSecondary>

export const PrimaryOutline = () => <ButtonPrimaryOutline size="sm" marginBottom="2">Button text</ButtonPrimaryOutline>

export const GradientPrimary = () => <ButtonGradientPrimary size="md" marginBottom="2">Button text</ButtonGradientPrimary>

export const Bid = () => <ButtonBid fs="2" size="lg" marginBottom="2">Button text</ButtonBid>

export const Transparent = () => <ButtonTransparent fs="1.5" size="sm" >Button text</ButtonTransparent>

export const Block = () => <ButtonTransparent blockBtn fs="2" size="md" marginBottom="3">Button text</ButtonTransparent>