import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { Line, Bar } from 'react-chartjs-2'
import moment from 'moment'
import API from '../../../../api/admin'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { DateSelectBox, GraphHeader } from '../../styled-components/dashboardStyle'
import { abbreviateNumber } from '@apps/admin/utils/format'
import { APP_ENV } from '@apps/admin/config'
import { formatToUSD } from '@apps/admin/utils/helper'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const GraphWrapper = styled.div`
  display: block;
  margin-top: 0.4em;
  max-width: 100%;
  height: 332px;
`

const GraphHeaderTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #0c0c0c;
`

const Label = styled.span`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  color: #0c0c0c;
  margin: 0.5em 0;
  padding-right: 2em;
`

const RightWrapper = styled.div`
  flex: 0 0 49%;
  background: #ffffff;
  box-shadow: 1px 6px 40px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
`

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Transaction',
      data: [33, 53, 85, 41, 44, 65, 12, 99, 70, 40, 22, 1],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      stepped: false,
    },
  ],
}

const ChartTransaction: NextPage = () => {
  const [transactionDateRange, setTransactionDateRange] = useState<any>('year')
  const [lineChartData, setLineChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [33, 53, 85, 41, 44, 65, 12, 99, 70, 40, 22, 1],
        fill: true,
        backgroundColor: 'white',
        borderColor: 'blue',
        stepped: false,
        tension: 0.3,
      },
    ],
  })

  const lineOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // let label = context.dataset.label || ''

            // if (label) {
            //   label += ': '
            // }
            const label = formatToUSD(context.parsed.y, 2);
            // if (context.parsed.y !== null) {
            //   label += new Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: APP_ENV?.NETWORK_TYPE == 'HEDERA' ? 'HBAR' : 'ETH',
            //     minimumFractionDigits: 3,
            //   }).format(context.parsed.y)
            // }
            return label
          },
        },
      },
    },
    maintainAspectRatio: false,
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
        startDate = moment().startOf('day').format('L')
        endDate = moment().endOf('day').format('L')
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

  // To get Revenue bar graph data
  const getTransactionGraphData = () => {
    const { startDate, endDate, groupby } = getGraphDateFilters(transactionDateRange)
    const query = `?start=${startDate}&end=${endDate}&groupBy=${groupby}&transactionType=all`
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

  const getRevenuChart = () => {
    const { startDate, endDate, groupby } = getGraphDateFilters(transactionDateRange)
    const query = `?start=${startDate}&end=${endDate}`
    API.getRevenueChart(query)
    .then(res => {
      console.log('asdasdasd', res)
      if (res?.data?.data) {
        const yValue = res?.data?.data?.map((item) => abbreviateNumber(item?.total_value))
        const xValue = res?.data?.data?.map((item) => moment(item?.timestamp).format('ll'))
        setLineChartData({
          ...lineChartData,
          datasets: [{ ...lineChartData.datasets[0], data: yValue }],
          labels: xValue,
        })
      }
    })
    .catch(err => {
      console.log('errasd', err)
    })
  }

  useEffect(() => {
    // getTransactionGraphData()
    getRevenuChart()
  }, [transactionDateRange])

  return (
    <>
      {/* <GraphWrapper> */}
      {/* <LeftWrapper> */}
      <GraphHeader>
        <GraphHeaderTitle>Revenue</GraphHeaderTitle>
        <DateSelectBox name="date" id="revenuDate" onChange={(e) => setTransactionDateRange(e.target.value)}>
          <option value="year">This year</option>
          <option value="month">This month</option>
          <option value="week">This week</option>
          <option value="day">Today</option>
        </DateSelectBox>
      </GraphHeader>
      <GraphWrapper>
        <Line data={lineChartData} width={'30%'} options={lineOptions} />
      </GraphWrapper>
      {/* </LeftWrapper> */}
      {/* </GraphWrapper> */}
    </>
  )
}

export default ChartTransaction
