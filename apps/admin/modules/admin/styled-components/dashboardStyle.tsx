import styled from 'styled-components'

export const colorSelector = {
  revenue: 'rgba(255, 178, 59, 0.2)',
  assetCount: 'rgba(35, 217, 173, 0.18)',
  userCount: 'rgba(56, 93, 255, 0.17)',
  creatorCount: '#FCE8FF',
  collectionCount: 'rgba(113, 97, 212, 0.24)',
  visitorsCount: 'rgba(56, 93, 255, 0.17)',
  purchaseCount: 'rgba(255, 178, 59, 0.2)',
}

export const DashBoardNavBar = styled.div`
  font-family: Poppins;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.fontdark};
  margin-bottom: 3.8rem;
`

export const NavBarLeftSection = styled.div`
  font-family: Poppins;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontdark};
  flex: 0 0 50%;
`
export const NavBarRightSection = styled.div`
  font-family: Poppins;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.fontdark};
  flex: 0 0 50%;
`

export const Div = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 400;
`

export const H3 = styled.h3`
  display: block;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #1b1b1b;
`

export const H2 = styled.h2`
  display: block;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  margin-bottom: 1rem;
`

export const Span = styled.span`
  display: inline-block;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #656565;
`

export const DashBoardWidget = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 21.2rem;
  padding: 1.6rem;
  margin: 0 1.5rem 1.5rem 0;
  background: #ffffff;
  box-shadow: 1px 6px 40px rgb(0 0 0 / 6%);
  border-radius: 6px;
  white-space: nowrap;
  // @media (max-width: 1366px) {
  //   width: 11.5em !important;
  // }
  // @media screen and (min-width: 1366px) and (max-width: 1625px) {
  //   width: 15em !important;
  // }
  // @media screen and (min-width: 1625px) and (max-width: 1717px) {
  //   width: 16em !important;
  // }
  // @media screen and (min-width: 1480px) and (max-width: 1517px) {
  //   width: 14.5em !important;
  // }
`

export const Widget = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

export const DashBoardWidgetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

interface IIcon {
  backgroundColor: string
}

export const Icon = styled.img<IIcon>`
  height: 24px;
  width: 24px;
`
interface IIconWrapper {
  backgroundColor: string
}
export const IconWrapper = styled.div<IIconWrapper>`
  margin-bottom: 2.1rem;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 50%;
  background: ${(props) => colorSelector[`${props.backgroundColor}`]};
`

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0;
  margin-top: 1.4rem;
  justify-content: space-between;
`

export const LeftWrapper = styled.div`
  flex: 0 0 49%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 1px 6px 40px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  width: 49%;
  padding: 2rem;
`

export const GraphHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
`

export const GraphHeaderTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #0c0c0c;
`

export const DateSelectBox = styled.select`
  padding: 1rem 3.7rem 1rem 1.5rem;
  height: fit-content;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 7px;
  font-family: Inter;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.6rem center;
  background-size: 1.5rem;
`

export const Label = styled.span`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  color: #0c0c0c;
  padding-right: 2rem;
`

export const RightWrapper = styled.div`
  flex: 0 0 49%;
  background: #ffffff;
  box-shadow: 1px 6px 40px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  width: 49%;
  padding: 2rem;
`

export const FullPageLoader = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
