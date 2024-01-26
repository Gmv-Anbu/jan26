import API from "@apps/customer/api/customer";
import { ButtonGradientPrimary, ButtonPrimaryOutline } from "@apps/customer/modules/shared/components/button/button";
import SellMultiFileInput from "@apps/customer/modules/shared/components/formInputs/SellMultiFileInput";
import ArtworkInputFile from "@apps/customer/modules/shared/components/formInputs/artworkInputFile";
import InputText from "@apps/customer/modules/shared/components/formInputs/inputText";
import SellInputFile from "@apps/customer/modules/shared/components/formInputs/sellInputFile";
import { InputWrapper } from "@apps/customer/modules/shared/styled-components/formInputs";
import { acceptOnlyNumbers, formatAPIError, handleApiImage, objectDeepClone, validateForm } from "@apps/customer/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'

const AddCompanyModal = ({ close }: any) => {
    
    const ogForm = {
        "name": "",
        "email": "",
        "registrationNumber": "",
        "address": "",
        "ubo": "",
        "year": '',
        "companyDocuments": []
    }
    const formValidation = {
        name: '',
        mainAssetUrl: '',
        price: '',
        address: '',
    }
    const notRequired = ['supportAssetUrl', 'width', 'length', 'weight']
    const [form, setForm] = useState(ogForm)
    const [errors, setErrors] = useState(null)
    const [showErrors, setShowErrors] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('user'))

    const handleOnChange = (e: any) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { value, name, files, checked } = e?.target
        if (name === 'companyDocuments') {
            const [file] = files
            if (file) {
                uploadImg(file)
            }
        } else if (name === 'year') {
            const val = acceptOnlyNumbers(value)
            if (val && value?.length <= 4 || value?.length === 0) {
              setForm({
                ...form,
                [name]: val,
              })
            }
        } else {
          setForm({
            ...form,
            [name]: value,
          })
        }
    }

    const uploadImg = (file: any) => {
        console.log('extra', file)
        API.companyUpload(file)
          .then((res: any) => {
            console.log('res', res)
            if (res?.data?.data?.s3Key) {
                let data = objectDeepClone(form)
                let obj = {
                    fileType: res?.data?.data?.fileType,
                    key: handleApiImage(res?.data?.data?.s3Key)
                }
                data.companyDocuments.push(obj)
                setForm(data)
                console.log('data', data)
            } else if (res?.data === null) {
              const errMsg = formatAPIError(res?.error)
            }
          })
          .catch((err: any) => {
            console.log(err)
          })
      }

    const handleSubmit = async (e: any) => {
        setShowErrors(true)
        const result = await validateForm(form, formValidation, notRequired)
        if (result === true) {
            setErrors({})
            let payload = {}
            for (const [key, value] of Object.entries(form)) {
                if(value) payload[key] = typeof value === 'string' ? value.trim() : value
            }
            console.log('final payload', payload)
            API.addCompany(payload)
            .then(res => {
                console.log('res', res)
                if(res?.data?.message && res?.status === 200) {
                    Toast.success(res?.data?.message || 'Company added successfully')
                    setTimeout(() => close(true), 3000)
                } else {
                    Toast.error(res?.error?.error?.message || res?.error?.message || 'Company add failed try again later')
                }
            })
            .catch(err => {
                Toast.error(err?.error?.error?.data?.message || err?.error?.data?.message || 'Company add failed try again later')
            })
        } else {
            setErrors(result)
        }
    }

    useEffect(() => {
        (async () => {
          if (showErrors) {
            const result = await validateForm(form, formValidation, notRequired)
            if (result == true) {
              setErrors({})
            } else {
              setErrors(result)
            }
          }
        })()
    }, [form])

    console.log('fpoororo', form, errors)

    return (
        <AddCompanyModalWrapper>
            <div className="modal-header">
                <h3>Add company</h3>
            </div>
            <InputText className={`modal-input`} label={`Name`} name={'name'} onChange={handleOnChange} value={form?.name} error={errors?.name} />
            <InputText className={`modal-input`} label={`Email`} onChange={handleOnChange} name={'email'} value={form?.email} error={errors?.email} />
            <InputText className={`modal-input`} label={`Registration Number`} onChange={handleOnChange} name={'registrationNumber'} value={form?.registrationNumber} error={errors?.registrationNumber} />
            <InputText className={`modal-input`} label={`Address`} name={'address'} onChange={handleOnChange} value={form?.address} error={errors?.address} />
            <InputText className={`modal-input`} label={`UBO (Ultimate beneficial Owner)`} onChange={handleOnChange} name={'ubo'} value={form?.ubo} error={errors?.ubo} />
            <InputText className={`modal-input`} label={`Year`} onChange={handleOnChange} name={'year'} value={form?.year} error={errors?.year} />
            <PDFWrapper> 
                <SellMultiFileInput type="pdf-image" label="Company Documents" name={`companyDocuments`} value={form?.companyDocuments} onChange={uploadImg} />
                {errors?.companyDocuments ? <p className="error">{errors?.companyDocuments}</p> : null}
            </PDFWrapper>
            <div className="d-flex-end">
                <button className="btn-primary-outline" onClick={() => close(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>SUBMIT NOW</button>
            </div>
        </AddCompanyModalWrapper>
    )
};
export default AddCompanyModal;

const AddCompanyModalWrapper = styled.div`
    display:flex;
    flex-flow:column;
    width: 100%;
    max-width: 840px;
    min-width: 840px;
    background: white;
    padding: 60px 100px 77px;
    align-items:center;
    .modal-header {
        h3 {
            font-size: 38px;
            font-weight: 600;
            line-height: 46px;
            text-align: center;
            margin-bottom: 20px;
        }
        p {
            font-size: 18px;
            font-weight: 400;
            line-height: 29px;
            color: #7C7C7C;
            text-align: center;
            max-width: 572px;
            margin-bottom: 69px;
        }
    }
    .grid-2fr {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        .modal-input input {
            min-width: 310px;
        }
    }
    p.error {
        font-size: 12px; 
        line-height: normal;
        margin: 0;
    }
    .modal-input {
        width: 100%;
        margin-bottom: 30px;
        input {
            min-width: 640px;
            font-size: 18px;
            font-weight: 600;
            padding: 11px 17px;
            height: 52px;
            border: 1.5px solid #D0D0D0;
            &:disabled {
                background: linear-gradient(0deg, #F4F9F9, #F4F9F9), linear-gradient(0deg, #D1E0E2, #D1E0E2);
            }
        }
        label {
            margin: 0 0 5px 0;
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
            color: #121212;
        }
    }
    .d-flex-end {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        gap: 2rem;
        margin-top: 30px;
        button {
            font-size: 18px;
            font-weight: 700;
            line-height: 18px;
            padding: 14px 40px;
            cursor: pointer;
        }
        .btn-primary-outline {
            color: #2A7575;
            background: transparent;
            border: 1px solid #2A7575;
        }
        .btn-primary {
            color: white;
            background: #2A7575;
            border: 1px solid #2A7575;
        }
    }
    @media screen and (max-width: 850px) {
        max-width: 840px;
        min-width: auto;
        padding: 40px 24px;
        .modal-header {
            text-align: center;
            h3 {
                font-size: 24px;
                font-weight: 600;
                line-height: 31px;
                letter-spacing: 0.005em;
                margin-bottom: 20px;
            }
            p {
                font-size: 18px;
                font-weight: 400;
                line-height: 29px;
                letter-spacing: -0.011em;
            }
        }
        .modal-input {
            margin-bottom: 20px;
            input {
                min-width: 250px;
                font-size: 22px;
                font-weight: 600;
                line-height: 22px;
            }
        }
        .d-flex-end {
            margin-top: 20px;
        }
    }
    @media screen and (max-width: 575px) {
        padding: 3rem;
        max-width: 100%;
        min-width: 100%;
        .d-flex-end {
            flex-direction: column-reverse;
            width: 100%;
            gap: 16px;
            button {
                padding: 15px 40px;
            }
        }
        .grid-2fr {
            grid-template-columns: 1fr;
            width: 100%;
            grid-gap: 0;
        }
        .modal-input input {
            max-width: 100%;
            min-width: 100%;
        }
    }
`;

const PDFWrapper = styled.div`
    display: block;
    width: 100%;
    margin-bottom: 2rem;
    .img-uploader {
        width: 400px;
        height: 150px;
    }
    .multi-upload-wrapper {
        margin: 0;
        p {
            margin: 0;
        }
    }
    .previewer {
        height: auto;
        display: block;
        a {
            display: block;
            margin-bottom: 5px;
        }
    }
`