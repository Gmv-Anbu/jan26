import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import AdminLayout from '../../modules/admin/components/layout/layout';
import { CreateButton } from 'libs/table/src/lib/tableStyles';
import { useRouter } from 'next/router';
import ListAllPages from '@apps/admin/modules/admin/components/pagesComponent/ListAllpages';

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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    .btn{
        margin-right: 80px;
    }
`
const TextContent = styled.div`
    display: flex;
    flex-direction: column;
`


const Pages: NextPage = () => {
    const router = useRouter();

    const meta = {
        title: 'NFT2.0 | Pages',
        description: 'Admin Pages for NFT',
    };

    const goToAddPage = () => {
        router.push('/pages/add');
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Pages`}>
            <Container>
                {/* <Header>
                    <div>
                        <Title>Build Pages</Title>
                        <SubTitle>Setup new pages for the platform
                        </SubTitle>
                    </div>
                    <div>
                        <CreateButton className="btn" >
                            Add Page
                        </CreateButton>
                    </div>
                </Header> */}
                <Header>
                    <TextContent>
                        <Title>Build Pages</Title>
                        <SubTitle>Setup new pages for the platform
                        </SubTitle>
                    </TextContent>
                    <CreateButton className="btn" onClick={goToAddPage} >
                        Add Page
                    </CreateButton>
                </Header>
                <ListAllPages />
            </Container>
        </AdminLayout>
    );
};

export default Pages;
