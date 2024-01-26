import SellModal from '@apps/customer/components/FormModal/sellModal'
import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import ErrorModal from '@apps/customer/modules/customer/shared/modal/ErrorModal'
import SuccessModal from '@apps/customer/modules/customer/shared/modal/success'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import { Container } from '@apps/customer/styles/CommonStyles'
import { ModalService } from '@nft-marketplace/modal'
import Image from 'next/image'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'

const SellPageWrapper = styled.div`
    width: 100%;
    span {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: -0.011em;
        color: #7C7C7C;
    }
    @media screen and (max-width: 768px) {
        .container {
            padding: 0 4rem;
        }
    }
    @media screen and (max-width: 500px) {
        .container {
            padding: 0 24px;
        }
        span {
            font-size: 18px;
            font-weight: 400;
            line-height: 26px;
        }
    }
`
const HowTo = styled.div`
    text-align: center;
    padding: 140px 0 177px;
    background : #F4F9F9;
    h2 {
        font-size: 60px;
        font-weight: 400;
        line-height: 62px;
        color: #0E1818;
        margin-bottom: 76px;
        text-transform: uppercase;
    }
    .how-to-card-contianer {
        display: grid;
        grid-template-columns: 390px 348px 384px;
        grid-gap: 158px;
    }
    @media screen and (max-width: 1550px) {
        .how-to-card-contianer {
            grid-gap: 70px;
            justify-content: space-between;
        }
    }
    @media screen and (max-width: 1300px) {
        .how-to-card-contianer {
            grid-template-columns: auto auto auto;
        }
    }
    @media screen and (max-width: 850px) {
        h2 {
            margin-bottom: 40px;
        }
        .how-to-card-contianer {
            grid-template-columns: auto;
        }
    }
    @media screen and (max-width: 500px) {
        padding: 40px 0;
        h2 {
            font-size: 24px;
            line-height: 28px;
        }
        .how-to-card-contianer {
            grid-gap: 44px;
        }
    }
`
const HowToCards = styled.div`
    .img {
        margin-bottom: 45px;
    }
    p {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;
        margin-bottom: 10px;
        color: #111727;
    }
    @media screen and (max-width: 850px) {
        .img {
            max-width: 160px;
            margin: 0 auto 20px;
        }
    }
    @media screen and (max-width: 500px) {
        p {
            font-size: 24px;
            line-height: 29px;
        }
    }
`

const BestPlatform = styled.div`
    text-align: center;
    padding: 125px 0 116px;
    .img {
        margin-bottom: 35px;
    }
    h3 {
        font-size: 60px;
        font-weight: 400;
        line-height: 62px;
        color: #0E1818;
        margin-bottom: 26px;
        text-transform: uppercase;
    }
    span {
        max-width: 820px;
        margin: 0 auto 60px;
        display: block;
    }
    button {
        font-size: 18px;
        font-weight: 600;
        line-height: 20px;
        padding: 16.5px 40px;
    }
    @media screen and (max-width: 500px) {
        padding: 40px 0 60px;
        h3 {
            font-size: 24px;
            font-weight: 600;
            line-height: 29px;
            margin-bottom: 20px;
            text-transform: initial;
        }
        .img {
            margin-bottom: 30px;
        }
        span {
            margin: 0 auto 40px;
        }
        button {
            width: 100%;
            display: block;
            min-width: 100%;
        }
    }
`

const SellPage = () => {

    const showSellModal = () => ModalService.open((modalProps: any) => 
                                    <SellModal close={modalProps.close} commonModalPopup={commonModalPopup}  />, 
                                    { closeIcon: false, height: 'inherit',  }
                                )
                        
    const commonModalPopup = (type: string, msg: string) => {
        if (type === 'success') {
            Toast.success(msg)
        } else {
            Toast.error(msg)
        }
    }

    return (
        <SellPageWrapper>
            <Banner className={`sell-page`} button={`Get my quote`} onClick={showSellModal} heading={'Sell'} description={'Our Vault offers full coverage of your assets and array of services to protected you against economics risks.'} maxHeight={`500px`} height={'500px'} />
            <HowTo>
                <Container className='container'> 
                    <h2>How to Sell Your Watch</h2>
                    <div className='how-to-card-contianer'>
                        <HowToCards>
                            <div className='img'><Image src='/svgs/receive-quote.svg' width="252" height='252' /></div>
                            <p>Receive Your Quote</p>
                            <span>You will receive a set of forms, required for submission. Our compliance team will perform Due Diligence / KYC (Know-Your-Customer) run on the applicant.</span>
                        </HowToCards>
                        <HowToCards>
                            <div className='img'><Image src='/svgs/sell-inspection.svg' width="252" height='252' /></div>
                            <p>Full Watch Inspection</p>
                            <span>Your account will be opened within 5 working days, where a personal advisor will be attached to your account.</span>
                        </HowToCards>
                        <HowToCards>
                            <div className='img'><Image src='/svgs/sell-payment.svg' width="252" height='252' /></div>
                            <p>Receive Payment</p>
                            <span>We arrange for your valuables to be shipped from your location overseas door-to-door to the FutureGrail Vault, a bonded (Tax Free) facility at the heart of Singapore. </span>
                        </HowToCards>
                    </div>
                </Container>
            </HowTo>
            <BestPlatform>
                <Container className='container'>
                    <div className='img'><Image src='/svgs/no-1.svg' width="115" height='115' /></div>
                    <h3>The Best Platform For Selling your Watch</h3>
                    <span>Consectetur adipiscing elit. Duis est scelerisque pellentesque sed venenatis. Risus porttitor in cursus justo, posuere odio justo, dolor. Habitasse faucibus diam, malesuada arcu, proin pellentesque. Amet, habitasse rhoncus dis quam id adipiscing tempus egestas nec. </span>
                    <ButtonPrimary onClick={() =>  showSellModal()}>Get a quote</ButtonPrimary>
                </Container>
            </BestPlatform>
            <Newsletter theme="light" />
        </SellPageWrapper> 
    )
}

export default SellPage