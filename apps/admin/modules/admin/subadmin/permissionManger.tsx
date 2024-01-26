import auth from '@apps/admin/api/admin/auth'
import SuccessModal from '@apps/admin/modules/admin/modal/SuccessModal'
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error'
import { Loader } from '@apps/admin/modules/shared/components/Loader'
import { trimString } from '@apps/admin/utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

export const Label = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #131313;
  margin-left: 0.6em;
`

const PermissionTr = styled.tr`
  height: 4.8rem;
  background-color: #fff;
  color: #656565;
  font-size: 16px;
  text-transform: capitalize;
  display: flex;
  width: 24rem;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  :hover {
    background-color: whitesmoke !important;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    /* transition:0.3s; */
  }
`

const FormHeader = styled.h3`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  margin-bottom: 2.3rem;
  color: #6e6f72;
  &:after {
    content: ' *';
    color: red;
  }
`

const PermissionDetails = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0px 2rem;
  label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.7);
  }
  input {
    background: #ffffff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    padding: 1.4rem 2rem;
    width: 100%;
    outline: none;
  }
`

const CheckBoxWrapper = styled.div`
  position: relative;
  z-index: 12;
`

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 50;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #0e0e0e;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.3s;
    }
  }
`

const PermissionManager = ({ permissionList, setPermissionList }) => {
  const fileInput = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const [permissionData, setPermissionData] = useState([])
  // const [permissionList, setPermissionList] = useState([])
  const [loader, setLoader] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)

  const toggleHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (id) {
      let tempPermission = [...permissionList]

      const index = tempPermission.findIndex((obj) => obj.id == id)
      tempPermission.splice(index, 1, { ...tempPermission[index], permissionId: id, hasAccess: e.target.checked })
      console.log('>>> Items', id, e.target.checked, tempPermission, index)
      setPermissionList(tempPermission)
      console.log('Permission data', permissionData)
    }
  }

  const getPermissionList = () => {
    auth.getPermissionsListAdmin().then((data) => {
      const userData = data?.data?.data

      console.log('>>> show me the permissions', userData)
      setPermissionList(userData)
    })
  }

  useEffect(() => {
    getPermissionList()
  }, [])

  return (
    <>
      <Container>
        <FormHeader>Permissions</FormHeader>

        {permissionList.length > 0 &&
          permissionList?.map((item) => (
            <PermissionTr
              key={item?.id}
              onClick={(e: any) => {
                console.log('Top console')
                // setToggle(!toggle)
                // key.isFeaturedAsset = e.target.checked
                // toggleHandler(item?.id, item?.name, e)
              }}
            >
              {item?.label}{' '}
              <CheckBoxWrapper key={item?.id + 'ck'}>
                <CheckBox
                  name={item?.id}
                  type="checkbox"
                  checked={item.hasAccess}
                  onChange={(e: any) => {
                    console.log('11111111')
                    setToggle(!toggle)
                    // key.isFeaturedAsset = e.target.checked
                    toggleHandler(e, item?.id)
                  }}
                  id={item.id + 'ox'}
                  key={item?.id + 'ckb'}
                />
                <CheckBoxLabel htmlFor={item.id + 'ox'}></CheckBoxLabel>
              </CheckBoxWrapper>
            </PermissionTr>
          ))}
      </Container>
    </>
  )
}

export default PermissionManager
