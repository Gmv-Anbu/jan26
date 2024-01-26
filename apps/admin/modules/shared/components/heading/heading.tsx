import styled, { css } from 'styled-components'

interface HeadingProps {
    size?: string;
    lh?: string;
    fw?: string;
    marginBottom?: string;
}

const MainHeading = styled.h1<HeadingProps>`
    // font-family: 'Roobert';
    text-transform: capitalize;
    margin: 0;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${props => props.size ? props.size : '8.6rem'};
    font-weight: ${props => props.fw ? props.fw : '700'};
    line-height: ${props => props.lh ? props.lh : '8.6rem'};
    ${props => props.marginBottom && css`
        margin-bottom: ${props.marginBottom}rem;
    `}
    @media screen and (max-width: 768px) {
        font-size: 6rem;
    }
`

const CustomHeading = styled(MainHeading)<HeadingProps>`
    background-color: ${({theme}) => theme.colors.buttoncolor};
    color: ${({theme}) => theme.colors.fontprimary};
`

export { MainHeading, CustomHeading };
