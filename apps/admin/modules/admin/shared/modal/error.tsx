import Image from "next/image";
import styled from "styled-components";
import { ButtonGradientPrimary } from "../../../shared/components/button/button";

interface IErrorModalProps {
    title?: string,
    desc?: string,
    imgSrc?: string,
    close: () => void
}



const ErrorModal = ({ title = "Error", desc = "Something went worng", imgSrc = "/svgs/modal-error.svg", close }: IErrorModalProps) => {
    return (
        <ErrorModalWrapper>
            <Header>{title}</Header>
            <Image height={191} width={213} src={imgSrc} alt="success-img" />
            <Subhead>{desc}</Subhead>
            <ButtonGradientPrimary blockBtn onClick={close} fs="1.4" size="sm" >Done</ButtonGradientPrimary>
        </ErrorModalWrapper>
    )
};
export default ErrorModal;

const ErrorModalWrapper = styled.div`
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
    color:  #1D1D1D;
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