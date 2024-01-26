import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import API from '../../api/admin'

import AdminLayout from '../../modules/admin/components/layout/layout'
import SubHeader from '../../modules/admin/components/subHeader'
import ChartTransaction from '../../modules/admin/components/charts/transactions'
import TransactionTable from '../../modules/admin/components/Accounting/TransactionTable'
import { APP_ENV } from '../../config'
import { abbreviateNumber } from '../../utils/format'
import CommissionUpdateModal from '../../modules/admin/accounting/CommissionUpdateModal'
import ArtWorkFilterModel from '@apps/admin/modules/admin/artwork/artWorkFilterModel'
import FilterModel from '@apps/admin/modules/admin/modal/userFilterModel'
import {   H3,
  H2,
  Span,
  DashBoardWidget,
  Widget,
} from '@apps/admin/modules/admin/styled-components/dashboardStyle'

const meta = {
  title: 'NFT2.0 | Admin Artwork Listing',
  description: 'Admin Artwork Listing for NFT',
}

const WidgetColorsTop = ['pendingTransactions', 'allTransactions', 'royaltyCommission']

const WidgetColorsBottom = ['artistTransactions', 'userTransactions', 'platformCommission']

const colorSelector = {
  pendingTransactions: 'rgba(255, 178, 59, 0.2)',
  allTransactions: 'rgba(113, 97, 212, 0.24)',
  royaltyCommission: '#EDFBFF',
  artistTransactions: ' #FCE8FF;',
  userTransactions: 'rgba(56, 93, 255, 0.17)',
  platformCommission: '#EEFFF8;',
  revenueGenerated: '#DDE3FF;',
}

// File image filepath of widget tiles
const widgetImageFilePath = {
  pendingTransactions: 'dollar.svg',
  allTransactions: 'collection.svg',
  royaltyCommission: 'royality.svg',
  artistTransactions: 'artist.svg',
  userTransactions: 'user.svg',
  platformCommission: 'platform.svg',
}

// File image filepath of widget tiles
const widgetSubText = {
  pendingTransactions: 'Pending Payment (Last 2 Hours)',
  allTransactions: 'All transactions',
  royaltyCommission: 'Royality Commission',
  artistTransactions: 'Artist Transactions',
  userTransactions: 'User Transactions',
  platformCommission: 'Platform Commission',
}

const WidetBoard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1.3em;
`

const LeftBoard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  background: #ffffff;
  box-shadow: 1px 6px 40px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  flex: 0 0 39.5%;
  height: 310px;
`

const RightBoard = styled.div`
  border-radius: 6px;
  flex: 0 0 59.5%;
  height: 280px;
  width: 59.5%;
  gap: 1.2em;
  height: 326px;
  padding-top: 0.8rem;
`
const TopTile = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
  background: #ffffff;
  width: 100%;
  height: 55%;
`
const BottomTile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #ffffff;
  width: 100%;
  height: 100%;
`

interface ILargeIconWrapper {
  backgroundColor: string
}

const LargeIconWrapper = styled.div<ILargeIconWrapper>`
  margin-left: 0.8em;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 50%;
  background: ${(props) => colorSelector[`${props.backgroundColor}`]};
  margin-left: 1.4em;
  margin-top: 0.9em;
`

const LargeIcon = styled.img`
  height: 24px;
  width: 24px;
`

interface IIcon {
  backgroundColor: string
}
const Icon = styled.img<IIcon>`
  height: 20px;
  width: 20px;
`
interface IIconWrapper {
  backgroundColor: string
}
const IconWrapper = styled.div<IIconWrapper>`
  margin-bottom: 2.1rem;
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: 50%;
  background: ${(props) => colorSelector[`${props.backgroundColor}`]};
`

const WidgetLabel = styled.div`
  display: inline-block;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #656565;
  margin-left: 1.5em;
  opacity: 0.6;
`

const WidgetAmount = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  margin-left: 0.6em;
  /* identical to box height */

  color: #001c35;
`

const WidgetAmountSmall = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 44px;
  margin-left: 0.6em;
  /* identical to box height */

  color: #001c35;
`

const BottomWidget = styled.div`
  flex: 0 0 49%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Divider = styled.hr`
  display: block;
  height: 80px;
  border: 0;
  border: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
`

//Graph styles
const GraphWrapper = styled.div`
  display: block;
  min-height: 300px;
  background-color: #fff;
  background: #ffffff;
  box-shadow: 0px 7px 30px rgb(0 0 0 / 5%);
  border-radius: 10px;
  margin-top: 2rem;
  padding: 2rem;
`

const TableWrapper = styled.div`
  display: block;
  min-height: 300px;
  background-color: #fff;
  background: #ffffff;
  box-shadow: 0px 7px 30px rgb(0 0 0 / 5%);
  border-radius: 10px;
  margin-top: 2em;
`
const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  column-gap: 14px;
`
const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  column-gap: 14px;
  padding-top: 1rem;
`

export const DashBoardWidgetComponent = (props) => {
  const { color, count } = props

  return (
    <>
      <DashBoardWidget>
        <Widget>
          <IconWrapper backgroundColor={color}>
            <Icon src={`/svgs/adminDashboardIcons/${widgetImageFilePath[color]}`} backgroundColor={color}></Icon>
          </IconWrapper>
          <H2>
            {count ? abbreviateNumber(count) : '0'} {APP_ENV.BASE_CURRENCY_CODE}
          </H2>
          <Span>{widgetSubText[color]}</Span>
        </Widget>
      </DashBoardWidget>
    </>
  )
}

const AccountManagment: NextPage = () => {
  const [widgetData, setWidgetData] = useState<any>([])
  const [widgetDateSelect, setWidgetDateSelect] = useState<any>(null)
  const [commissionModal, setCommissionModal] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [purpose,setPurpose]=useState("")
  const [filter,setFilter]=useState(null)
  const [filterData, setFilterData] = useState({
    from: '',
    to: '',
    saleType: '',
  })

  const applyFilter = (data: any) => {
    setPurpose("filter")
    setFilter(filterData)
  }

  const resetFilter = () => {
    let x = { from: null, to: null, saleType: null }
    setFilterData(x)
    setFilter(x)
    setPurpose("")
    setModalOpen(false)
  }

  // Common function to get startdate, enddate and groupby for date select box
  const getGraphDateFilters = (type = 'year') => {
    let startDate: any, endDate: any, groupby: string
    const today: any = moment()
    switch (type) {
      case 'week':
        startDate = moment(today.startOf('week')).format('L')
        endDate = moment(today.endOf('week')).format('L')
        groupby = 'day'
        break

      case 'month':
        startDate = moment().startOf('month').format('L')
        endDate = moment().endOf('month').format('L')
        groupby = 'week'
        break
      case 'year':
        startDate = moment().startOf('year').format('L')
        endDate = moment().endOf('year').format('L')
        groupby = 'day'
        break

      case 'day':
        startDate = moment().startOf('day').format('L');
        endDate = moment().endOf('day').format('L');
        groupby = 'day';
        break;

      default:
        startDate = moment().startOf('year').format('L')
        endDate = moment().endOf('year').format('L')
        groupby = 'day'
        break
    }
    return { startDate, endDate, groupby }
  }

  // To get widget tile data
  const getWidgetInfo = () => {
    const { startDate, endDate } = getGraphDateFilters(widgetDateSelect)

    const query = `?start=${startDate}&end=${endDate}`
    API.getAccountingWidgetInfo(query)
      .then((res) => {
        if (res?.data?.data) {
          setWidgetData(res?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getWidgetInfo()
  }, [widgetDateSelect])

  return (
    <>
      {commissionModal && <CommissionUpdateModal setCommissionModal={setCommissionModal} />}
      {modalOpen == true && <FilterModel
          data={filterData}
          setFilterData={setFilterData}
          onApplyFilter={applyFilter}
          setOpenModal={setModalOpen}
          onResetFilter={resetFilter}
        ></FilterModel>}
      <AdminLayout meta={meta} pageTitle={`Accounting`}>
        <>
          <section>
            <SubHeader heading={`Accounting status`} subText={`View aggregated data of the account Status`} setWidgetDateSelect={(value) => setWidgetDateSelect(value)} actionTxt={'Update Commission'} buttonAction={() => setCommissionModal(true)} />
          </section>
          <section>
            <WidetBoard>
              <LeftBoard>
                <TopTile>
                  <LargeIconWrapper backgroundColor={`revenueGenerated`}>
                    <LargeIcon src="/svgs/accounting/trending.svg" alt="revenue" />
                  </LargeIconWrapper>
                  <WidgetAmount>
                    {widgetData?.revenue ? abbreviateNumber(widgetData?.revenue) : '0'} {APP_ENV.BASE_CURRENCY_CODE}
                  </WidgetAmount>
                  <WidgetLabel>Revenue generate</WidgetLabel>
                </TopTile>
                <BottomTile>
                  <BottomWidget>
                    <WidgetAmountSmall>
                      {widgetData?.inbound ? abbreviateNumber(widgetData?.inbound) : '0'} {APP_ENV.BASE_CURRENCY_CODE}
                    </WidgetAmountSmall>
                    <WidgetLabel>Inbound</WidgetLabel>
                  </BottomWidget>
                  <Divider></Divider>
                  <BottomWidget>
                    <WidgetAmountSmall>
                      {widgetData?.commission ? abbreviateNumber(widgetData?.commission) : '0'} {APP_ENV.BASE_CURRENCY_CODE}
                    </WidgetAmountSmall>
                    <WidgetLabel>Commission</WidgetLabel>
                  </BottomWidget>
                </BottomTile>
              </LeftBoard>
              <RightBoard>
                {' '}
                <TopSection>
                  {WidgetColorsTop?.map((widgetColor) => (
                    <DashBoardWidgetComponent key={`${widgetColor}`} color={`${widgetColor}`} count={widgetData[widgetColor]} />
                  ))}
                </TopSection>
                <BottomSection>
                  {' '}
                  {WidgetColorsBottom?.map((widgetColor) => (
                    <DashBoardWidgetComponent key={`${widgetColor}`} color={`${widgetColor}`} count={widgetData[widgetColor]} />
                  ))}
                </BottomSection>
              </RightBoard>
            </WidetBoard>
          </section>
          <section>
            <GraphWrapper>
              <ChartTransaction />
            </GraphWrapper>
          </section>
          <section>
            <TableWrapper>
              <TransactionTable clicked={setModalOpen} filterData={filter} purpose={purpose}/>
            </TableWrapper>
          </section>
        </>
      </AdminLayout>
    </>
  )
}

export default AccountManagment
