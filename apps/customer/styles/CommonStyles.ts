import styled from 'styled-components';

interface FlexProps {
    align?: string,
    justify?: string,
    gap?: string
}

export const Container = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
  @media screen and (max-width: 1360px) {
    max-width: 125rem;
  }
  @media screen and (max-width: 1100px) {
    max-width: 900px;
  }
  @media screen and (max-width: 991px) {
    max-width: 96rem;
  }
  @media screen and (max-width: 800px) {
    max-width: 72rem;
  }
  @media screen and (max-width: 575px) {
    padding: 0 2.4rem;
    max-width: 54rem;
  }
  
`
export const Flex = styled.div <FlexProps>`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props?.justify ? props.justify : "initial"};
    align-items: ${props => props?.align ? props.align : "initial"};
    gap: ${props => props?.gap ? props.gap : "0"};
`