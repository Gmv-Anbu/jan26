import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button'
import Icon from '@apps/customer/modules/shared/components/icon/icon'

const MainContainer = styled.div`
  width: 100%;
  margin: 20rem 0;
  @media screen and (max-width: 767px) {
    margin: 13rem 0;
   
  }
`
const WrapperContainer = styled.div`
    width: 100%;
    max-width: 112rem;
    margin: 0 auto;
    @media screen and (max-width: 1360px) {
        max-width: 118rem;
    }
    @media screen and (max-width: 1199px) {
        max-width: 114rem;
    }
    @media screen and (max-width: 991px) {
        max-width: 96rem;
    }
    @media screen and (max-width: 767px) {
        max-width: 72rem;
        padding: 0px 24px;
    }
    @media screen and (max-width: 575px) {
        max-width: 54rem;
    }
    h1 {
        color: #111727;
        margin-bottom: 15px;
    }
`
const TableContainer = styled.div`
    table {
        width: 100%;
        border-spacing: 0 5px;
        user-select: none;
    }
    th, td {
        padding: 25px 30px;
        text-align: left;
    }
    td {
        font-size: 16px;
        font-weight: 600;
        line-height: 26px;
        color: #000000;
        background: #F4F9F9;
    }
    th {
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
    }
    .fa-up {
        transform: rotate(180deg);
    }
    tr {
        th:nth-child(2), th:nth-child(3) {
            text-align: center;
        }
        td:nth-child(2), td:nth-child(3) {
            text-align: center;
        }
    }
    .inner-table {
        background: #FFFFFF;
        tr, td {
            background: #FFFFFF;
        }
        th:nth-child(1), td:nth-child(1) {
            text-align: center;
        }
        .d-flex-aic {
            display: flex;
            align-items: center;
            p {
                margin: 0 0 0 10px;
                font-size: 13px;
                font-weight: 600;
                line-height: 18px;
                .used {
                    color: #FF0D0D;
                }
                .available {
                    color: #26B267;
                }
            }
        }
    }
`
const TableTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    h3 {
        font-size: 32px;
        font-weight: 500;
        line-height: 33px;  
        text-transform: uppercase;      
    }
`
const FaqContent = styled.tr`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 120%;
    padding-bottom: 14px;
  }
  p {
    color: ${({ theme }) => theme.colors.fontGray};
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    max-width: 80%;
  }
  span {
    width: 16px;
    margin-top: -3px;
    margin-left: 4px;
  }
  svg {
    margin-top: 8px;
    cursor: pointer;
  }
  @media screen and (max-width: 549px) {
    padding: 32px 0 29px;
    p{
      max-width: 98%;
    }
  }
`

const faqContent = [
    {
      type: 'Small',
      avBoxes: 2,
      usedBoxes: 1,
      dimension: '60cm x 20cm x 20cm, 10 KG',
      content: 'A watch NFT platform is a platform that allows users to buy, sell and transfer unique watches that are stored on a blockchain as non-fungible tokens (NFTs).',
    },
    {
        type: 'Medium',
        avBoxes: 3,
        usedBoxes: 1,
        dimension: '60cm x 25cm x 25cm, 30KG',
        content: 'A watch NFT platform is a platform that allows users to buy, sell and transfer unique watches that are stored on a blockchain as non-fungible tokens (NFTs).',
      },
      {
        type: 'Large',
        avBoxes: 3,
        usedBoxes: 1,
        dimension: '60cm x 40cm x 40cm, 80KG',
        content: 'A watch NFT platform is a platform that allows users to buy, sell and transfer unique watches that are stored on a blockchain as non-fungible tokens (NFTs).',
      },
]

const NoSafetyBox = () => {

    const [tab, setTab] = useState(1)
    const [show, setShow] = useState<string | number>(0)

    const renderFaq = useMemo(() => (
        faqContent.slice(0)
        .map((each, index) => (
            <>
                <FaqContent onClick={() => (show === index ? setShow('') : setShow(index))} key={index} className={"no-border"}>
                    <td>{each.type}</td>
                    <td>{each.avBoxes}</td>
                    <td>{each.usedBoxes}</td>
                    <td>{each.dimension}</td>
                    <td width="90px"><Image className={show === index ? 'fa-up' : 'fa-down'} src="/svgs/table-arrow-down.svg" width='24' height='24' /></td>
                </FaqContent>
                {show === index 
                ? <tr>
                    <td colSpan={5}>
                        <div className='inner-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl no</th>
                                        <th>Box no.</th>
                                        <th>Purchase date</th>
                                        <th>Expiry Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>122</td>
                                        <td>23 Dec 2022</td>
                                        <td>23 Dec 2022</td>
                                        <td><div className='d-flex-aic'><Image src="/svgs/approved.svg" width='16' height='16' /><p className='available'>Available</p></div></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>213</td>
                                        <td>02 Dec 2022</td>
                                        <td>02 Dec 2023</td>
                                        <td><div className='d-flex-aic'><Image src="/svgs/approved.svg" width='16' height='16' /><p className='available'>Available</p></div></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>256</td>
                                        <td>16 July 2022</td>
                                        <td>16 July 2023</td>
                                        <td><div className='d-flex-aic'><Image src="/svgs/approved.svg" width='16' height='16' /><p className='available'>Available</p></div></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>134</td>
                                        <td>23 Dec 2022</td>
                                        <td>23 Dec 2023</td>
                                        <td><div className='d-flex-aic'><Image src="/svgs/used.svg" width='16' height='16' /><p className='used'>Used</p></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr> 
                : null}
            </>
        ))
      ),[show]) 

    return (
        <MainContainer>
            <WrapperContainer>
                <TableTitle>
                    <h3>My Safety box</h3>
                    <ButtonPrimary>Buy</ButtonPrimary>
                </TableTitle>
                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Available boxes(8)</th>
                                <th>Used boxes(3)</th>
                                <th>Dimension</th>
                                <th>&nbsp; &nbsp; </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderFaq.length > 0 ? renderFaq : <h4>No questions found!</h4>}
                        </tbody>
                    </table>
                </TableContainer>
            </WrapperContainer>
        </MainContainer>
    )
}

export default NoSafetyBox