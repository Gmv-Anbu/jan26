import Image from "next/image";
import styled from "styled-components";
import { ButtonGradientPrimary } from "../../../shared/components/button/button";

interface IConfirmationModalProps {
    title?: string,
    desc?: string,
    imgSrc?: string,
    close: () => void
    onConfirmation: () => void
}


const ButtonContainer = styled.div`
    display:flex;
    justify-content: space-between;
    gap:1rem;
`


const ConfirmationModal = ({ title = "Confirm", desc = "Are you sure you want to delete ?", imgSrc = "/svgs/modal-success.svg", close, onConfirmation }: IConfirmationModalProps) => {
    return (
        <ConfirmationModalWrapper>
            <Header>{title}</Header>
            <Image height={191} width={213} src={imgSrc} alt="Confirmation-img" />
            <Subhead>{desc}</Subhead>
            {/* <ButtonGradientPrimary blockBtn onClick={close} fs="1.4" size="sm" >Done</ButtonGradientPrimary> */}
            <ButtonContainer>
                <ButtonGradientPrimary onClick={onConfirmation} blockBtn size="md" className="button-content">
                    Yes
                </ButtonGradientPrimary>
                <ButtonGradientPrimary onClick={close} blockBtn size="md" className="button-content">
                    No
                </ButtonGradientPrimary>
            </ButtonContainer>
        </ConfirmationModalWrapper>
    )
};
export default ConfirmationModal;

const ConfirmationModalWrapper = styled.div`
    display:flex;
    flex-flow:column;
    margin:2.3rem 4.6rem;
    align-items:center;
    gap:3rem;
`;
const Header = styled.h2`
    margin:0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 3rem;
    color: ${({ theme }) => theme.colors.fontcolor};
`;
const Subhead = styled.h4`
    margin:0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: ${({ theme }) => theme.colors.fontdark};
`;