import React from 'react';
import styled, { css } from 'styled-components';

import AdminSideMenu from '../sideMenu/sideMenu';
import AdminHeader from '../header/header';
import Meta from '../../../shared/components/meta';
import CustomHeader from '../header/CustomHeader';

const LayoutFlex = styled.div<any>`
  display: flex;
  justify-content: flex-end;
  #side-menu {
    max-width: ${props => props.sideMenuCollapse};
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #050d1c;
    ${(props) => props.sideMenuCollapse === `7rem` && css`
      a {
        padding: 0;
        margin-bottom: 2rem;
        span {
          padding: 0;
        }
      }
    `}
  }
  #main-section {
    width: calc(100% -  ${props => props.sideMenuCollapse});
  }
`;
const MainSection = styled.main`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const MainContent = styled.main`
  padding: 2.4rem 3rem;
  background: #fafafa;
  min-height: calc(100vh - 84px);
  height: 100%;
`;



const AdminLayout = (props: any) => {
  const { children, meta, pageTitle, sideMenuCollapse, customHeader } = props;
  const width = sideMenuCollapse ? '7rem' : '30rem'
  return (
    <LayoutFlex sideMenuCollapse={width}>
      <Meta meta={meta} />
      {/* here sideMenuCollapse is used to collapse the side menu for some particular pages  */}
      <AdminSideMenu sideMenuCollapse={sideMenuCollapse} />
      <MainSection id="main-section">
        {/* need to change something to add more options and alignment according to specifice page */}
        {customHeader === true ? <CustomHeader></CustomHeader> : <AdminHeader pageTitle={pageTitle} />}
        <MainContent>
          {children}
        </MainContent>
      </MainSection>
    </LayoutFlex>
  );
};

export default AdminLayout;
