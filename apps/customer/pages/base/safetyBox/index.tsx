import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'

const MainContainer = styled.div`
    width: 100%;
    margin: 20rem 0;
    @media screen and (max-width: 767px) {
        margin: 13rem 0;
    }
`
const WrapperContainer = styled.div`
  width: 100%;
  max-width: 135rem;
  margin: 0 auto;
  @media screen and (max-width: 1360px) {
    max-width: 118rem;
  }
  @media screen and (max-width: 1022px) {
    max-width: 114rem;
  }
  @media screen and (min-width: 1023px) and (max-width: 1025px)  {
    max-width: 100% !important;
  }
  @media screen and (max-width: 991px) {
    max-width: 96rem;
  }
  @media screen and (max-width: 767px) {
    max-width: 72rem;
    padding: 0px 24px;
  }
  @media screen and (max-width: 575px) {
    max-width: 54rem;
  }
  h2 {
    font-family: 'proxima_novaregular';
    font-size: 48px;
    font-weight: 500;
    line-height: 58px;
    margin-bottom: 1.6rem;
    color: #0E1818;
    @media screen and (max-width: 767px) {
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 600;
      line-height: 29px;
    }
  }
  .date-place {
    font-family: 'proxima_novaregular';
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 3.4rem;
    color: #4E4E4E;
    @media screen and (max-width: 767px) {
      font-size: 14px;
      font-weight: 600;
      line-height: 28px;
      margin-bottom: 24px;
    }
  }
`
const SafetyBoxFirstContainer = styled.div`
    display: grid;
    grid-template-columns: 542px auto;
    justify-content: space-between;
    margin-bottom: 140px;
    h1 {
        color: #111727;
        margin-bottom: 10px;
    }
    p, ul li {
        font-size: 18px;
        font-weight: 400;
        line-height: 29px;
        color: #7C7C7C;
        margin-bottom: 10px;
       
    }
    ul {
        margin-top: 10px;
        list-style: inside;
    }
    @media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
        padding: 0px 10vw !important;    
      }
      @media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
        padding: 0px 10vw !important;    
      }
    @media screen and (max-width: 1000px) {
      display:block !important;
      h1{
        font-size:24px !important; 
      }
      div{
        width: 100%;
      }
      ul{
        margin-left: 7vw;
        margin-bottom:5vh;
        li{
          list-style-position: outside;
        }
      }   
    }
    @media screen and (min-width: 1023px) and (max-width: 1025px)  {
        grid-template-columns: 50% auto !important;
        align-items:center;
    }
`

const SafetyBoxTabContainer = styled.div`
    display: block;
    @media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
        padding: 0px 10vw !important;    
      }
      @media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
        padding: 0px 10vw !important;    
      }
    .tab-head {
        border-bottom: 1px solid rgba(0,0,0,0.1);
        margin-bottom: 70px;
        a {
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.8);
            margin-right: 2rem;
            padding: 0 0 1.5rem;
            cursor: pointer;
            &.active {
                font-weight: 700;  
                color: #000000;    
                display: inline-block;     
                border-bottom: 3px solid rgb(0,0,0);   
            }
        }
    }
`
const SafetyBoxTabContent = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    .dimensions {
        max-width: 400px;
        h4 {
            font-size: 28px;
            font-weight: 700;
            line-height: 28px;
            margin-bottom: 40px;
        }
        p {
            font-family: 'proxima_novaregular';
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            &.desc, &.title {
                line-height: 19px;
                margin-bottom: 10px;
                color: #444444;
            }
            &.desc {
                font-weight: 700;
            }
            &.title {
                font-weight: 600;            
            }
        }
        a {
            font-size: 16px;
            font-weight: 600;
            line-height: 26px;
            color: #000;
        }

    }
    .open-account {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 auto;
        button {
            width: 100%;
        }
    }
    @media screen and (max-width: 1000px) {
        
         display:block !important;
           
      }
      @media screen and (min-width: 1023px) and (max-width: 1025px)  {
        column-gap: 4rem;
        align-items:center;
      }
`

const SafetyBox = () => {

    const [tab, setTab] = useState(1);
    const [readMore,setReadMore]= useState(false);
    const content='Consectetur adipiscing elit. Duis est scelerisquedr pellentesque sed venenatis.It was popularised in the 1960s with the release of Letraset sheets containingConsectetur adipiscing elit. Duis est scelerisquedr pellentesque sed venenatis.It was popularised in the 1960s with the release of Letraset sheets containing';

    return (
        <MainContainer>
            <WrapperContainer>
                <SafetyBoxFirstContainer>
                    <div>
                        <h1>Safety box</h1>
                        <p>Our safety boxes offers innovative, seamless solution of security, storage and accessibility tailored to fit your busy lifestyle</p>
                        <p>Dual key security and tamper-proof seals secures each safe deposit box ensuring only you, the verified owner can access their valuables.</p>
                        <ul>
                            <li>View, deposit or withdraw your assets anytime, day or night.</li>
                            <li>At your preferred location, at your time of convenience.</li>
                            <li>24 hours a day, 7 days a week</li>
                        </ul>
                    </div>
                    <div>
                        <Image src="/images/customer/safety-box/safety-box-1.png" width="613" height="403" />
                    </div>
                </SafetyBoxFirstContainer>
                <SafetyBoxTabContainer>
                    <div className='tab-head'>
                       <a onClick={() => setTab(1)} className={`tab-link ${tab === 1 ? 'active' : ''}`}>Small</a>
                       <a onClick={() => setTab(2)} className={`tab-link ${tab === 2 ? 'active' : ''}`}>Medium</a>
                       <a onClick={() => setTab(3)} className={`tab-link ${tab === 3 ? 'active' : ''}`}>Large</a>
                    </div>
                    <SafetyBoxTabContent>
                        <div>
                            <Image src={`/images/customer/safety-box/${tab == 1 ? 'small' : tab == 2 ? 'medium' : 'large'}.png`} width="634" height="388" />
                        </div>
                        <div className='open-account'>
                            <div className='dimensions'>
                                <p className='title'>Dimensions</p>
                                <h4>
                                    {tab == 1 
                                        ? '60cm x 40cm x 40cm, 10 KG' : tab == 2 
                                        ? '60cm x 50cm x 50cm, 30 KG' 
                                        : '60cm x 80cm x 80cm, 80 KG'}
                                </h4>
                                <p className='desc'>Description</p>
                                <p>{ !readMore ? content.slice(30)+'...':content}</p>
                                <a className='cursor-pointer color-blu' onClick={()=>{
                                    setReadMore(!readMore);
                                }}>Read { !readMore ? 'more':'less'}</a>
                            </div>
                            <div>
                                {/* <ButtonPrimary>Open Account</ButtonPrimary> */}
                            </div>
                        </div>
                    </SafetyBoxTabContent>
                </SafetyBoxTabContainer>
            </WrapperContainer>
        </MainContainer>
    )
}

export default SafetyBox