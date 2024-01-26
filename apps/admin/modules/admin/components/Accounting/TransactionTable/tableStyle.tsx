import styled from 'styled-components'
import Styled from 'styled-components'

export const Container = Styled.div`
    background: #FFFFFF;
    flex: 0 0 33%;
    box-shadow: 1px 6px 40pxrgba(0,0,0,0.06);
    border-radius: 7px;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  
`
export const Container__1 = Styled.div`
    display: flex;
    flex: 0 0 48%;
    background: #FFFFFF;
    box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
    border-radius: 8px;
    flex-direction: column;
    justify-content: space-around;
`

export const Container__2 = Styled.div`
    display: flex;
    flex: 0 0 48%;
    background: #FFFFFF;
    box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
    border-radius: 8px;
    flex-direction: column;
    justify-content: space-around;
    padding: 4.9rem 2.2rem;
`
export const Amount = Styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
`

export const Header = Styled.div`
  display: flex;
  flex-direction: column;
`

export const Body = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const HeaderTitle = Styled.h3`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #0C0C0C;
  margin-bottom: 4rem;
`

export const DateSelectBox = Styled.select`
  width: 115px;
  height: 40px;
  left: calc(50% - 115px / 2 + 65.5px);
  top: 400px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 7px;
  font-size:14px
`

export const TabMenu = Styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3.4rem;
`

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  height: 40px;
`
export const Tabs = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 30%;
`

interface ITabList {
  active: boolean
  width: string
}

export const TabList = Styled.li<ITabList>`
    color: ${(props) => (props.active ? '#000000' : '#9B9B9B')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    max-width: 104px;
    min-width: 55px;    
    display: flex;
    justify-content: flex-start;
    font-family: 'Inter';
    font-weight: 500;
    font-size: 16px;
    line-height: 111.5%;
    padding-right: 27px;
    margin-right: 1em;
    width: ${(props) => props.width};
`

export const TabBox = Styled.ul`
    display: flex;
    list-style: none;
    font-size: 18px;
    padding: 0;
    margin: 0;
`

export const VerticalBar = Styled.div`
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, #2A9BD3 1.52%, #30599C 100%);
    border-radius: 5px;
    margin-top: 11px;
`

export const StatusCircle = Styled.div`
    height: 9px;
    width: 9px;
    background: #39B200;
    border-radius: 50%;
    margin-right:5px;
`

export const FlexRow = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`

export const StatusText = Styled.div`
    font-family: Inter;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0em;
    text-align: left;
`

export const ArtImage = Styled.img`
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;

`

export const Label = Styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #131313;
   
`
export const Label_1 = Styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #131313;
   
`

export const WebHref = Styled.a`
  text-decoration: none;
`

export const VideoWrapper = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
`

