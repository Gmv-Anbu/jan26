import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AdminLayout from '../../modules/admin/components/layout/layout'
import { AppDispatch, RootState } from '../../redux/store'
import actions from '../../redux/actions'
import API from '../../api/admin'
import Drawer from '../../modules/shared/components/Drawer'
import AddEditForm from '../../modules/admin/components/Navigation/AddEditForm'
import { ModalService } from '@nft-marketplace/modal'
import SuccessModal from '@apps/admin/modules/admin/shared/modal/success'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'

interface Props {
  height?: string,
  bgColor?: string,
}

const WrapperContainer = styled.div`
  background: #f5f2f2;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  width: calc(100% + 30px);
  margin: 0 -15px;
`

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 1rem 3rem 5rem;
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

const BackText = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  margin-top: 1.4rem;
  justify-content: center;
`

const Container = styled.div<Props>`
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  height: ${(props) => props.height || 'unset'};
  background-color: ${(props) => props.bgColor || '#ffffff'};
`

const DescriptionContent = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  inline-size: 254px;
  overflow-wrap: break-word;
  color: #656565;
  p {
    margin-bottom: 1rem;
  }
`

const CardHeading = styled.h5`
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
  margin-bottom: 1rem;
`

const CardHeadingBtn = styled.h6`
  font-weight: 500;
  margin-bottom: 1rem;
  color: #2c79b7;
  cursor: pointer;
`

const MenuTitle = styled.input`
  border: 1px solid #bac6d9;
  width: 100%;
  border-radius: 4px;
  height: 35px;
  color: #72809c;
  text-transform: capitalize;
  padding: 0 20px;
  &:focus {
    outline: none !important;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: calc(100% - 550px);
`

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #d3d3d3;
  height: 4.8rem;
  :hover {
    background-color: whitesmoke;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    /* transition:0.3s; */
  }
`

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
`

const MenuListItem = styled.li`
  font-size: 1.6rem;
`

const ListItemWrapper = styled.div`
  display: flex;
  gap: 2rem;
`

const DivWrapper = styled.div`
  cursor: pointer;
`

const contentText = {
  content1: 'Menus or Link lists helps your customers to navigate through your platform here',
  content2: 'You can also create nested menus to display dropdown menus and group products pr pages together',
}

const MenuId: NextPage = () => {
  const router = useRouter()
  const { menuId } = router.query
  const menuDataFromRedux = useSelector<RootState, any>((state) => state?.app?.themeDataFromStore)
  const menuData = menuDataFromRedux?.sections?.home?.[`${menuId}`]?.menus
  const dispatch = useDispatch<AppDispatch>()
  const { storeThemeData } = actions
  const [isOpenAddEditPopup, setIsOpenAddEditPopup] = useState<boolean>(false)
  const [editData, setEditData] = useState<{ [key: string]: any }>({})
  const [isExpand, setIsExpand] = useState<{ [key: string]: string | boolean }>({
    expanderId: '',
    expand: false,
  });
  const initialData = {
    menuData: {},
    isOpenAdd: false,
  }
  const [isAddSubmenu, setIsAddSubmenu] = useState<{ [key: string]: any}>(initialData);

  const meta = {
    title: 'NFT2.0 | Navigation',
    description: 'Admin Navigation for NFT',
  }

  useEffect(() => {
    if (!menuData) {
      getMenus()
    }
  }, [])

  const getMenus = () => {
    API.getTheme()
      .then((response) => {
        if (response?.data?.data?.sections?.home) {
          dispatch(storeThemeData(response?.data?.data))
        }
      })
      .catch((error) => {
        console.log('Error in getTheme :', error)
      })
  }

  const goBack = () => {
    // router.back()
    router.push({
      pathname: `/theme/ThemeCustomization`,
      query: { menuId },
    });
  }

  const onEdit = (editValues: { [key: string]: any }) => {
    setEditData(editValues)
    setIsOpenAddEditPopup(true)
  }

  const closeDrawer = () => {
    setEditData({})
    setIsOpenAddEditPopup(false)
    setIsAddSubmenu(initialData);
    getMenus()
  }

  const onClickDelete = (id: number, menuIdArg?: number) => {
    API.deleteMenuItem(id)
      .then((response) => {
        if (response?.status === 200) {
          updateThemeApi(id, menuIdArg)
        } else if (response?.error?.error) {
          callErrorModal()
        }
      })
      .catch((error) => {
        callErrorModal()
      })
  }

  const removeSubMenu = (dataArr, dataToRemove, menuIdArg) => {
    dataArr.map(item => {
     if(item.menuId === menuIdArg) {
       const objWithIdIndex = item.subMenu.findIndex(data => data.menuId === dataToRemove);
       if(objWithIdIndex > -1) {
        item.subMenu.splice(objWithIdIndex, 1);
       }
     }
    })
    return dataArr
   }

  const updateThemeApi = async (id: number, menuIdArg?: number) => {
    const themeToBEUpdated = {
      ...menuDataFromRedux,
      sections: {
        ...menuDataFromRedux.sections,
        home: {
          ...menuDataFromRedux.sections.home,
          [`${menuId}`]: {
            appLogo: menuDataFromRedux.sections.home[`${menuId}`]?.appLogo,
            menus: isExpand.expand && menuIdArg ? [...removeSubMenu(menuDataFromRedux.sections.home[`${menuId}`].menus, id, menuIdArg)] : [...menuDataFromRedux.sections.home[`${menuId}`].menus.filter(data => data.menuId !== id)],
            socialLinks: menuDataFromRedux.sections.home[`${menuId}`]?.socialLinks,
          },
        },
      },
    }
    await API.UpdateThemeDetails(themeToBEUpdated)
      .then((res) => {
        if (res?.data?.data) {
          const success = ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={'Menu Item Deleted SuccessFully'} close={() => handleClose(success)} />)
        }
      })
      .catch((error) => {
        callErrorModal()
      })
  }

  const handleClose = (modal: any) => {
    ModalService.close(modal)
    getMenus()
  }

  const callErrorModal = () => {
    ModalService.open((modalProps: any) => <ErrorModal title="Failed" desc={'Delete failed! Try again later'} close={modalProps.close} />)
  }

  const onExpand = (id: number) => {
    isExpand.expanderId = id.toString()
    isExpand.expand = !isExpand.expand
    setIsExpand({ ...isExpand })
  }

  const onClickAdd = (menuData: {[key: string]: any}) => {
    isAddSubmenu.menuData = menuData;
    isAddSubmenu.isOpenAdd = true;
    setIsAddSubmenu({...isAddSubmenu});
    setIsOpenAddEditPopup(true)
  }

  return (
    <>
      <AdminLayout meta={meta} pageTitle={`Navigation`}>
        <WrapperContainer>
          <BackButtonContainer>
            <IconContainer onClick={goBack}>
              <Image src={'/svgs/icons/icon-arrow.svg'} width={10} height={10} alt={'icon'} />
            </IconContainer>
            <BackText onClick={goBack}>Back</BackText>
          </BackButtonContainer>
          <CardWrapper>
            <Column>
              <Container>
                <CardHeading>Menu Title</CardHeading>
                <MenuTitle value={menuId} readOnly />
              </Container>
              <Container>
                <HeadingWrapper>
                  <CardHeading>Menu Items</CardHeading>
                  <CardHeadingBtn onClick={() => setIsOpenAddEditPopup(true)}>+Add new item</CardHeadingBtn>
                </HeadingWrapper>
                <Container>
                  {menuData &&
                    menuData.map((item) => {
                      return (
                        <React.Fragment key={item?.menuId}>
                          <MenuList>
                            <MenuListItem>{item?.menu?.title}</MenuListItem>
                            <MenuListItem>
                              <ListItemWrapper>
                                <DivWrapper onClick={() => onEdit(item?.menu)}>
                                  <Image src={'/svgs/icons/edit-pencil.svg'} width={10} height={10} alt={'icon'} />
                                  Edit
                                </DivWrapper>
                                {!item?.menu?.isDefault ? (
                                  <DivWrapper>
                                    <Image src={'/svgs/delete.svg'} width={10} height={10} alt={'icon'} onClick={() => onClickDelete(item?.menu?.id)} />
                                  </DivWrapper>
                                ) : null}
                                {menuId === 'footer' ? (
                                  <DivWrapper>
                                    <Image
                                      src={isExpand.expand && item?.menu?.id === Number(isExpand.expanderId) ? '/svgs/icons/triangle-up.svg' : '/svgs/icons/triangle-down.svg'}
                                      width={13}
                                      height={13}
                                      alt={'icon'}
                                      onClick={() => onExpand(item?.menu?.id)}
                                    />
                                  </DivWrapper>
                                ) : null}
                              </ListItemWrapper>
                            </MenuListItem>
                          </MenuList>
                          {isExpand.expand && item?.menu?.id === Number(isExpand.expanderId) && item?.subMenu?.length > 0 ? (
                            <Container bgColor='rgba(0, 163, 255, 0.06)'>
                              <HeadingWrapper>
                                <CardHeading>Sub-Menu Items</CardHeading>
                                <CardHeadingBtn onClick={() => onClickAdd(item)}>+Add</CardHeadingBtn>
                              </HeadingWrapper>
                              {item?.subMenu?.map((data) => {
                                return (
                                  <React.Fragment key={data?.menu?.title}>
                                    <MenuList>
                                      <MenuListItem>{data?.menu?.title}</MenuListItem>
                                      <MenuListItem>
                                        <ListItemWrapper>
                                          <DivWrapper onClick={() => onEdit(data?.menu)}>
                                            <Image src={'/svgs/icons/edit-pencil.svg'} width={10} height={10} alt={'icon'} />
                                            Edit
                                          </DivWrapper>
                                          {!data?.menu?.isDefault ? (
                                            <DivWrapper>
                                              <Image src={'/svgs/delete.svg'} width={10} height={10} alt={'icon'} onClick={() => onClickDelete(data?.menu?.id, item?.menu?.id)} />
                                            </DivWrapper>
                                          ) : null}
                                        </ListItemWrapper>
                                      </MenuListItem>
                                    </MenuList>
                                  </React.Fragment>
                                )
                              })}
                            </Container>
                          ) : isExpand.expand && item?.menu?.id === Number(isExpand.expanderId) && item?.subMenu?.length === 0 ? (
                            <Container bgColor='rgba(0, 163, 255, 0.06)'>
                              <HeadingWrapper>
                                <CardHeading>Sub-Menu Items</CardHeading>
                                <CardHeadingBtn onClick={() => onClickAdd(item)}>+Add</CardHeadingBtn>
                              </HeadingWrapper>
                                <span>No Data</span>
                              </Container>
                          ) : null}
                        </React.Fragment>
                      )
                    })}
                </Container>
              </Container>
            </Column>
            <Container height="100%">
              <CardHeading>Setup Menu Items</CardHeading>
              <DescriptionContent>
                <p>{contentText.content1}</p>
                <p>{contentText.content2}</p>
              </DescriptionContent>
            </Container>
          </CardWrapper>
        </WrapperContainer>
      </AdminLayout>

      {isOpenAddEditPopup ? (
        <Drawer open={isOpenAddEditPopup} backgroundColor="#ffffff" onDismiss={closeDrawer} position="right" size="400px" header={Object.keys(editData).length ? 'Edit Menu Item' : 'Add Menu Item'}>
          <AddEditForm isAddSubmenu={isAddSubmenu} onDismiss={closeDrawer} editData={editData} />
        </Drawer>
      ) : null}
    </>
  )
}

export default MenuId
