import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from 'styled-components'
import useWindowSize from "../hooks/useWindowSize";
import Header from "../modules/customer/layout/header/header.customer";
import { ButtonPrimary } from "../modules/shared/components/button/button";

import Meta from "../modules/shared/components/meta";
import { Container } from "../styles/CommonStyles";

const NotfoundWrapper = styled.div`
    padding: 239px 0 145px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0E1818 url("/images/customer/notFound/404-bg.png") no-repeat center;
    background-size: cover;
    img{
        padding-bottom: 57px !important;
    }
    h1{
        font-weight: 600;
        font-size: 3.6rem;
        line-height: 36px;
        text-transform: none;
        padding-bottom: 10px;
    }
    h2{
        font-weight: 300;
        font-size: 6.4rem;
        line-height: 120%;
        color: #FFFFFF;
        padding-bottom: 30px;
    }
    p{
        color: #949494;
        line-height: 28px;
        max-width: 440px;
        text-align: center;
        padding-bottom: 60px;
    }
    @media screen and (max-width: 391px){
        background: #0E1818 url("/images/customer/notFound/404-bg-mob.png") no-repeat center;
        padding: 140px 0 80px;
        h1{
            font-size: 24px;
            line-height: 24px;
        }
        h2{
            font-size: 42px;
            line-height: 120%;
        }
        p{
            font-size: 18px;
            line-height: 28px;
            max-width: 342px;
            padding-bottom: 30px;
        }
    }
`

const PageNotFound: any = () => {
    const router = useRouter()
    return (
        <NotfoundWrapper>
            {/* <Meta /> */}
            {/* <Container> */}
                <Image src="/images/customer/notFound/404.svg" alt="Page not found" width={242} height={320}/>
                <h1>404 error</h1>
                <h2>Page not found...</h2>
                <p>Sorry, the page you are looking for doesn’t exist or has been moved. Try searching our site :</p>
                <ButtonPrimary fontWeight={400} padding="1.6rem 3.9rem" onClick={() => router.push("/")}>Back home</ButtonPrimary>
            {/* </Container> */}

        </NotfoundWrapper>
    )
}

export default PageNotFound;

PageNotFound.getLayout = function PageLayout(page) {
    return (
        <>
            <Header />
            {page}
        </>
    )
}
