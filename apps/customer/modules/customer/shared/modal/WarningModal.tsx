import Image from "next/image";
import styled from "styled-components";
import { ButtonGradientPrimary } from "../../../shared/components/button/button";
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper';
interface IWarningModalProps {
    title?: string,
    desc?: string,
    imgSrc?: string,
    btnLabel?: string,
    close: () => void
}


const WarningModal = ({ title = "Congratulations",
    desc = "You are successfully connected",
    btnLabel = "Done",
    close }: IWarningModalProps) => {
    const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
    const imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.warningImg) || "/svgs/warning.svg";

    return (
        <WarningModalWrapper>
            <Image height={102} width={113} src={imgSrc} alt="warning-img" />
            <Header>{title}</Header>
            <Subhead>{desc}</Subhead>
            <ButtonGradientPrimary blockBtn onClick={close} fs="1.4" size="sm" >{btnLabel}</ButtonGradientPrimary>
        </WarningModalWrapper>
    )
};
export default WarningModal;

const WarningModalWrapper = styled.div`
    display:flex;
    flex-flow:column;
    margin:3.69rem 3.44rem 3.44rem 3.12rem;
    align-items:center;
`;
const Header = styled.h2`
    margin:0;
    margin-top:1.68rem;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-style: normal;
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 2.63rem;
    color: ${({ theme }) => theme.colors.fontcolor};
    margin-bottom:0.5rem;
`;
const Subhead = styled.h4`
    margin:0;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.69rem;
    color: ${({ theme }) => theme.colors.fontdark};
    margin-bottom:5rem;
`;