import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ReactChart2Props {}

const StyledReactChart2 = styled.div`
  color: pink;
`;

export function ReactChart2(props: ReactChart2Props) {
  return (
    <StyledReactChart2>
      <h1>Welcome to ReactChart2!</h1>
    </StyledReactChart2>
  );
}

export default ReactChart2;
