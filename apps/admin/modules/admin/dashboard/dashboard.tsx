import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import API from '../../../api/admin'
import { APP_ENV } from '../../../config'
import moment from 'moment'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import {
  DashBoardNavBar,
  NavBarLeftSection,
  NavBarRightSection,
  Div,
  H3,
  H2,
  Span,
  DashBoardWidget,
  Widget,
  DashBoardWidgetWrapper,
  Icon,
  IconWrapper,
  GraphWrapper,
  LeftWrapper,
  GraphHeader,
  GraphHeaderTitle,
  DateSelectBox,
  Label,
  RightWrapper,
  FullPageLoader,
} from '../styled-components/dashboardStyle'
import { Line, Bar } from 'react-chartjs-2'
import { abbreviateNumber } from '../../../utils/format'
import { Loader } from '../../shared/components/Loader'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

// Color store to set tile-widget background color
const WidgetColors = ['revenue', 'assetCount', 'userCount', 'creatorCount', 'collectionCount', 'visitorsCount', 'purchaseCount']

export const colorSelector = {
  revenue: 'rgba(255, 178, 59, 0.2)',
  assetCount: 'rgba(35, 217, 173, 0.18)',
  userCount: 'rgba(56, 93, 255, 0.17)',
  creatorCount: '#FCE8FF',
  collectionCount: 'rgba(113, 97, 212, 0.24)',
  visitorsCount: 'rgba(56, 93, 255, 0.17)',
  purchaseCount: 'rgba(255, 178, 59, 0.2)',
}

// File image filepath of widget tiles
export const widgetImageFilePath = {
  revenue: 'dollar.svg',
  assetCount: 'image.svg',
  userCount: 'user.svg',
  creatorCount: 'artist.svg',
  collectionCount: 'collection.svg',
  visitorsCount: 'user.svg',
  purchaseCount: 'dollar.svg',
}

// File image filepath of widget tiles
export const widgetSubText = {
  revenue: 'Total Revenue',
  assetCount: 'Artworks',
  userCount: 'Total Users',
  creatorCount: 'Total Artists',
  collectionCount: 'Total Collection',
  visitorsCount: 'Total site visitors',
  purchaseCount: 'Total purchase orders ',
}

export const options = {
  plugins: {
    legend: false, // Hide legend
  },
}

export const DashBoardWidgetComponent = (props) => {
  const { color, unit, count } = props

  return (
    <>
      <DashBoardWidget>
        <Widget>
          <IconWrapper backgroundColor={color}>
            <Icon src={`/svgs/adminDashboardIcons/${widgetImageFilePath[color]}`} backgroundColor={color}></Icon>
          </IconWrapper>
          <H2>
            {color == 'revenue'
              ? count && abbreviateNumber(count)
              : count &&
                new Intl.NumberFormat('en-NZ', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(count)}{' '}
            {color == 'revenue' ? APP_ENV.BASE_CURRENCY_CODE : null}
          </H2>
          <Span>{widgetSubText[color]}</Span>
        </Widget>
      </DashBoardWidget>
    </>
  )
}

const AnalyticsDashboard: NextPage = () => {
  const [widgetDateSelect, setWidgetDateSelect] = useState<string>('year')
  const [revenueDateSelect, setRevenueDateSelect] = useState<string>('year')
  const [purchaseDateSelect, setPurchaseDateSelect] = useState<string>('year')
  const [visitorsDateSelect, setVisitorsDateSelect] = useState<string>('year')
  const [usersDateSelect, setUsersDateSelect] = useState<string>('year')
  const [widgetData, setWidgetData] = useState<any>([])
  const [loader, setLoader] = useState<boolean>(true)
  const [lineChartData, setLineChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [33, 53, 85, 41, 44, 65, 12, 99, 70, 40, 22, 1],
        fill: false,
        backgroundColor: '#10B5E6',
        borderWidth: 2,
        borderColor: '#10B5E6',
        stepped: false,
        tension: 0.3,
        pointRadius: 1,
      },
    ],
  })

  const [barChartData, setBarChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Purchase History',
        barThickness: 12,
        data: [33, 53, 85, 41, 44, 65, 12, 99, 70, 40, 22, 1],
        backgroundColor: '#385DFF',
        borderRadius: '50',
        borderWidth: '1',
      },
    ],
  })

  const [visitorsChartData, setVisitorsChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        barPercentage: 0.5,
        label: 'Visitors',
        barThickness: 6,
        backgroundColor: '#385DFF',
        maxBarThickness: 8,
        minBarLength: 2,
        data: [33, 53, 85, 41, 44, 65, 12, 99, 70, 40, 22, 1],
      },
    ],
  })

  const [usersChartData, setUsersChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        barPercentage: 0.5,
        label: 'Users',
        barThickness: 6,
        backgroundColor: '#385DFF',
        maxBarThickness: 8,
        minBarLength: 2,
        data: [33, 53, 85, 41, 44, 65, 12, 99, 70, 40, 22, 1],
      },
    ],
  })

  const barOptions = {
    scales: {
      y: {
        grid: {
          borderColor: 'transparent',
          tickColor: 'transparent',
        },
        ticks: {
          callback: function (tickValue, index, ticks) {
            return tickValue
          },
        },
      },
      x: {
        grid: {
          color: 'transparent',
          borderColor: 'transparent',
          tickColor: 'transparent',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''
            // let label = 'Purchase count'

            if (label) {
              label += ': '
            }
            // if (context.parsed.y !== null) {
            //   label += new Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: 'USD',
            //   }).format(context.parsed.y);
            // }
            return label + context.parsed.y
          },
        },
      },
      legend: {
        display: false,
      },
    },
  }

  const lineOptions = {
    plugins: {
      tooltip: {
        backgroundColor: '#FFF',
        titleColor: '#202020',
        bodyColor: '#202020',
        borderColor: 'rgba(0, 0, 0, 1)',
        displayColors: false,
        // yAlign: 'bottom',
        callbacks: {
          label: function (context) {
            // let label = context?.dataset?.label || ''
            // if (label) {
            //   label += ': '
            // }
            const label = context.parsed.y?.toFixed(3) + ` ${APP_ENV.BASE_CURRENCY_CODE}`;
            // if (context.parsed.y !== null) {
            //   label += new Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: 'ETH',
            //     minimumFractionDigits: 4,
            //   }).format(context.parsed.y)
            // }
            return label
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'transparent',
          borderColor: 'transparent',
          tickColor: 'transparent',
        },
      },
      y: {
        grid: {
          borderColor: 'transparent',
          tickColor: 'transparent',
        },
      },
    },
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

      default:
        startDate = moment(today.startOf('week')).format('L')
        endDate = moment(today.endOf('week')).format('L')
        groupby = 'day'
        break
    }
    return { startDate, endDate, groupby }
  }

  // To get widget tile data
  const getWidgetInfo = () => {
    const { startDate, endDate } = getGraphDateFilters(widgetDateSelect)
    const query = `?start=${startDate}&end=${endDate}`
    API.getDashboardInfo(query)
      .then((res) => {
        if (res?.data?.data) {
          setWidgetData(res?.data?.data)
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoader(false)
      })
  }

  // To get Revenue bar graph data
  const getRevenueGraphData = () => {
    const { startDate, endDate, groupby } = getGraphDateFilters(revenueDateSelect)
    const query = `?start=${startDate}&end=${endDate}&groupBy=${groupby}&transactionType=inbound`
    API.getRevenueGraphData(query)
      .then((res) => {
        if (res?.data?.data) {
          const yValue = res?.data?.data?.chart?.map((item) => item?.total_value)
          const xValue = res?.data?.data?.chart?.map((item) => moment(item?.timestamp).format('ll'))
          setLineChartData({
            ...lineChartData,
            datasets: [{ ...lineChartData.datasets[0], data: yValue }],
            labels: xValue,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // To get purchase history line graph data
  const getPurchaseData = () => {
    const { startDate, endDate, groupby } = getGraphDateFilters(purchaseDateSelect)
    const query = `?start=${startDate}&end=${endDate}&groupBy=${groupby}`
    API.getPurchaseGraphData(query)
      .then((res) => {
        if (res?.data?.data) {
          const yValue = res?.data?.data?.chart?.map((item) => item?.count)
          const xValue = res?.data?.data?.chart?.map((item) => moment(item?.timestamp).format('ll')) // D MMM
          setBarChartData({
            ...barChartData,
            datasets: [{ ...barChartData.datasets[0], data: yValue }],
            labels: xValue,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // To get visitors graph data
  const getVisitorsGraphData = () => {
    const { startDate, endDate, groupby } = getGraphDateFilters(visitorsDateSelect)
    const query = `?groupBy=${groupby}&start=${startDate}&end=${endDate}`
    API.getVisitorsGraphData(query)
      .then((res) => {
        if (res?.data?.data) {
          const yValue = res?.data?.data?.chart?.map((item) => item?.count)
          const xValue = res?.data?.data?.chart?.map((item) => moment(item?.timestamp).format('ll'))

          setVisitorsChartData({
            ...visitorsChartData,
            datasets: [{ ...visitorsChartData.datasets[0], data: yValue }],
            labels: xValue,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // To get users graph data
  const getUsersGraphData = () => {
    const { startDate, endDate, groupby } = getGraphDateFilters(usersDateSelect)
    const query = `?groupBy=${groupby}&start=${startDate}&end=${endDate}&role=all`
    API.getUsersGraphData(query)
      .then((res) => {
        if (res?.data?.data) {
          const yValue = res?.data?.data?.chart?.map((item) => item?.count)
          const xValue = res?.data?.data?.chart?.map((item) => moment(item?.timestamp).format('ll'))

          setUsersChartData({
            ...usersChartData,
            datasets: [{ ...usersChartData.datasets[0], data: yValue }],
            labels: xValue,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Run API for Grpah and widget data with dataselect.
  useEffect(() => {
    getRevenueGraphData()
  }, [revenueDateSelect])

  useEffect(() => {
    getPurchaseData()
  }, [purchaseDateSelect])

  useEffect(() => {
    getVisitorsGraphData()
  }, [visitorsDateSelect])
  useEffect(() => {
    getUsersGraphData()
  }, [usersDateSelect])

  useEffect(() => {
    getWidgetInfo()
  }, [widgetDateSelect])

  return (
    <>
      {loader ? (
        <FullPageLoader>
          <Loader width="100" height="60" />
        </FullPageLoader>
      ) : (
        <>
          <DashBoardNavBar>
            <NavBarLeftSection>
              <H3>Platform Analysis</H3>
              <Div>View aggregated data of the platform</Div>
            </NavBarLeftSection>
            <NavBarRightSection>
              <Label>Sort By:</Label>
              <DateSelectBox name="wigetDateSelect" id="wigetDateSelect" onChange={(e) => setWidgetDateSelect(e.target.value)}>
                <option value="year">This year</option>
                <option value="month">This month</option>
                <option value="week">This week</option>
              </DateSelectBox>
            </NavBarRightSection>
          </DashBoardNavBar>
          <DashBoardWidgetWrapper>
            {WidgetColors?.map((widgetColor) => (
              <DashBoardWidgetComponent key={`${widgetColor}`} color={`${widgetColor}`} count={widgetData[widgetColor]} />
            ))}
          </DashBoardWidgetWrapper>
          <GraphWrapper>
            <LeftWrapper>
              <GraphHeader>
                <GraphHeaderTitle>Revenue</GraphHeaderTitle>
                <DateSelectBox name="date" id="revenuDate" onChange={(e) => setRevenueDateSelect(e.target.value)}>
                  <option value="year">This year</option>
                  <option value="month">This month</option>
                  <option value="week">This week</option>
                </DateSelectBox>
              </GraphHeader>
              <Line data={lineChartData} options={lineOptions} />
            </LeftWrapper>
            <RightWrapper>
              <GraphHeader>
                <GraphHeaderTitle>Purchase History</GraphHeaderTitle>
                <DateSelectBox name="date" id="purchaseDate" onChange={(e) => setPurchaseDateSelect(e.target.value)}>
                  <option value="year">This year</option>
                  <option value="month">This month</option>
                  <option value="week">This week</option>
                </DateSelectBox>
              </GraphHeader>
              <Bar data={barChartData} options={barOptions} />
            </RightWrapper>
          </GraphWrapper>
          <GraphWrapper>
            <LeftWrapper>
              <GraphHeader>
                <GraphHeaderTitle>Total Visitors</GraphHeaderTitle>
                <DateSelectBox name="date" id="revenuDate" onChange={(e) => setVisitorsDateSelect(e.target.value)}>
                  <option value="year">This year</option>
                  <option value="month">This month</option>
                  <option value="week">This week</option>
                </DateSelectBox>
              </GraphHeader>
              <Bar data={visitorsChartData} options={barOptions} />
            </LeftWrapper>
            <RightWrapper>
              <GraphHeader>
                <GraphHeaderTitle>Registered Users</GraphHeaderTitle>
                <DateSelectBox name="date" id="revenuDate" onChange={(e) => setUsersDateSelect(e.target.value)}>
                  <option value="year">This year</option>
                  <option value="month">This month</option>
                  <option value="week">This week</option>
                </DateSelectBox>
              </GraphHeader>
              <Bar data={usersChartData} options={barOptions} />
            </RightWrapper>
          </GraphWrapper>
        </>
      )}
    </>
  )
}

export default AnalyticsDashboard
