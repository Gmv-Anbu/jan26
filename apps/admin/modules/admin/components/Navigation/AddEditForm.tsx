import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '@apps/admin/redux/store'
import InputText from '@apps/admin/modules/shared/components/formInputs/inputText'
import { ButtonGradientPrimary, ButtonTransparent } from '@apps/admin/modules/shared/components/button/button'
import API from '@apps/admin/api/admin/index'
import { ModalService } from '@nft-marketplace/modal'
import SuccessModal from '../../shared/modal/success';

const FormWrapper = styled.div`
  max-width: 100%;
  padding: 4rem 0;
`

const ButtonComponent = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

const AutocompleteList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 160px;
  overflow-y: auto;
`

const Suggestion = styled.li`
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: whitesmoke !important;
  }
`

const AddEditForm = ({ onDismiss, editData, isAddSubmenu }) => {
  const menuData = useSelector<RootState, any>((state) => state?.app?.themeDataFromStore)
  const isEdit = Object.keys(editData).length > 0
  const initialData = {
    menuTitle: '',
    menuLink: '',
    selectedKey: '',
    subMenuTitle: '',
  }
  const router = useRouter()
  const { menuId } = router.query
  const menutitleRef = useRef(null)
  const submenutitleRef = useRef(null)
  const menulinkRef = useRef(null)
  const [form, setForm] = useState<{ [key: string]: string }>(initialData)
  const [errors, setErrors] = useState<{ [key: string]: any }>({})
  const [allPagesList, setAllPagesList] = useState<Array<{ [index: string]: any }>>([])
  const [searchText, setSearchText] = useState<string>('')
  const [showAutocomplete, setShowAutoComplete] = useState<boolean>(false)

  const handleOnChange = (e: any) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { value, name } = e?.target
    if (name === 'title') {
      form.menuTitle = value
      errors.menuTitle = value.length === 0 ? 'Please enter Menu Title' : ''
      setErrors({ ...errors })
    }
    if (name === 'subMenuTitle') {
      form.subMenuTittle = value
    }
    if (name === 'link') {
      form.menuLink = value
      errors.menuLink = value.length === 0 ? 'Please enter Menu Link' : ''
      setShowAutoComplete(true)
      setSearchText(value)
      setErrors({ ...errors })
    }
    setForm({ ...form })
  }

  useEffect(() => {
    if (isEdit) {
      form.menuTitle = editData?.title
      form.menuLink = editData?.link
      setForm({ ...form })
    }
  }, [editData])

  const onAdd = async () => {
    if (!form.menuTitle || !form.menuLink) {
      errors.menuTitle = !form.menuTitle ? 'Please enter Menu Title' : ''
      errors.menuLink = !form.menuLink ? 'Please enter Menu Link' : ''
      setErrors({ ...errors })
      return false
    }
    const body = {
      title: form.menuTitle,
      link: form.selectedKey ? `/base/${form.selectedKey}` : form.menuLink,
      isDefault: false,
    }
    API.addMenuItem(body)
      .then((response) => {
        if (response.status === 200) {
          updateThemeApi(response?.data?.data?.id)
        } else {
          errors.menuTitle = response?.error?.error?.message
          setErrors({ ...errors })
        }
      })
      .catch((error) => {
        errors.apiError = error?.response?.data?.message
        setErrors({ ...errors })
      })
  }

  const onEdit = () => {
    const body = {
      title: form.menuTitle,
      link: form.selectedKey ? `/base/${form.selectedKey}` : form.menuLink,
      isDefault: editData?.isDefault,
    }
    API.updateMenuItem(editData?.id, body)
      .then((response) => {
        if (response?.status === 200) {
          const success = ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={'Menu Item Updated SuccessFully'} close={() => handleClose(success)} />)
          onDismiss()
        } else {
          errors.menuTitle = response?.error?.error?.message
          setErrors({ ...errors })
        }
      })
      .catch((error) => {
        errors.apiError = error?.response?.data?.message
        setErrors({ ...errors })
      })
  }

  const handleClose = (modal: any) => {
    ModalService.close(modal)
    onDismiss()
  }

  const pushToSubMenuFuc = (dataArr, dataToPush) => {
     dataArr.map(item => {
      if(item.menuId === isAddSubmenu?.menuData?.menuId) {
        item.subMenu.push(dataToPush);
      }
     })
     return dataArr
    }

  const updateThemeApi = async (id: number) => {
    const menuToBePushed = {
      menuId: id,
      position: 2,
    }
    if (menuId === 'footer' && !isAddSubmenu?.isOpenAdd) {
      menuToBePushed['subMenu'] = []
    }
    let themeToBEUpdated;
    if(!isAddSubmenu?.isOpenAdd) {
      themeToBEUpdated = {
        ...menuData,
        sections: {
          ...menuData.sections,
          home: {
            ...menuData.sections.home,
            [`${menuId}`]: {
              ...menuData.sections.home[`${menuId}`],
              ...menuData.sections.home[`${menuId}`].menus?.push(menuToBePushed),
            },
          },
        },
      }
    } else {
    pushToSubMenuFuc(menuData.sections.home[`${menuId}`].menus, menuToBePushed)
      themeToBEUpdated = {
        ...menuData,
        sections: {
          ...menuData.sections,
          home: {
            ...menuData.sections.home
          },
        },
      }
    }
    await API.UpdateThemeDetails(themeToBEUpdated)
      .then((res) => {
        if (res?.data?.data) {
          const success = ModalService.open((modalProps: any) => <SuccessModal title="Success" desc={'Menu Item Added SuccessFully'} close={() => handleClose(success)} />)
          onDismiss()
        }
      })
      .catch((error) => {
        errors.apiError = error?.response?.data?.message
        setErrors({ ...errors })
      })
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      getAllPages()
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchText])

  const getAllPages = async () => {
    const params: any = {
      page: 1,
      items: 100,
    }

    if (searchText) {
      params.search = searchText
    }

    API.getAllPages(params)
      .then((response) => {
        if (response?.status === 200) {
          const data = response?.data?.data?.pageList
          setAllPagesList(data)
        }
      })
      .catch((error) => {
        console.log('Error in getAllPages: ', error)
      })
  }

  const selectedLink = (item: { [key: string]: any }) => {
    form.menuLink = item?.name
    form.selectedKey = item?.key
    setForm({ ...form })
    setShowAutoComplete(false)
  }

  return (
    <FormWrapper>
      <InputText inputRef={menutitleRef} label={`Menu Title`} onChange={handleOnChange} value={form?.menuTitle} name={`title`} placeholder={`Enter menu title`} error={errors?.menuTitle} />
      {/* {menuId === 'footer' && !isAddSubmenu?.isOpenAdd ? <InputText inputRef={submenutitleRef} label={`Sub-Menu Title`} onChange={handleOnChange} value={form?.menuTitle} name={`subMenuTitle`} placeholder={`Enter sub-menu title`} /> : null} */}
      <InputText readOnly={editData?.isDefault} inputRef={menulinkRef} label={`Menu Link`} onChange={handleOnChange} value={form?.menuLink} name={`link`} placeholder={`Search or paste a link`} error={errors?.menuLink} />
      {showAutocomplete && searchText && allPagesList.length > 0 ? (
        <AutocompleteList>
          {allPagesList.map((data) => {
            return (
              <Suggestion key={data?.id} onClick={() => selectedLink(data)}>
                {data?.name}
              </Suggestion>
            )
          })}
        </AutocompleteList>
      ) : null}
      <ButtonComponent>
        <ButtonTransparent blockBtn size="md" onClick={onDismiss}>
          Cancel
        </ButtonTransparent>
        <ButtonGradientPrimary blockBtn size="lg" onClick={isEdit ? onEdit : onAdd}>
          {isEdit ? 'Save' : 'Add'} Item
        </ButtonGradientPrimary>
      </ButtonComponent>
    </FormWrapper>
  )
}

export default AddEditForm
