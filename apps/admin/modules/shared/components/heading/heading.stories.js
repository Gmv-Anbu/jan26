import { MainHeading, CustomHeading } from './heading'

export default {
    title: 'Heading',
    component: MainHeading,
}

export const Main = () => <MainHeading>Main Heading</MainHeading>

export const Custom = () => <CustomHeading size="10rem" lh="12rem" fw="700" marginBottom="3.5">Custom Heading</CustomHeading>