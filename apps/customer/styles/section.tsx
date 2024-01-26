import styled, { css } from 'styled-components'

interface SectionProps {
  marginBottom?: string
}

export const SectionHeading = styled.h2<SectionProps>`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 4rem;
  font-weight: 600;
  line-height: 6rem;
  margin: 0;
  text-transform: capitalize;
  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom}rem;
    `}
`
export const FLexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
  @media screen and (max-width: 520px) {
    margin-bottom: 3rem;
    display: block;
  }
`
