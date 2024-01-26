import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/admin/redux/store'
import { APP_ENV } from '@apps/admin/config'

const SideMenuWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  height: 100%;
  max-width: 84px;
`
const HeaderLogo = styled.div<any>`
  padding: 1.6rem 2.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(9, 20, 40, 0.26);
  box-shadow: 0px 8px 29px rgb(0 0 0 / 25%);
  backdrop-filter: blur(87px);
  ${(props) =>
    props.sideMenuCollapse &&
    css`
      padding: 1.6rem 0.7rem;
      a {
        margin-bottom: 0 !important;
      }
    `}
`
const Anchor = styled.a``
const NavTitle = styled.h2`
  padding: 0 3rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2.9rem;
  color: ${({ theme }) => theme.colors.langSelectColor};
  display: none;
`
const NavigationList = styled.ul`
  padding: 4rem 1.5rem 0;
  height: calc(100% - 84px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
      background: #eee;
  }​
`
const NavigationListItem = styled.li<any>`
  list-style: none;
  position: relative;
  ${(props) =>
    props.sideMenuCollapse &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  &.active {
    background: ${({ theme }) => theme.colors.langSelectBg};
    border-radius: 0.7em;
  }
  // &:last-child {
  //     position:absolute;
  //     bottom:10px;
  //     width: 90%;
  // }
`
const NavigationAnchor = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.9rem;
  text-decoration: none;
  color: #d8d8d8;
  display: block;
  padding: 0.8rem 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  // &:hover {
  //     background: ${({ theme }) => theme.colors.navLinkHover};
  // }
  &.active {
    font-weight: 600;
    color: #fff;
    background: #2e3747;
    border-radius: 7px;
  }
`
const SpanIcon = styled.span`
  display: inline-block;
  padding-right: 0.5em;
  height: 21px;
`

const AdminSideMenu = (props: any) => {
  // need to use these flag to collpase the side menu
  const { sideMenuCollapse } = props
  const router = useRouter()
  const [url, setUrl] = useState('')
  const permissionData = useSelector<RootState, any>((state) => state?.userData?.permissions)
  const adminData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const themeData = useSelector<RootState, any>((state) => state?.app?.themeDataFromStore)

  useEffect(() => {
    setUrl(router.pathname)
  }, [router])

  const sideMenuArr = useMemo(
    () => [
      // { title: 'Analytics', icon: '/svgs/menu/analytics.svg', link: '/', id: 1 },
      { title: 'Asset Management', icon: '/svgs/menu/assetMangement.svg', link: '/artwork', id: 1 },
      { title: 'Auction Registration', icon: '/svgs/menu/collection.svg', link: '/auction-registration', id: 2 },
      { title: 'Company Approval', icon: '/svgs/menu/Users_group.svg', link: '/company', id: 3 },
      { title: 'Bid Management', icon: '/svgs/menu/collection.svg', link: '/bid-management', id: 4 },
      { title: 'Category Management', icon: '/svgs/menu/category.svg', link: '/category', id: 5 },
      { title: 'Sub Category Management', icon: '/svgs/menu/category.svg', link: '/subcategory', id: 6 },
      // {
      //   title: 'Collection',
      //   icon: '/svgs/menu/collection.svg',
      //   link: '/collection',
      //   id: 4,
      // },
      {
        title: 'Accounting',
        icon: '/svgs/menu/accounting.svg',
        link: '/accounting',
        id: 5,
      },
      {
        title: 'User Management',
        icon: '/svgs/menu/userManagment.svg',
        link: '/users',
        id: 6,
      },
      { title: 'Events Management', icon: '/svgs/menu/collection.svg', link: '/events', id: 7 },
      { title: 'Events Requests', icon: '/svgs/menu/collection.svg', link: '/event-requests', id: 8 },
      { title: 'Sell Requests', icon: '/svgs/menu/collection.svg', link: '/sell-requests', id: 9 },
      { title: 'Transfer History', icon: '/svgs/menu/collection.svg', link: '/transfer-history', id: 10 },
      { title: 'Archive Offers', icon: '/svgs/menu/Users_group.svg', link: '/archive-offers', id: 11 },
      { title: 'FAQ Management', icon: '/svgs/menu/collection.svg', link: '/FAQ', id: 12 },
      // {
      //   title: 'Creator Management',
      //   icon: '/svgs/menu/Users_group.svg',
      //   link: '/creators',
      //   id: 7,
      // },
      // {
      //   title: 'Subadmin Management',
      //   icon: '/svgs/menu/subAdmin.svg',
      //   link: '/subadmin',
      //   id: 12,
      // },

      //check merge
      {
        title: 'Newsletter Subscribers',
        icon: '/svgs/menu/Users_group.svg',
        link: '/subscribers',
        id: 13,
      },
      // {
      //   title: 'Theme',
      //   icon: '/svgs/menu/theme.svg',
      //   link: '/theme',
      //   id: 8,
      // },
      // {
      //   title: 'Navigation',
      //   icon: '/svgs/icons/navigation-icon.svg',
      //   link: '/navigation',
      //   id: 9,
      // },
      // {
      //   title: 'Pages',
      //   icon: '/svgs/pages.svg',
      //   link: '/pages',
      //   id: 10,
      // },
      // {
      //   title: 'Preferances',
      //   icon: '/svgs/icons/preferance-icon.svg',
      //   link: '/preferances',
      //   id: 11,
      // },

      // { title: 'Projects', icon: '/svgs/menu/projects.svg' },
      // { title: 'Message', icon: '/svgs/menu/messages.svg' },
      // { title: 'Schedule', icon: '/svgs/menu/schedule.svg' },
      // { title: 'Activity', icon: '/svgs/menu/activity.svg' },
    ],
    []
  )

  const sideBarHavePermission = useMemo(() => {
    const sideMenuHavePermission = sideMenuArr.filter((item) => {
      const itemPermissionData = permissionData?.find((permission) => Number(permission?.permissionId) === Number(item.id))

      return itemPermissionData?.hasAccess
    })

    return sideMenuHavePermission
  }, [permissionData, sideMenuArr])

  // For subadmin side menu is limited. So hideding it from the side menu
  let sideMenu = adminData?.role == 'subAdmin' && APP_ENV.NETWORK_TYPE == 'HEDERA' ? sideBarHavePermission : sideMenuArr

  // Filter out These submenu from Hedera project
  if (APP_ENV.NETWORK_TYPE === 'HEDERA') {
    sideMenu = sideMenu.filter((res) => !['Preferances', 'Pages', 'Navigation', 'Theme', 'Creator Management'].includes(res?.title))
  }

  if (APP_ENV.SHOW_THEME == 'false' && APP_ENV.NETWORK_TYPE != 'HEDERA') {
    sideMenu = sideMenu.filter((res) => !['Preferances', 'Pages', 'Navigation', 'Theme', 'Newsletter Subscribers'].includes(res?.title))
  }

  return (
    <SideMenuWrapper id={`side-menu`}>
      <HeaderLogo sideMenuCollapse={sideMenuCollapse}>
        <Link href="/artwork" passHref>
          <Anchor>
            <Image  src="/images/admin/Logo1.svg" alt={`AdminLogo`} width={sideMenuCollapse ? '45' : '153'} height="50" objectFit="contain" />
          </Anchor>
        </Link>
      </HeaderLogo>
      <NavigationList>
        {sideMenu.length &&
          sideMenu.map((menuItem, i) => {
            return (
              <NavigationListItem sideMenuCollapse={sideMenuCollapse} key={i}>
                <Link href={menuItem?.link || '#'} passHref>
                  <NavigationAnchor className={url === menuItem?.link && menuItem?.link === '/' ? 'active' : url.includes(menuItem?.link) && menuItem?.link !== '/' ? 'active' : ''}>
                    <SpanIcon>
                      <Image src={menuItem?.icon} alt={menuItem.title} width="21" height="21" />
                    </SpanIcon>
                    {sideMenuCollapse !== true && menuItem.title}
                  </NavigationAnchor>
                </Link>
              </NavigationListItem>
            )
          })}
      </NavigationList>
    </SideMenuWrapper>
  )
}

export default AdminSideMenu
