import { ButtonGradientPrimary, ButtonPrimaryOutline } from "@apps/customer/modules/shared/components/button/button";
import InputText from "@apps/customer/modules/shared/components/formInputs/inputText";
import { InputWrapper } from "@apps/customer/modules/shared/styled-components/formInputs";
import Image from "next/image";
import styled from "styled-components";

const LockAmountModal = ({ close }) => {
    return (
        <LockAmountModalWrapper>
            <h3>Change your Lock Amount?</h3>
            <InputText className={`modal-input`} label={`Current Lock Amount`} />
            <div className="d-flex-end">
                <button className="btn-primary-outline" onClick={close}>Cancel</button>
                <button className="btn-primary" onClick={close}>Continue</button>
            </div>
        </LockAmountModalWrapper>
    )
};
export default LockAmountModal;

const LockAmountModalWrapper = styled.div`
    display:flex;
    flex-flow:column;
    width: 100%;
    max-width: 653px;
    min-width: 653px;
    padding: 80px;
    border-radius: 2rem;
    align-items:center;
    h3 {
        color: #111727;
        text-align: center;
        font-size: 48px;
        font-weight: 400;
        margin-bottom: 21px;
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
            width: 100%;
            color: #121212;
            font-size: 14px;
            font-weight: 700;
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
        margin-top: 34px;
        flex-direction: column-reverse;
        button {
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            padding: 16px 40px;
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