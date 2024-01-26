import React, {useState, useEffect} from "react";
import { CreateButton } from 'libs/table/src/lib/tableStyles';
import Image from 'next/image';
import Router from 'next/router';
import styled from 'styled-components';
import moment from "moment";
import API from '@apps/admin/api/admin/index';

const HomeWrapper = styled.div`
  background: #E5E5E5;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  width: calc(100% + 30px);
  margin: 0 -15px;
`;

const ContentContainer = styled.div`
    background: white;
    width: auto;
    height: 497px;
    width: calc(100% - 36px);
    border-radius: 19px;
    margin: 0 18px;
   
`
const TextContent = styled.div`
display: flex;
justify-content: space-around;
flex-direction: column;
padding:31px 21px ;
`

const InnerContent = styled.div`
    display: flex;
    justify-content: space-between;
    .btn{
        margin: 30px 35px;
    }
`
const InnerTextContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 29px 33px;
`

const PreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
   justify-content: center;
    margin-top: 1.2rem;
`

const DesktopContainer = styled.div`
    
`
const MobileContainer = styled.div`
    position: relative;
   
`
const ChildContainer = styled.div`
    position: absolute;
    top:0;
    left: 11%;
   
`
const MobileTopImage = styled.div`
    position: relative;
    
`
const MobileCircleImage = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const MobileSpeakerImage = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DesktopRound = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DesktopGreyBorder = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DesktopSearch = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DesktopRectangle = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DesktopSpeaker = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DeaktopSpeakerRound = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const DesktopTraingle = styled.div`
     position: absolute;
    top:0;
    z-index: 999;
    left: 30%;
`
const handleCustomize = () => {
    Router.push('/theme/ThemeCustomization')
}
function ThemePageContent() {
    const [lastUpdated, setLastUpdated] = useState<string>('');
    useEffect(() => {
        getTheme();
    }, []);

    const getTheme = () => {
        API.getTheme()
            .then((res) => {
                if (res?.data?.data) {
                    const data = res?.data?.data;
                    const updatedDate = data?.updatedAt
                    setLastUpdated(updatedDate);
                }
            })
            .catch((err) => {
                console.log(err);

            });
    };

    return (
        <HomeWrapper>
            <TextContent>
                <h1>Set Theme</h1>
                <p>Set your theme for customers to see when they visit your store.</p>
            </TextContent>
            <ContentContainer>
                <InnerContent>
                    <InnerTextContent>
                        <h3>Whitelabel Product</h3>
                        <p>Last saved : {moment(lastUpdated).format("DD MMM YYYY")} at {moment.utc(lastUpdated).local().format("hh:mm A")}</p>
                    </InnerTextContent>
                    <CreateButton className="btn" onClick={handleCustomize}>
                        Customize
                    </CreateButton>
                </InnerContent>

                <PreviewContainer>

                    <Image src={'/images/admin/previewImage.png'} width={623} height={376} alt={"icon"} />
                </PreviewContainer>
            </ContentContainer>
        </HomeWrapper>
    )
}

export default ThemePageContent