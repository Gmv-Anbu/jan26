import styled from 'styled-components';

export const Container = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dropdown = styled.div`
  position: absolute;
  /* bottom: -92px;
  left: -138px; */
  top: 41px;
  background: #ffffff;
  box-shadow: 0px 6px 52px -4px rgba(22, 27, 37, 0.12);
  border-radius: 6px;
  min-width: 155px;
  margin-right: 135px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  white-space: nowrap;

  div {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    a, p, label {
      font-size: 14px;
    }
  }
`;

export const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 38px;
  height: 38px;
  position: relative;
  align-items: center;
  :hover {
    background: #f2f2f2;
    border-radius: 21px;
    border: none;
  }
`;
