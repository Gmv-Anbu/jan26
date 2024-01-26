import React from 'react'
import styled from 'styled-components'

import Header from './header/header.customer'
import Footer from './footer/footer.customer'
import Meta from '../../shared/components/meta'
import { useRouter } from 'next/router'

const CustomerLayoutWrapper = styled.div``

const MainContainer = styled.main`
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  max-width: 138rem;
  // height:1828px;
  @media screen and (max-width: 1500px) {
    max-width: 120rem;
  }
  @media screen and (max-width: 1120px) {
    //padding: 0 2rem;
  }
  @media screen and (max-width: 768px) {
    //padding: 0 2rem;
  }
  &.noContainer {
    max-width: 100%;
    margin: 0;
    display: block;
    overflow: hidden;
  }
  /* @media screen and (max-width: 768px) {
    &.noContainer {
      display: flex;
    }
  } */
`

const CustomerLayout = (props: any) => {
  const { children, noContainer } = props
  const router = useRouter()
  const routesWithoutLayout = ['/base/signup', '/base/signin', '/base/forgotpassword', '/reset-password']

  if (routesWithoutLayout.includes(router.pathname)) {
    // Render only the main container without the layout components
    return (
      <CustomerLayoutWrapper>
        <Meta />
        <MainContainer className={noContainer ? 'noContainer' : ''}>{children}</MainContainer>
      </CustomerLayoutWrapper>
    )
  }

  // Render the full layout with header, main container, and footer
  return (
    <CustomerLayoutWrapper>
      <Meta />
      <Header />
      <MainContainer className={noContainer ? 'noContainer' : ''}>{children}</MainContainer>
      <Footer />
    </CustomerLayoutWrapper>
  )
}

export default CustomerLayout
