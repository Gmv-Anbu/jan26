import { APP_ENV } from '@apps/admin/config'
import { AdminGradientButton } from '@apps/admin/modules/shared/components/button/button'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { DashBoardNavBar, DateSelectBox, Div, H3, Label, NavBarLeftSection, NavBarRightSection } from '../../styled-components/dashboardStyle'

interface SubHeaderProps {
  heading: string
  subText: string
  actionTxt: string
  setWidgetDateSelect: (params: any) => any
  buttonAction: () => void
}

const CreateButton = styled.button`
  background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
  border-radius: 6px;
  cursor: pointer;
  padding: 6px;
  border: none;
  height: 40px;
  font-size: 1.5vh;
  color: #ffffff;
  text-align: center;
  margin-left: 2em;
`

const pageLimit = 10

const SubHeader: NextPage<SubHeaderProps> = ({ heading, subText, setWidgetDateSelect, actionTxt, buttonAction }) => {
  return (
    <DashBoardNavBar>
      <NavBarLeftSection>
        <H3>{heading}</H3>
        <Div>{subText}</Div>
      </NavBarLeftSection>
      <NavBarRightSection>
        <Label>Sort By:</Label>
        <DateSelectBox name="date" id="revenuDate" onChange={(e) => setWidgetDateSelect(e.target.value)}>
          <option value="year">This year</option>
          <option value="month">This month</option>
          <option value="week">This week</option>
          <option value="day">Today</option>
        </DateSelectBox>
        {APP_ENV.NETWORK_TYPE != 'HEDERA' && (
          <AdminGradientButton className="ml-20" onClick={() => buttonAction()}>
            {actionTxt}
          </AdminGradientButton>
        )}
      </NavBarRightSection>
    </DashBoardNavBar>
  )
}

export default SubHeader
