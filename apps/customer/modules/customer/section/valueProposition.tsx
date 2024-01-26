import React from 'react'
import styled from 'styled-components'
import ValueCard from '@apps/customer/components/ValueCard'

const ValuePreproswrap = styled.div`
  padding: 10rem 5rem;
  background: url(/images/customer/home/FUTUREGRAIL.svg) no-repeat;
  background-size: contain;
  margin-top: 6rem;
  h1 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 6rem;
    line-height: 104%;
  }
  p {
    max-width: 44.4rem;
/* height: 52px; */
font-weight: 400;
    color: #4e4e4e;
    font-size: 1.8rem;
    position: relative;
    margin-top:1.3rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
  }

  @media screen and (max-width: 425px) {
    padding: 5rem 2rem;
    h1 {
      font-weight: 400;
      font-size: 2.4rem;
      line-height: 116%;
      color: #0e1818;
    }
    p {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 142.5%;
      color: #848a8b;
    }
  }
`
export const Container = styled.div`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;
`
export const HeadingDiv = styled.div`
  width: 100%;
  max-width: 144rem;
  margin-left: 1rem;
  margin-top: -3rem;
`
const ValueProposition = () => {
  return (
    <ValuePreproswrap>
      <Container>
        <HeadingDiv>
          <h1>Core Values</h1>
          <p>Our core values - Trust, Authenticity, Equality, and Innovation - inform all our actions and decisions.</p>
        </HeadingDiv>
        <ValueCard />
      </Container>
    </ValuePreproswrap>
  )
}

export default ValueProposition
