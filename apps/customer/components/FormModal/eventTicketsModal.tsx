import { ButtonGradientPrimary, ButtonPrimaryOutline } from "@apps/customer/modules/shared/components/button/button";
import InputMobile from "@apps/customer/modules/shared/components/formInputs/inputMobile";
import InputText from "@apps/customer/modules/shared/components/formInputs/inputText";
import { InputWrapper } from "@apps/customer/modules/shared/styled-components/formInputs";
import { formatToUSD, validateForm } from "@apps/customer/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import API from '@apps/customer/api/customer'
import { useRouter } from "next/router";

const EventTicketModal = ({ eventId, close }) => {

    const formOg = {
        "quantity": 1,
        "name": "",
        "companyName": '',
        "contactEmail": "",
        "contactPhone": "",
        "contactCountryCode": ""
    }
    const formValidation = {
        "quantity": '',
        "name": "",
        "companyName": '',
        "contactEmail": "email",
        "contactPhone": "",
        "contactCountryCode": ""
    }
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [form, setForm] = useState(formOg)
    const [errors, setErrors] = useState(null)
    const [summary, setSummary] = useState(null)
    const [showErrors, setShowErrors] = useState(false)

    const handleSubmit = async () => {
        if(step === 1) {
            setShowErrors(true)
            const result = await validateForm(form, formValidation)
            console.log('result', result)
            if(result === true) {
                console.log('final payload', form)
                getTicketSummary()
            } else {
                setErrors(result)
            }
        } else {
            handlePayment()
        }
    }

    const handlePayment = () => {
        let cutLen = form?.contactCountryCode?.length
        let mobNo = form?.contactPhone?.slice(cutLen)
        let payload = {
            ...form,
            ['contactPhone']: mobNo
        }
        API.buyEventTickets(eventId, payload)
        .then(res => {
            if(res?.data?.data?.data?.redirect_url) {
                router.push(res?.data?.data?.data?.redirect_url)
            }
        })
        .catch(err => {
            console.log('errr', err)
        })
    }

    const getTicketSummary = () => {
        let cutLen = form?.contactCountryCode?.length
        let mobNo = form?.contactPhone?.slice(cutLen)
        let payload = {
            ...form,
            ['contactPhone']: mobNo
        }
        API.eventTicketSummary(eventId, payload)
        .then(res => {
            if(res?.data?.data) {
                console.log('res', res)
                setSummary(res?.data?.data)
                setStep(2)
            }
        })
        .catch(err => {
            console.log('errr', err)
        })
    }

    const increment = () => {
        setForm({
            ...form,
            ['quantity']: form?.quantity+1,
        })
    }

    const decrement = () => {
        if(form?.quantity !== 1) {
            setForm({
                ...form,
                ['quantity']: form?.quantity-1,
            })
        }
    }

    const handleClose = () => {
        if(step === 1) {
            close()
        } else {
            setStep(1)
        }
    }

    const handleMobile = (value, country) => {
        console.log('handleMobile', value, country)
        let cutLen = country?.dialCode?.length
        let mobNo = value?.slice(cutLen)
        setForm({
            ...form,
            ['contactPhone']: value,
            ['contactCountryCode']: '+'+country?.dialCode
        })
    }

    const handleOnChange = (e: any) => {
        let { name, value, files, checked } = e.target
        setForm({
            ...form,
            [name]: value,
        })
      }

    useEffect(() => {
        (async () => {
          if (showErrors) {
            const result = await validateForm(form, formValidation)
            if (result == true) {
              setErrors({})
            } else {
              setErrors(result)
            }
          }
        })()
    }, [form])

    console.log('asdasdasd', form, errors)

    return (
        <EventTicketModalWrapper>
            <TicketModalHeader>
                <h3>Get Tickets</h3>
                <div>
                    <div className="right">
                        <span className="active"></span>
                        <span className={step === 2 ? 'active': ''}></span>
                    </div>
                    <p>{step === 1 ? 'Basic Informations': 'Ticket Details'}</p>
                </div>
            </TicketModalHeader>
            <Wrapper>
                {step === 1 
                ? <div>
                    <InputText className={`modal-input`} label={`Name`} error={errors?.name} 
                        onChange={handleOnChange} value={form?.name} name={`name`} placeholder={`Enter Name`} />
                    <InputText className={`modal-input`} label={`Company Name`} error={errors?.companyName} 
                        onChange={handleOnChange} value={form?.companyName} name={`companyName`} placeholder={`Enter Company Name`} />
                    <InputText className={`modal-input`} label={`Contact Email`} error={errors?.contactEmail} 
                        onChange={handleOnChange} value={form?.contactEmail} name={`contactEmail`} placeholder={`Enter Contact Email`} />
                    <InputMobile label={`Mobile Number`} className={`modal-input`} value={form?.contactPhone} error={errors?.contactPhone} onChange={handleMobile} />
                    <Incrementor>
                        <label>Number of Tickets</label>
                        <div className="d-flex-aic">
                            <div onClick={() => decrement()} className="box">-</div>
                            <div className="box quantity">{form?.quantity}</div>
                            <div onClick={() => increment()} className="box">+</div>
                        </div>
                    </Incrementor>
                </div>
                : <StepTwoContent>
                    <div className="divider">
                        <div className="d-flex-aic">
                            <Image width={24} height={24} src={`/svgs/ticket.svg`} />&nbsp;&nbsp;
                            <h3>Number of Tickets</h3>
                        </div>
                        <h4>{form?.quantity}</h4>
                    </div>
                    <div className="divider">
                        <div className="sub d-flex-aic-jcsb">
                            <span>Subtotal</span>
                            <p>{formatToUSD(summary?.total,2)}</p>
                        </div>
                        <div className="sub d-flex-aic-jcsb"> 
                            <span>Tax</span>
                            <p>$0</p>
                        </div>
                        <div className="sub d-flex-aic-jcsb">
                            <span>Discount (10%off)</span>
                            <p>$0</p>
                        </div>
                    </div>
                    <div className="total d-flex-aic-jcsb">
                        <span>Total</span>
                        <p>{formatToUSD(summary?.total,2)}</p>
                    </div>
                </StepTwoContent>}
            </Wrapper>
            <div className="d-flex-end">
                <button className="btn-primary-outline" onClick={handleClose}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>Continue</button>
            </div>
        </EventTicketModalWrapper>
    )
};
export default EventTicketModal;

const EventTicketModalWrapper = styled.div`
    display:flex;
    flex-flow:column;
    width: 100%;
    max-width: 840px;
    min-width: 840px;
    padding: 60px 100px 77px;
    border-radius: 2rem;
    align-items: baseline;
    h3 {
        font-size: 38px;
        font-weight: 600;
        line-height: 46px;
        color: #111727;
    }
    p {
        font-size: 18px;
        font-weight: 400;
        line-height: 29px;
        color: #7C7C7C;
        text-align: center;
        max-width: 572px;
    }
    .my-class {
        padding: 11px 45px !important;
    }
    .error {
        margin: 0 !important;
        line-height: 20px;
    }
    .modal-input {
        width: 100%;
        margin-bottom: 30px;
        input {
            min-width: 640px;
            font-size: 24px;
            font-weight: 600;
            padding: 11px 17px;
            height: 52px;
            &:disabled {
                background: linear-gradient(0deg, #F4F9F9, #F4F9F9), linear-gradient(0deg, #D1E0E2, #D1E0E2);
            }
        }
        label {
            margin: 0 0 5px 0;
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
            color: #121212;
        }
    }
    .d-flex-end {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        gap: 2rem;
        margin-top: 30px;
        button {
            font-size: 18px;
            font-weight: 700;
            line-height: 22px;
            padding: 14px 40px;
            cursor: pointer;
            height: 50px;
        }
        .btn-primary-outline {
            color: #2A7575;
            background: transparent;
            border: 1px solid #2A7575;
        }
        .btn-primary {
            color: white;
            background: #2A7575;
            border: 1px solid #2A7575;
        }
    }
    @media screen and (max-width: 850px) {
        max-width: 840px;
        min-width: auto;
        padding: 40px 24px;
        h3 {
            font-size: 24px;
            font-weight: 600;
            line-height: 31px;
            letter-spacing: 0.005em;
            margin-bottom: 20px;
        }
        p {
            font-size: 18px;
            font-weight: 400;
            line-height: 29px;
            letter-spacing: -0.011em;
        }
        .modal-input {
            margin-bottom: 20px;
            input {
                min-width: 250px;
                height: 46px;
                font-size: 22px;
                font-weight: 600;
                line-height: 22px;
            }
        }
        .d-flex-end {
            margin-top: 20px;
        }
    }
    @media screen and (max-width: 575px) {
        padding: 3rem;
        .d-flex-end {
            flex-direction: column-reverse;
            width: 100%;
            gap: 16px;
            button {
                padding: 8px 18px;
            }
        }
    }
`;
const TicketModalHeader = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span {
        display: inline-block;
        width: 48px;
        height: 5px;
        border-radius: 50px;
        opacity: 0.2;
        background: #2A7575;
        margin-left: 4px;
        &.active {
            opacity: 1;
        }
    }
    p {
        margin-top: 4px;
        color: #7C7C7C;
        font-size: 18px;
        font-weight: 400;
        line-height: 142.5%; /* 25.65px */
    }
    .right {
        text-align: right;
    }
`
const Wrapper = styled.div`
    width: 100%;
`
const StepTwoContent = styled.div`
    h3 {
        font-size: 18px;
        font-weight: 400;
        color: #7C7C7C;
    }
    .divider {
        padding-bottom: 24px;
        border-bottom: 1px solid #D9D9D9;
        margin-bottom: 30px;
    }
    h4 {
        font-size: 32px;
        font-weight: 500;
        line-height: 33px;
        color: #0E1818;
    }
    .sub {
        margin-bottom: 20px;
        span {
            font-size: 18px;
            font-weight: 400;
            line-height: 26px;
            color: #7C7C7C;
        }
        p {
            font-size: 22px;
            font-weight: 400;
            line-height: 26px;
            color: #0E1818;
        }
    }
    .total {
        span {
            font-size: 18px;
            font-weight: 400;
            line-height: 26px;
            color: #4E4E4E;
        }
        p {
            font-size: 32px;
            font-weight: 500;
            line-height: 33px;
            color: #0E1818;
        }
    }
`
const Incrementor = styled.div`
    width: 100%;
    label {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #121212;
    }
    div.box {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #2A75750A;
        font-size: 20px;
        font-weight: 400;
        line-height: 26px;
        cursor: pointer;
    }
    div.quantity {
        width: 72px;
        background: white;
        border: 1.5px solid #D0D0D0;
        margin: 0 4px;
        color: #121212;
        cursor: default;
    }
`