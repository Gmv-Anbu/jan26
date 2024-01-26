import { ButtonGradientPrimary, ButtonPrimaryOutline } from "@apps/customer/modules/shared/components/button/button";
import InputText from "@apps/customer/modules/shared/components/formInputs/inputText";
import { InputWrapper } from "@apps/customer/modules/shared/styled-components/formInputs";
import { formatToUSD } from "@apps/customer/utils/helper";
import Image from "next/image";
import styled from "styled-components";

const ConfirmBidModal = ({ bid, close }) => {
    return (
        <ConfirmBidModalWrapper>
            <h3>Confirm Bid</h3>
            <p>To place a bid of {formatToUSD(bid)} kindly click on confirm to proceed</p>
            {/* <InputText disabled value={` ETH2.248`} className={`modal-input`} label={`Current Price`} />
            <InputText className={`modal-input`} label={`Offer Price`} /> */}
            <div className="d-flex-end">
                <button className="btn-primary-outline" onClick={() => close(false)}>Close</button>
                <button className="btn-primary" onClick={() => close(true)}>Confirm</button>
            </div>
        </ConfirmBidModalWrapper>
    )
};
export default ConfirmBidModal;

const ConfirmBidModalWrapper = styled.div`
    display:flex;
    flex-flow:column;
    width: 100%;
    max-width: 600px;
    min-width: 600px;
    padding: 60px 100px 77px;
    border-radius: 2rem;
    align-items:center;
    h3 {
        font-size: 38px;
        font-weight: 600;
        line-height: 46px;
        color: #111727;
        margin-bottom: 20px;
    }
    p {
        font-size: 18px;
        font-weight: 400;
        line-height: 29px;
        color: #7C7C7C;
        text-align: center;
        max-width: 572px;
        margin-bottom: 40px;
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
        justify-content: center;
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