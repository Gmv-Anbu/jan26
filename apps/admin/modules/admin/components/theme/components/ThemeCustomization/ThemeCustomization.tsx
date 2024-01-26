import ThemeContext from '@apps/admin/context/themeContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import EditComponent from '../EditComponent/EditComponent'
import EditShopComponent from '../EditComponent/EditShopComponent'
import EditSupporters from '../EditComponent/EditSupporters'
import UpdateHeaderComponent from '../header/UpdateHeader'
import UpdatePopUpImages from '../EditComponent/UpdatePopUpImages'

import {
  CheckboxInput,
  CollapsibleListItem,
  Container,
  EditSection,
  FavIconWrapper,
  Heading,
  ItemContainer,
  ListName,
  MenuSection,
  MiddleContainer,
  PageItems,
  PageName,
  Pages,
  Preview,
  PreviewInfo,
  SettingContent,
  SideMenu,
  SubMenu,
  SubMenuItem,
  TopHeading,
  TopHeadingText,
} from './index.styled'
import Tooltip from '@apps/admin/modules/shared/components/tooltip/tooltip'
import ColorStyleCustomize from '../SettingsComponent/ColorStyleCustomize'
import UploadFavicon from '../SettingsComponent/UploadFavicon'
import { APP_ENV } from '../../../../../../config'
import Typography from '../SettingsComponent/typography'

const richTextLogoDimensions = {
  width: '497',
  height: '588',
}

const homePageLogoDimensions = {
  width: '216',
  height: '70',
}

function ThemeCustomization() {
  const Data = useContext<any>(ThemeContext)

  // const { getThemeData,setForms }=useThemeData()

  const [activeId, setActiveId] = useState<any>()
  const [checkedId, setCheckedId] = useState<any>('home')
  // const [themeData, setThemeData] = useState<any>({})
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false)
  const [activeListKey, setActiveListKey] = useState<string>('')
  const router = useRouter()
  const { menuId } = router.query
  const handleIconClick = (key: any) => {
    if (key == activeId) {
      setActiveId(undefined)
    } else {
      setActiveId(key)
    }
  }

  const isRadioSelected = (value: any) => checkedId == value
  const handleRadioClick = (e: any) => {
    setCheckedId(e.currentTarget.value)
    setActiveId('')
  }

  useEffect(() => {
    const { isOpenSetting } = router.query
    const { menuId } = router.query
    if (isOpenSetting === 'true') {
      setIsOpenSetting(true)
    }
    if (menuId) {
      setActiveId(menuId)
    }
  }, [])

  const renderSettingIcons = (key) => {
    switch (key.toLowerCase()) {
      case 'color':
        return '/svgs/icons/color-style.svg'
      case 'typography':
        return '/svgs/icons/typography.svg'
      default:
        return ''
    }
  }

  const onClickSettings = () => {
    setIsOpenSetting(!isOpenSetting)
    setActiveId('')
    if (isOpenSetting) {
      return router.push(router.pathname, undefined, { shallow: true })
    }
    const url = router.asPath + `/?isOpenSetting=${!isOpenSetting}`
    router.push(url, undefined, { shallow: true })
  }

  const rowExpanderFunction = (key: string) => {
    setActiveId('')
    if (key === activeListKey) {
      setActiveListKey('')
    } else {
      setActiveListKey(key)
    }
  }

  return (
    <Container>
      <SideMenu id="sideMenu">
        <TopHeading>
          {isOpenSetting ? (
            <>
              <TopHeadingText showPointer={true} onClick={() => onClickSettings()}>
                <Image src={'/svgs/icons/Arrow-left.svg'} width={10} height={10} alt={'icon'} /> Settings
              </TopHeadingText>
            </>
          ) : (
            <>
              <TopHeadingText>#Pages</TopHeadingText>
              <TopHeadingText showPointer={true} onClick={() => onClickSettings()}>
                <Tooltip tooltipText="Settings">
                  <Image src={'/svgs/icons/setting-icon.svg'} width={15} height={15} alt={'icon'} />
                </Tooltip>
              </TopHeadingText>
            </>
          )}
        </TopHeading>
        <Pages borderBottom={!isOpenSetting ? '1px solid #ccc' : 'unset'}>
          {Data?.themeData?.sections && !isOpenSetting ? (
            Object?.entries(Data?.themeData?.sections).map(([key, value]) => {
              // Pretty straightforward - use key for the key and value for the value.
              // Just to clarify: unlike object destructuring, the parameter names don't matter here.
              return (
                <PageName key={key}>
                  <CheckboxInput>
                    <input type="checkbox" name="pages" value={key} checked={isRadioSelected(key)} onChange={handleRadioClick} />
                    {`${key} Page`}
                    <span className="checkmark"></span>
                  </CheckboxInput>
                </PageName>
              )
            })
          ) : (
            <>
              {Data?.themeData?.setting &&
                Object?.entries(Data?.themeData?.setting).map(([key, value]) => {
                  return (
                    <React.Fragment key={key}>
                      <CollapsibleListItem background={key === activeListKey ? 'rgba(0, 163, 255, 0.06)' : 'none'} onClick={() => rowExpanderFunction(key)}>
                        {/* Here I'm reusing the <TopHeadingTex> */}
                        <TopHeadingText textTransform="capitalize">
                          <Image src={renderSettingIcons(key)} width={13} height={13} alt={'icon'} /> {key.toLowerCase() === 'color' ? `${key} style` : key}
                        </TopHeadingText>
                        <TopHeadingText>
                          <Image src={key === activeListKey ? '/svgs/icons/triangle-up.svg' : '/svgs/icons/triangle-down.svg'} width={13} height={13} alt={'icon'} />
                        </TopHeadingText>
                      </CollapsibleListItem>
                      <SettingContent isOpen={key === activeListKey ? true : false}>
                        {activeListKey.toLocaleLowerCase() === 'color' ? (
                          <ColorStyleCustomize selectedKey={activeListKey} />
                        ) : activeListKey.toLocaleLowerCase() === 'favicon' ? (
                          <FavIconWrapper>
                            <TopHeadingText onClick={() => setActiveId(key)}>
                              <Image src={'/svgs/edit.svg'} width={13} height={13} alt={'icon'} /> Upload
                            </TopHeadingText>
                          </FavIconWrapper>
                        ) : activeListKey.toLocaleLowerCase() === 'typography' ? (
                          <FavIconWrapper>
                            <TopHeadingText onClick={() => setActiveId(key)}>
                              <Image src={'/svgs/edit.svg'} width={13} height={13} alt={'icon'} /> Edit
                            </TopHeadingText>
                          </FavIconWrapper>
                        ) : null}
                      </SettingContent>
                    </React.Fragment>
                  )
                })}
            </>
          )}
        </Pages>
        {!isOpenSetting ? (
          <MenuSection>
            <Heading>
              {`# ${checkedId} /`}
              <b>Items</b>
            </Heading>
            <PageItems>
              {Data?.themeData?.sections &&
                Object?.entries(Data?.themeData?.sections[checkedId]).map(([key, value]) => {
                  return (
                    <>
                      <ItemContainer key={key} id={key} className={key == activeId ? 'active' : ''}>
                        {/* need to make icons dynamic */}
                        <Image src={'/svgs/icons/header-icon.svg'} width={13} height={13} alt={'icon'} onClick={() => handleIconClick(key)} />
                        <ListName>{key}</ListName>
                      </ItemContainer>
                      {key === activeId &&
                        Object?.entries(Data?.themeData?.sections[checkedId][key]).map(([key, value]) => {
                          return (
                            <SubMenu key={key}>
                              <SubMenuItem>
                                {/* need to make icons dynamic */}
                                {/* <Image src={'/svgs/icons/logo-icon.svg'} width={13} height={13} alt={"icon"} /> */}
                                {key}
                              </SubMenuItem>
                            </SubMenu>
                          )
                        })}
                    </>
                  )
                })}
            </PageItems>
          </MenuSection>
        ) : null}
      </SideMenu>
      <MiddleContainer id="Preview">
        <PreviewInfo>
          <Image src={'/svgs/monitor.svg'} width={23} height={23} alt={'icon'} />
          <p>
            <a>{checkedId.toLocaleLowerCase() === 'shop' ? `Shop` : 'Home'} Page</a> preview!
          </p>
          <div>
            <a target="_blank" href={`${APP_ENV?.CUSTOMER_WEB_URL}${checkedId.toLocaleLowerCase() === 'shop' ? `base/market` : ''}`} rel="noreferrer">{`${APP_ENV?.CUSTOMER_WEB_URL}${checkedId.toLocaleLowerCase() === 'shop' ? `base/market` : ''
              }`}</a>
          </div>
        </PreviewInfo>
        <Preview id='iframe'>
          <iframe key={Data?.flag.reload} src={`${APP_ENV?.CUSTOMER_WEB_URL}${checkedId.toLocaleLowerCase() === 'shop' ? `base/market` : ''}`} title="NFT 2.0 | Customer Interface" width="100%" height="900"></iframe>
        </Preview>
      </MiddleContainer>

      {/* need to update this scetion's childern as seprate component */}

      <EditSection id="EditSection">
        {activeId == 'header' && (
          <UpdateHeaderComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.header} callback={Data?.setThemeData} flag={Data?.flag} setFlag={Data?.setFlag} logoDimensions={homePageLogoDimensions} />
        )}
        {activeId == 'footer' && <UpdateHeaderComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.footer} callback={Data?.setThemeData} flag={Data?.flag} setFlag={Data?.setFlag} />}
        {activeId == 'richText' && (
          <UpdateHeaderComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.richText} callback={Data?.setThemeData} flag={Data?.flag} setFlag={Data?.setFlag} logoDimensions={richTextLogoDimensions} />
        )}
        {activeId == 'bannerCarousel' && <EditComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.bannerCarousel} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'newsletterSubscription' && <EditComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.newsletterSubscription} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'trending' && <EditComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.trending} callback={Data?.setThemeData} PageName={checkedId} />}
        {
          activeId == 'supporters' &&
          <EditSupporters sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.supporters} callback={Data?.setThemeData} PageName={checkedId} />
        }
        {activeId == 'featured' && <EditComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.featured} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'collection' && <EditComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.collection} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'basicSetting' && <EditComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.shop?.basicSetting} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'sort' && <EditShopComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.shop?.sort} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'filter' && <EditShopComponent sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.shop?.filter} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId == 'popUpImages' && <UpdatePopUpImages sectionName={activeId} Data={Data?.themeData && Data?.themeData?.sections?.home?.popUpImages} callback={Data?.setThemeData} PageName={checkedId} />}
        {activeId?.toLowerCase() === 'favicon' ? <UploadFavicon selectedKey={activeId} /> : null}
        {activeId?.toLowerCase() === 'typography' ? <Typography selectedKey={activeId} /> : null}
      </EditSection>
    </Container>
  )
}

export default ThemeCustomization
