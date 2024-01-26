import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import InputText from '../../shared/components/formInputs/inputText'
import InputTextarea from '../../shared/components/formInputs/inputTextarea'
import InputCheckbox from '../../shared/components/formInputs/inputCheckbox'
import { ButtonGradientPrimary } from '../../shared/components/button/button'
import SuccessModal from '../modal/success'
import ErrorModal from '../modal/error'
import ArtworkInputFile from '../../shared/components/formInputs/artworkInputFile'

import API from '../../../api/admin'
import { acceptOnlyNumbers, CharacterCount, formatAPIError, handleApiImage, validateForm, acceptOnlyNumbersWithDecimals } from '../../../utils/helper'
import { ModalService } from '@nft-marketplace/modal'
import { Loader } from '../../shared/components/Loader'
import { APP_ENV } from '@apps/admin/config'
import AdminProfile from './subadminprofile'

const FormWrapper = styled.div`
  max-width: 766px;
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
  border-radius: 8px;
  padding: 3.7rem 3rem;
  .inner-box {
    background: #fafafa;
    border-radius: 8px;
    padding: 3rem 5.5rem;
    margin-bottom: 18px;
  }
  button {
    background: linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%);
    border-radius: 6px;
    max-width: 185px;
    margin-top: 30px;
  }
  .btn-wrp {
    display: flex;
    justify-content: flex-end;
  }
`

const SubAdminForm = (props: any) => {
  const { isEdit } = props

  const router = useRouter()

  const [adminId, setAdminId] = useState<number>(null)

  useEffect(() => {
    if (router?.query?.id && Number(router?.query?.id)) {
      const id = Number(router?.query?.id)
      setAdminId(id)
    }
  }, [router])

  return (
    <div>
      <AdminProfile isEditEnabled={isEdit} adminId={Number(adminId) || 0} />
    </div>
  )
}

export default SubAdminForm
