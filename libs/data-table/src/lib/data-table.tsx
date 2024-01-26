import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DataTableProps {}

const StyledDataTable = styled.div`
  color: pink;
`;

export function DataTable(props: DataTableProps) {
  return (
    <StyledDataTable>
      <h1>Welcome to DataTable!</h1>
    </StyledDataTable>
  );
}

export default DataTable;
