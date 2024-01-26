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

const SellModal = ({ close, commonModalPopup }: any) => {
    
    const ogForm = {
        name: '',
        description: '',
        mainAssetUrl: '',
        supportAssetUrl: [],
        price: '',
        address: '',
        width: '',
        length: '',
        weight: ''
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
    const [mainAssetLoader, setMainAssetLoader] = useState(false)
    const [supportFileLoader, setSupportFileLoader] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('user'))

    const handleOnChange = (e: any) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { value, name, files, checked } = e?.target
        if (name === 'mainAssetUrl' || name === 'supportAssetUrl') {
            if (files.length) {
                setForm({
                    ...form,
                    [`${name}`]: null,
                })
            }
            const [file] = files
            if (file) {
                uploadImg(file, name)
                if (name === 'mainAssetUrl') {
                    setMainAssetLoader(true)
                }
                if (name === 'supportAssetUrl') {
                    setSupportFileLoader(true)
                }
            }
        } else if (name === 'price' || name === 'width' || name === 'length' || name === 'weight') {
          const val = acceptOnlyNumbers(value)
          setForm({
            ...form,
            [name]: val,
          })
        } else {
          setForm({
            ...form,
            [name]: value,
          })
        }
    }

    const uploadImg = (file: any, name: string) => {
        console.log('extra', file, name)
        API.sellImgUpload(file)
          .then((res: any) => {
            if (res?.data?.data?.key) {
                let img = handleApiImage(res?.data?.data?.key)
                let data = objectDeepClone(form)
                if(name === 'mainAssetUrl') {
                    setForm({
                        ...form,
                        [`${name}`]: img,
                      })
                } else {
                    data.supportAssetUrl.push(img)
                    setForm(data)
                }
                console.log('res', res, name, img, data)
            } else if (res?.data === null) {
              const errMsg = formatAPIError(res?.error)
            }
          })
          .catch((err: any) => {
            console.log(err)
          })
      }

    // const handleSuppportFileUpload = async (file: File) => {
    //     API.uploadSupportImage(file)
    //     .then((res) => {
    //       if (res?.data?.data?.s3Key) {
    //         const temp: any = [
    //           ...form.supportingAssetMediaFiles,
    //           {
    //             filePath: handleApiImage(res?.data?.data?.s3Key),
    //             fileType: res?.data?.data?.fileType,
    //           },
    //         ]
    //         setForm({
    //           ...form,
    //           supportingAssetMediaFiles: temp,
    //         })
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }

    const handleSubmit = async (e: any) => {
        setShowErrors(true)
        const result = await validateForm(form, formValidation, notRequired)
        if (result === true) {
            setErrors({})
            let payload = {}
            for (const [key, value] of Object.entries(form)) {
                if(value) payload[key] = value
            }
            console.log('final payload', payload)
            API.sellWatch(payload)
            .then(res => {
                console.log('res', res)
                if(res?.data?.message && res?.status === 200) {
                    commonModalPopup('success', res?.data?.message || 'Sell request added successfully')
                } else {
                    commonModalPopup('error', res?.error?.error?.message || res?.error?.message || 'Sell request failed try again later')
                }
                close()
            })
            .catch(err => {
                commonModalPopup('error', err?.error?.error?.data?.message || err?.error?.data?.message || 'Sell request failed try again later')
                close()
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

    return (
        <SellModalWrapper>
            <div className="modal-header">
                <h3>Sell Your Watch</h3>
                <p>Get a quote by submitting the below details</p>
            </div>
            <InputText className={`modal-input`} label={`Asset Name`} name={'name'} onChange={handleOnChange} value={form?.name} error={errors?.name} />
            <InputText className={`modal-input`} label={`Description`} onChange={handleOnChange} name={'description'} value={form?.description} error={errors?.description} />
            <InputText className={`modal-input`} label={`User Email`} onChange={handleOnChange} name={'email'} disabled value={userDetails?.email} />
            <div className="grid-2fr">
                <InputText className={`modal-input`} label={`Width of Asset`} onChange={handleOnChange} name={'width'} value={form?.width} error={errors?.width} />
                <InputText className={`modal-input`} label={`Height of Asset`} onChange={handleOnChange} name={'length'} value={form?.length} error={errors?.length} />
            </div>
            <div className="grid-2fr">
                <InputText className={`modal-input`} label={`Weight of Asset`} onChange={handleOnChange} name={'weight'} value={form?.weight} error={errors?.weight}/>
                <InputText className={`modal-input`} label={`Price`} onChange={handleOnChange} name={'price'} value={form?.price} error={errors?.price}/>
            </div>
            <div className="grid-2fr"> 
                <SellInputFile
                    noBG={true}
                    label={`Upload Images`}
                    name={`mainAssetUrl`}
                    value={form?.mainAssetUrl || ''}
                    onChange={(e: any) => handleOnChange(e)}
                    error={errors?.mainAssetUrl}
                    spinloader={mainAssetLoader}
                    endLoader={() => {
                        setMainAssetLoader(false)
                    }}
                />
                {/* <SellInputFile
                    noBG={true}
                    label={`Support Images`}
                    name={`supportAssetUrl`}
                    value={form?.supportAssetUrl || ''}
                    onChange={(e: any) => handleOnChange(e)}
                    error={errors?.supportAssetUrl}
                    spinloader={supportFileLoader}
                    endLoader={() => {
                        setSupportFileLoader(false)
                    }}
                /> */}
                <SellMultiFileInput name={`supportAssetUrl`} value={form?.supportAssetUrl} onChange={uploadImg} />
            </div>
            <InputText className={`modal-input`} label={`Address`} onChange={handleOnChange} name={'address'} value={form?.address} error={errors?.address} />
            <div className="d-flex-end">
                <button className="btn-primary-outline" onClick={close}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>SUBMIT NOW</button>
            </div>
        </SellModalWrapper>
    )
};
export default SellModal;

const SellModalWrapper = styled.div`
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