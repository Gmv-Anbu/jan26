import styled from 'styled-components';
export const TableTag=styled.table`
width:100%;
font-size:${({ theme }) => theme.fontSizes.sm};
color: ${({ theme }) => theme.colors.artWorkText};
`
export const TableHead=styled.thead`
font-weight:600;
font-size:${({ theme }) => theme.fontSizes.sm};
`
export const TableRow=styled.tr`
width:100%;
font-size:${({ theme }) => theme.fontSizes.sm};
`
export const TableColumn=styled.td`
font-size:${({ theme }) => theme.fontSizes.sm};
padding:10px;
border-bottom: 1px solid ${({ theme }) => theme.colors.tabBorderBot};
`

export const FirstColumn=styled.td`
font-size:${({ theme }) => theme.fontSizes.sm};
padding:10px;
display:flex;
font-weight:600;
align-items:center;
border-bottom: 1px solid ${({ theme }) => theme.colors.tabBorderBot};
img{
    margin-right:10px !important;
}
`