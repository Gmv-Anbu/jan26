import { NextPage } from "next";
import styled from 'styled-components'

import Meta from "../modules/shared/components/meta";

const NotfoundWrapeper = styled.div`
    padding 5rem;
    color: ${({ theme }) => theme.colors.fontprimary};
`

const PageNotFoound: NextPage = () => {

    const meta = {
        title: 'NFT | 404 Page',
        description: 'NFT Market place 2.0 | 404 Page'
    };

    return (
        <NotfoundWrapeper>
            <Meta meta={meta}/>
            404 | This page could not be found.
        </NotfoundWrapeper>
    )
}

export default PageNotFoound;