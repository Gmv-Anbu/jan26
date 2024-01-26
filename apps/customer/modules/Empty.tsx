import React from 'react'
import styled from 'styled-components';
interface IEmptyProps {
    message?: string
}
const Empty = ({ message = "No Data Found" }: IEmptyProps) => {
    return (
        <EmptyWrapper>
            {message}
        </EmptyWrapper>
    )
}
export default Empty;

const EmptyWrapper = styled.div`
    margin:2rem;
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-style: normal;
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 2.63rem;
    color: ${({ theme }) => theme.colors.fontcolor};
    text-align:center;
`;
