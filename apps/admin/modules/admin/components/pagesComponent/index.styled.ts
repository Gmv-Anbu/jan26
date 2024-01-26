import styled from "styled-components";

interface ActionBtnProps {
    textDecoration?: string,
    color?: string,
    border?: string,
    borderRadius?: string;
}

const Container = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  margin-top: 1.4rem;
  width: calc(100% - 80px);
`;
const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  .add_icon {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const SelectBox = styled.select`
  width: 115px;
  height: 40px;
  left: calc(50% - 115px / 2 + 65.5px);
  top: 400px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #eaeaea;
  border-radius: 7px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-bottom: unset !important;
  }
`;

const Label = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:100px;
`;

const SpanLight = styled.span`
  color: ${({ theme }) => theme.colors.headerAnchor};
`

const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`
const ActionBtn = styled.p<ActionBtnProps>`
  font-size: 14px !important;
  text-decoration: ${props => props.textDecoration || 'none'};
  color: ${props => props.color || '#131313'};
  cursor: pointer;
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || 'none'};
`

export { Container, SpaceBetween, SelectBox, Flex, Label, SpanLight, ActionButtonsWrapper, ActionBtn };