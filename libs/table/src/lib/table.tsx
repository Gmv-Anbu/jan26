import { TableContainer, TableTd, TableTh, TableTr, TableWrapper, EmptyNLoadWrapper } from './tableStyles'
import Image from 'next/image'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Loader } from '@apps/admin/modules/shared/components/Loader/index'

/* eslint-disable-next-line */
export interface TableProps {
  data: any
  columns: any
  selectedRow?: Array<any>
  showLoader?: boolean
  width?:any
}

export function Table(props: TableProps) {
  return (
    <TableWrapper>
      <TableContainer>
        <thead>
          <TableTr>
            {props.columns.map((column: any) => {
              return  column?.width ?(<TableTh style={{ width: column?.width, minWidth: column?.width, whiteSpace:column?.whiteSpaceBreak ? 'break-spaces':'nowrap' }} key={column?.id}>{column.title}</TableTh>):(<TableTh style={{whiteSpace:column?.whiteSpaceBreak ? 'break-spaces':'nowrap' }} key={column?.id}>{column.title}</TableTh>)
            })}
          </TableTr>
        </thead>
        <tbody>
          {props?.data?.map((val: any) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <TableTr key={`${val?.id}0x`} isSelected={props.selectedRow?.includes(val?.id) ? true : false}>
                {props.columns?.map((column: any, index: number) => {
                     return column?.width ?(<TableTd className={column?.width? 'width' : ''} style={{ width: column?.width, minWidth: column?.width, whiteSpace:column?.whiteSpaceNoBreakRow ? 'nowrap':'break-spaces', overflowWrap :column?.breakAnywhere ? 'anywhere':'break-word'  }} key={`${val?.id}${index}`}>{column?.render ? column?.render(val) : val[column?.key] || '-'}</TableTd>):(<TableTd style={{whiteSpace:column?.whiteSpaceNoBreakRow ? 'nowrap':'break-spaces',overflowWrap :column?.breakAnywhere ? 'anywhere':'break-word' }}  key={`${val?.id}${index}`}>{column?.render ? column?.render(val) : val[column?.key] || '-'}</TableTd>)
                })}
              </TableTr>
            )
          })}
        </tbody>
      </TableContainer>
      {props.showLoader ? (
        <EmptyNLoadWrapper>
          <Loader width="100" height="60" />
        </EmptyNLoadWrapper>
      ) : null}
      {props.data?.length === 0 && !props.showLoader ? (
        <EmptyNLoadWrapper>
          <Image src={'/svgs/icons/no-data.svg'} width={100} height={100} alt={'empty'} />
          <p>No data</p>
        </EmptyNLoadWrapper>
      ) : null}
    </TableWrapper>
  )
}

export default Table
