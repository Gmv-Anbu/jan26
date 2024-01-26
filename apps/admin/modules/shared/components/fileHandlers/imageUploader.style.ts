import Image from 'next/image';
import styled from 'styled-components';
import { ButtonPrimary } from '../button/button';
export const UploadWrapper = styled.div`
    display:flex;
    flex-flow:column;
    flex:1 0 100%;
    gap:10px;
    width:250px;
`;
export const ImagePreview = styled.div`
    width:100%;
    height:150px;
    display:flex;
    justify-content:center;
    align-items:center;
    span{
        width:100%!important;
        height:100%!important;
    }
`;
export const UploadButton = styled(ButtonPrimary)`
`;
export const HiddenUploadInput = styled.input`
    display:none;
`;