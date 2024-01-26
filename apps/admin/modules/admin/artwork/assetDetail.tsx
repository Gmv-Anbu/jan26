import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import AdminLayout from '../components/layout/layout'
import { ButtonPrimary } from '../../shared/components/button/button'
import InputText from '../../shared/components/formInputs/inputText'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import API from '../../../api/admin'
import { TableWarpper, Table, TableHead, TableBody, TableRow, TableTH, TableTD, FlexCenter, TableImgWrapper } from '../styled-components/tableStyle'

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .add_icon {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  width: 70%;
  justify-content: flex-end;
`
const Button1 = styled.button`
  display: flex;
  border-radius: 5px;
  max-width: 125px;
  width: 100%;
  border: 1px solid #2d5b9a8f;
  justify-content: center;
  align-items: center;
  height: 34px;
  color: #23487b;
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 15px;
  cursor: pointer;
`
const Button2 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  color: #fff;
  max-width: 82px;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  img {
    padding-right: 5px !important;
  }
`
const HeaderLink = styled.a`
  width: 30%;
  position: relative;
  padding-left: 33px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    border: solid #141415;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    background: #e7e7e7;
    width: 23px;
    height: 23px;
    border-radius: 4px;
  }
`
const AssetCardWrap = styled.div`
  display: flex;
  margin-top: 20px;
`
const AssetCardLeft = styled.div`
  display: flex;
  width: 658px;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 2rem;
  margin-right: 10px;
`
const AssetCardRight = styled.div`
  width: calc(100% - 658px);
  background: #ffffff;
  box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  margin-left: 10px;
`
const AssetCardTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
`
const AssetCardDesc = styled.div`
  padding-left: 20px;
`
const DateDesc = styled.span`
  color: #a0a0a0;
  font-size: 1.4rem;
`
const CardProfWrap = styled.div`
  display: flex;
  padding: 22px 0 20px;
`

const CardProfDesc = styled.div`
  padding-left: 18px;
`

const CardProfName = styled.h6`
  color: #5d5d5d;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 16px;
`
const CardProfEmail = styled.a`
  font-size: 1.4rem;
  font-weight: 500;
`
const TimerListWrap = styled.ul`
  display: flex;
  list-style: none;
`
const TimerListEach = styled.li`
  background: #f4f8ff;
  border-radius: 2px;
  padding: 1.3rem;
  margin-right: 10px;
  color: #0c5190;
  font-weight: 500;
  font-size: 1.8rem;
`
const HighSaleListHead = styled.h4`
  margin: 2rem 2rem 0;
  font-weight: 400;
  font-size: 1.6rem;
  border-bottom: 1.5px solid #eaeaea;
  padding-bottom: 16px;
`
const HighSaleListWrap = styled.ul`
  list-style: none;
`
const HighSaleListEach = styled.li`
  display: flex;
  padding: 1.6rem 2rem;
  &:nth-child(even) {
    background: #ffffff;
    box-shadow: 0px 6px 52px -4px rgba(22, 27, 37, 0.12);
    border-radius: 6px;
  }
`
const HighSaleUserName = styled.span`
  padding: 0 10px 0 18px;
  width: 205px;
  font-size: 1.4rem;
`
const HighSaleAmntEth = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  width: 90px;
`
const HighSaleAmntDollar = styled.span`
  font-size: 1.4rem;
  color: #666666;
`
const AssetTabWrap = styled.div`
  background: #ffffff;
  box-shadow: 5px 0px 17px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  margin-top: 20px;
  padding: 3.5rem 2.5rem;
`
const TabListWrap = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 50px;
`
const TabListeach = styled.li`
  margin-right: 47px;
`
const TabListlink = styled.a`
  font-weight: 500;
  font-size: 1.6rem;
  color: #9b9b9b;
  cursor: pointer;
`
const TabContent = styled.div`
  &.tab2,
  &.tab3 {
    display: none;
    .pd-0 {
      padding: 0;
    }
  }
`
const TabAboutListWrap = styled.ul`
  list-style: none;
`
const TabAboutListEach = styled.li`
  display: flex;
  background: #fafafa;
  border-radius: 4px;
  margin-bottom: 2px;
  padding: 1.8rem 1.1rem;
`
const TabAboutListHead = styled.span`
  color: #615e5e;
  font-size: 1.4rem;
  width: 200px;
`
const TabAboutListDesc = styled.span`
  font-size: 1.4rem;
`
const InnerTabWrap = styled.div`
  display: flex;
`
const InnerTabLeft = styled.div`
  width: 48%;
  padding-right: 10px;
`
const InnerTabRight = styled.div`
  width: 48%;
  padding-left: 10px;
  .tab-table-common {
    table {
      border-collapse: collapse;
    }
    th {
      border-bottom: 0;
      padding: 1.2rem 0;
      font-size: 1.4rem;
      min-width: inherit;
      &:first-child {
        padding-left: 3rem;
      }
      &:last-child {
        padding-right: 3rem;
      }
    }
    td {
      border-bottom: 1.5px solid #eaeaea;
      padding: 2rem 0;
      font-size: 1.4rem;
      img,
      span {
        vertical-align: middle;
      }
      span {
        margin-right: 10px !important;
        height: 24px !important;
        width: 24px !important;
      }
      &:first-child {
        padding-left: 3rem;
      }
      &:last-child {
        padding-right: 3rem;
      }
    }
    tr:last-child {
      td {
        border-bottom: 0;
      }
    }
    .table-head-row {
      background: #fafafa;
    }
    &.tab2-table {
    }
  }
`
const InnerTabTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 16px;
`
const TabBox = styled.div`
  border: 1.5px solid #eaeaea;
  border-radius: 6px;
  padding: 2rem;
  min-height: 313px;
`

const EditFormWrapper = styled.label`
  display: flex;
  flex-wrap: wrap;
  background: #fafafa;
  border-radius: 4px;
  padding: 2rem;
  input,
  textarea {
    border: 1px solid #bac6d9 !important;
    border-radius: 6px !important;
    background: #ffffff !important;
    font-size: 1.4rem !important;
    font-weight: 400 !important;
    color: #000 !important;
  }
  label {
    font-size: 1.4rem !important;
    font-weight: 400 !important;
  }
  input {
    height: 40px !important;
  }
  textarea {
    resize: none;
    height: 134px !important;
  }
`

const InputWrap = styled.label`
  width: 33.33%;
  padding: 0 8px;
`
const AssetListing: NextPage = () => {
  const meta = {
    title: 'NFT2.0 | Admin Artwork Listing',
    description: 'Admin Artwork Listing for NFT',
  }

  return (
    <AdminLayout meta={meta} pageTitle={`Asset Listing`}>
      <SpaceBetween>
        <HeaderLink>Back</HeaderLink>
        <ButtonGroup>
          <Button1 className="btn_deactivate">Deactivate</Button1>
          <Button2 className="btn_edit">
            <Image src={`/svgs/icons/edit.svg`} alt={`edit`} width="12px" height="12px" />
            Edit
          </Button2>
        </ButtonGroup>
      </SpaceBetween>
      <AssetCardWrap>
        <AssetCardLeft>
          <Image src={`/images/Admin/card-img.png`} alt={`card`} width="165px" height="191px" />
          <AssetCardDesc>
            <AssetCardTitle>{`CONSCIOUS" (NFT + Physical)`}</AssetCardTitle>
            <DateDesc>Created on : 21/06/1999</DateDesc>
            <CardProfWrap>
              <Image src={`/images/admin/avatar.png`} alt={`user`} width="40" height="40" />
              <CardProfDesc>
                <CardProfName>Artist</CardProfName>
                <CardProfEmail>@jonraf_wavakazi</CardProfEmail>
              </CardProfDesc>
            </CardProfWrap>
            <TimerListWrap>
              <TimerListEach>07h</TimerListEach>
              <TimerListEach>32m</TimerListEach>
              <TimerListEach>58s</TimerListEach>
            </TimerListWrap>
          </AssetCardDesc>
        </AssetCardLeft>
        <AssetCardRight>
          <HighSaleListHead>Top 3 Highest Sales</HighSaleListHead>
          <HighSaleListWrap>
            <HighSaleListEach>
              <Image src={`/images/admin/avatar.png`} alt={`user`} width="24" height="24" />
              <HighSaleUserName>richard Philip</HighSaleUserName>
              <HighSaleAmntEth>0.036 ETH</HighSaleAmntEth>
              <HighSaleAmntDollar>$ 1,957 </HighSaleAmntDollar>
            </HighSaleListEach>
            <HighSaleListEach>
              <Image src={`/images/admin/avatar.png`} alt={`user`} width="24" height="24" />
              <HighSaleUserName>Albert Augustine</HighSaleUserName>
              <HighSaleAmntEth>0.036 ETH</HighSaleAmntEth>
              <HighSaleAmntDollar>$ 1,957 </HighSaleAmntDollar>
            </HighSaleListEach>
            <HighSaleListEach>
              <Image src={`/images/admin/avatar.png`} alt={`user`} width="24" height="24" />
              <HighSaleUserName>r@Philip Colbert</HighSaleUserName>
              <HighSaleAmntEth>0.036 ETH</HighSaleAmntEth>
              <HighSaleAmntDollar>$ 1,957 </HighSaleAmntDollar>
            </HighSaleListEach>
          </HighSaleListWrap>
        </AssetCardRight>
      </AssetCardWrap>
      <AssetTabWrap>
        <TabListWrap>
          <TabListeach>
            <TabListlink>About</TabListlink>
          </TabListeach>
          <TabListeach>
            <TabListlink>Asset History</TabListlink>
          </TabListeach>
          <TabListeach>
            <TabListlink>Bids Placed</TabListlink>
          </TabListeach>
        </TabListWrap>
        <TabContent className="tab1">
          <TabAboutListWrap>
            <TabAboutListEach>
              <TabAboutListHead>Type</TabAboutListHead>
              <TabAboutListDesc>Auction</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Reserved Price</TabAboutListHead>
              <TabAboutListDesc>1.1818 ETH ($2,953.74)</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Quantity</TabAboutListHead>
              <TabAboutListDesc>1</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Royalties</TabAboutListHead>
              <TabAboutListDesc>10%</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Category</TabAboutListHead>
              <TabAboutListDesc>Painting</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Collection</TabAboutListHead>
              <TabAboutListDesc>Painting</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Current Bid</TabAboutListHead>
              <TabAboutListDesc>USD Infinity (15.8986 VLX)</TabAboutListDesc>
            </TabAboutListEach>
            <TabAboutListEach>
              <TabAboutListHead>Short Description</TabAboutListHead>
              <TabAboutListDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TabAboutListDesc>
            </TabAboutListEach>
          </TabAboutListWrap>
          <EditFormWrapper>
            <InputWrap>
              <InputText type="text" label={`Type`} value="" name="" className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputText label={`Reserved Price`} value="" name="" className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputText label={`Quantity`} value="" name="" className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputText label={`Royalties`} value="" name="" className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputText label={`Category`} value="" name="" className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputText label={`Collection`} value="" name="" className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputTextarea label={`Short Description`} className="common-field" />
            </InputWrap>
            <InputWrap>
              <InputText label={`Current Bid`} value="" name="" className="common-field" />
            </InputWrap>
          </EditFormWrapper>
        </TabContent>
        <TabContent className="tab2">
          <InnerTabWrap>
            <InnerTabLeft>
              <InnerTabTitle>Price History</InnerTabTitle>
              <TabBox>Graph</TabBox>
            </InnerTabLeft>
            <InnerTabRight>
              <InnerTabTitle>Activity History</InnerTabTitle>
              <TabBox className="pd-0">
                <TableWarpper className="tab-table-common tab2-table">
                  <Table>
                    <TableHead>
                      <TableRow className="table-head-row">
                        <TableTH>Activity</TableTH>
                        <TableTH>User</TableTH>
                        <TableTH>Amount</TableTH>
                        <TableTH>Date</TableTH>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableTD>Bought by</TableTD>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                      <TableRow>
                        <TableTD>Sold to</TableTD>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                      <TableRow>
                        <TableTD>Bought by</TableTD>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                      <TableRow>
                        <TableTD>Sold to</TableTD>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableWarpper>
              </TabBox>
            </InnerTabRight>
          </InnerTabWrap>
        </TabContent>
        <TabContent className="tab3">
          <InnerTabWrap>
            <InnerTabLeft>
              <InnerTabTitle>Bid Analytics</InnerTabTitle>
              <TabBox>Graph</TabBox>
            </InnerTabLeft>
            <InnerTabRight>
              <InnerTabTitle>Bid History</InnerTabTitle>
              <TabBox className="pd-0">
                <TableWarpper className="tab-table-common tab2-table">
                  <Table>
                    <TableHead>
                      <TableRow className="table-head-row">
                        <TableTH>User</TableTH>
                        <TableTH>Bid Amount</TableTH>
                        <TableTH>Date</TableTH>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                      <TableRow>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                      <TableRow>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                      <TableRow>
                        <TableTD>
                          <Image src={`/images/admin/avatar.png`} alt="Img" width="24" height="24" objectFit="cover" />
                          @Philip Colbert
                        </TableTD>
                        <TableTD>$ 1,957</TableTD>
                        <TableTD>23/10/21</TableTD>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableWarpper>
              </TabBox>
            </InnerTabRight>
          </InnerTabWrap>
        </TabContent>
      </AssetTabWrap>
    </AdminLayout>
  )
}

export default AssetListing
