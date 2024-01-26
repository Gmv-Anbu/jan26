import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { CreateButton } from 'libs/table/src/lib/tableStyles'
import { AppDispatch } from '../../../../redux/store';
import ThemeContext from '@apps/admin/context/themeContext'
import { useContext } from 'react'
import API from '../../../../api/admin'
import { ModalService } from '@nft-marketplace/modal'
import SuccessModal from '../../shared/modal/success'
import actions from '@apps/admin/redux/actions'

const AdminHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 2rem;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
`
const PageTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: normal;
`
const HeaderNavigation = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
`
const NavLink = styled.div`
  margin: 0 1rem;
  list-style: none;
  text-align: center;
  border-radius: 1.5rem;
  &:hover {
    background: ${({ theme }) => theme.colors.navLinkHover};
  }
  &.user {
    padding: 0rem;
    &:hover {
      background: transparent;
    }
  }
`
const ProjectAnchor = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  &.btn {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.btnPrimary};
    display: inline-block;
    padding: 1rem 2rem 1rem 3rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 30px;
    background-image: url(images/icon-plus.png);
    background-repeat: no-repeat;
    background-position: 25px center;
  }
`
const ProfileOptions = styled.ul`
  width: 15rem;
  background: ${({ theme }) => theme.colors.profileOptionsbg};
  border-radius: 1em;
  list-style: none;
  margin: 0;
  position: absolute;
  right: 3rem;
  display: block;
`
const DropdownLi = styled.li`
  margin-bottom: 1rem;
  padding: 1rem 1.2rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Profilehref = styled.a`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.1rem;
  cursor: pointer;
  img {
    padding-right: 1rem !important;
  }
`
const UserName = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  margin-left: 15px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    right: -10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 1px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
`
const ArrowLink = styled.span`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0;
  padding: 0;
  transition: transform 0.5s;
  &.rotate {
    transform: rotate(180deg);
  }
  cursor: pointer;
`

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  text-align: right;
  a {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colors.fontprimary};
  }
  gap: 0.3rem;
`
const ProfileImage = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  margin: 0 1rem 0 0;
  img {
    border-radius: 50% !important;
  }
`
const WalletTitle = styled.h4`
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.fontdark};
`
const ProfileImageWrapper = styled.div`
  border-radius: 100%;
`
const ProfileName = styled.span`
  color: ${({ theme }) => theme.colors.fontprimary};
  font-size: 1.6rem;
  display: inline-block;
  /* width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
`
const ExitThemeContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  img {
    border-radius: 4px;
  }
`
const ExitThemeText = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-align: center;

  color: #141415;
`
const IconContainer = styled.div`
  background: #e7e7e7;
  width: 23px;
  height: 23px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
`
const CustomHeader = (props: any) => {
  //this method is used for theme update api call
  // const { UpdateThemeData } = useThemeData()
  const dispatch = useDispatch<AppDispatch>()
  const Data = useContext<any>(ThemeContext)

  const router = useRouter()
  const handleExitClick = () => {
    router.push('/theme')
  }

  const handleClose = (modal: any) => {
    Data?.setFlag((flag) => ({
      ...flag,
      reload: flag.reload + 1,
    }))
    ModalService.close(modal)
  }

  const UpdateThemeData = async () => {
    await API.UpdateThemeDetails(Data?.themeData)
      .then((res) => {
        if (res?.data?.data) {
          const data = res?.data?.data

          const success = ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={'Theme published successfully'} close={() => handleClose(success)} />)
          dispatch(actions.getTemeDetails())

          // setThemeData(data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AdminHeaderWrapper>
      <ExitThemeContainer>
        <IconContainer>
          <Image src={'/svgs/icons/icon-arrow.svg'} width={10} height={10} alt={'icon'} onClick={handleExitClick} />
        </IconContainer>
        <ExitThemeText>Exit Theme Editor</ExitThemeText>
      </ExitThemeContainer>
      <PageTitle>Theme Customization Page</PageTitle>

      {/* need to call the update theme api on click of this button 
            and after getting the success response need to reload the iframe 
            */}
      <CreateButton className="btn" onClick={UpdateThemeData}>
        Publish Theme
      </CreateButton>
    </AdminHeaderWrapper>
  )
}

export default CustomHeader
