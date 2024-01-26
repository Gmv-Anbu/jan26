import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import actions from '../../redux/actions';
import AdminLayout from '../../modules/admin/components/layout/layout';
import API from '../../api/admin';
import { Table } from '@nft-marketplace/table';
import Link from 'next/link'

const Container = styled.div`
background: #F6F6F6;
min-height: 100vh;
height: 100%;
width: 100%;
padding: 2rem;
`

const Title = styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 29px;
color: #1B1B1B;
`;

const SubTitle = styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #656565;
margin-top: 7px;
`;

const PageContent = styled.div`
margin-top: 98px;
display:flex;
.left-content{
    width: 30%
}
.right-content{
    width: 60%
}
`;

const Content = styled.div`
.content-text {
    padding-bottom: 14px;
    .div{
        max-width: 300px
    }
  }
`;

const TableContent = styled.div`
.TableWrapper {
    margin-top:10px;
  }
`;

export const TableHead = styled.div`
  font - family: 'Inter';
  font - style: normal;
  font - weight: 400;
  font - size: 16px;
  line - height: 19px;
  display: flex;
  align - items: center;
  padding-left:20px;
`;

export const TableRow = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding-left:20px;
`;

const TableTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding-left: 30px;
`;

const LinkAnchor = styled.a`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
text-decoration-line: underline;
color: #2C79B7;
`;

const NavigationMenu: NextPage = () => {
  const [menus, setMenus] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { storeThemeData } = actions;
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const meta = {
    title: 'NFT2.0 | Navigation',
    description: 'Admin Navigation for NFT',
  };

  const getSubMenus = (data, menu) => {
    return data?.sections?.home?.[menu]?.menus.map(menu => menu.menu.title).join(", ")
  }

  const getMenus = () => {
    setShowLoader(true);
    API.getTheme()
      .then((res) => {
        setShowLoader(false);
        if (res?.data?.data?.sections?.home) {
          const menus = [
            {
              key: 'header',
              menu: 'Header Menu',
              submenus: getSubMenus(res?.data?.data, 'header')
            },
            {
              key: 'footer',
              menu: 'Footer Menu',
              submenus: getSubMenus(res?.data?.data, 'footer')
            },
          ]
          setMenus(menus);
          dispatch(storeThemeData(res?.data?.data));
        }
      })
      .catch((err) => {
        setShowLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <AdminLayout meta={meta} pageTitle={`Navigation`}>
        <Container>
          <Title>Navigation</Title>
          <SubTitle>Setup your navigation paths of your website
          </SubTitle>
          <PageContent>
            <Content className='left-content'>
              <Title className='content-text' style={{ maxWidth: "300px" }}>Menus</Title>
              <SubTitle className='content-text' style={{ maxWidth: "300px" }}>Menus or Link lists helps your customers to navigate through your platform
              </SubTitle>
              <SubTitle className='content-text' style={{ maxWidth: "300px" }}>You can also create nested menus to display dropdown menus and group products pr pages together
              </SubTitle>
            </Content>
            <TableContent className='right-content'>
              <TableTitle>
                Menus
              </TableTitle>
                <Table
                  columns={[
                    {
                      id: 1,
                      title: <TableHead>Title</TableHead>,
                      key: 'menu',
                      render: (key: any) => (
                        <>
                          <TableRow>
                            <LinkAnchor><Link color="secondary"
                              href={`navigation/${key?.key}`}
                            >{key?.menu}
                            </Link>

                            </LinkAnchor>
                          </TableRow>
                        </>
                      ),
                    },
                    {
                      id: 2,
                      title: <TableHead>Items</TableHead>,
                      key: 'submenus',
                      render: (key: any) => (
                        <>
                          <TableRow
                          >
                            {key?.submenus}
                          </TableRow>
                        </>
                      ),
                    },
                  ]}
                  data={menus}
                  showLoader={showLoader}
                />
            </TableContent>
          </PageContent>
        </Container>
      </AdminLayout>


    </>
  );
};

export default NavigationMenu;
