import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next';
import AdminLayout from '../../modules/admin/components/layout/layout';
import BackButton from '../../modules/admin/components/button/backButton';
import styled from 'styled-components';
import InputText from '../../modules/shared/components/formInputs/inputText'
import InputTextarea from '../../modules/shared/components/formInputs/inputTextarea';
import InputSelect from '../../modules/shared/components/formInputs/inputSelect';
import { ButtonGradientPrimary } from '../../modules/shared/components/button/button';
import ErrorModal from '../../modules/admin/modal/error';
import SuccessModal from '../../modules/admin/modal/success';
import Select from 'react-select';
import API from '../../api/admin/index';
import { ModalService } from '@nft-marketplace/modal';
import { Loader } from '@apps/admin/modules/shared/components/Loader';
import {  CharacterCount } from '../../utils/helper';

const Container = styled.div`
width: 100%;
`
const FormWrapper = styled.form`
max-width: 50vw;
padding: 4rem ;
background: #ffffff;
box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
border-radius: 8px;
`
const SelectWrapper = styled.div`
font-family: Poppins;
margin-bottom: 1.6rem;
&:last-child {
    margin-bottom: 0rem;
}
label {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.1rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.fontcolor};
    display: inline-block;
}
.react-select__control {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 1.2rem;
    padding: 0;
    box-shadow: none;
    &--is-focused, &--is-focused:hover  {
        border-radius: 1.2rem 1.2rem 0 0;
        border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
    .react-select__input-container, .react-select__single-value {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: normal;
        color: ${({ theme }) => theme.colors.fontdark};
        padding: 0;
        margin: 0;
    } 
    .react-select__value-container {
        padding: 1.6rem;
    }
    .react-select__placeholder {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: normal;
        color: ${({ theme }) => theme.colors.fontdark};
    }
    .react-select__indicator-separator {
        display: none;
    }
    .react-select__indicator {
        color: ${({ theme }) => theme.colors.fontdark};
        padding: 1.6rem;
    }
}
.react-select__menu {
    border: 1px solid ${({ theme }) => theme.colors.borderColor}; 
    background-color: ${({ theme }) => theme.colors.mainBG} !important;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.react-select__menu-list {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.react-select__option {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colors.fontdark};
}
.react-select__option {
    color: ${({ theme }) => theme.colors.fontdark};
}
.react-select__option--is-selected {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
}
.react-select__option--is-focused {
    background: ${({ theme }) => theme.colors.selectBg};
}
`
const AddFqa: NextPage = (props: any) => {

    const options = [
        { value: 'general', label: 'General' },
        { value: 'bid', label: 'Bid' },
        { value: 'payment', label: 'Payment' },
        { value: 'transaction', label: 'Transaction' },
    ]
    const nameRef = useRef(null);
    const quesRef = useRef(null);
    const answerRef = useRef(null);
    const router = useRouter();
    const [errors, setErrors] = useState<any>(null)
    const [FAQId, setFAQId] = useState(null)
    const [apiError, setAPIError] = useState<any>(null)
    const [showModal, setShowModal] = useState(false);
    const [textCount, setTextCount] = useState(0);
    const [disabledCreate,setdisabledCreate]= useState(false);
    const [data, setData] = useState<any>({})
    const [isEdit,setIsEdit]= useState(false);
    const [form, setForm] = useState({
        type: '',
        question: '',
        answer: ''
    })
    const openModal = () => setShowModal(true);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState(null);
    const [descriptionCount, setDescriptionCount] = useState(0)
    useEffect(() => {
        if (router?.query?.id && Number(router?.query?.id)) {
            const id = Number(router?.query?.id);
            setFAQId(id);
            setIsEdit(true);
        }
    }, [router]);
    const closeModal = () => {
        setShowModal(false)
        if (!apiError) goToFAQ()
    }
    const meta = {
        title: 'NFT2.0 | Admin Add FAQ',
        description: 'Admin Add FAQ'
    }

  useEffect(()=>{
    if(FAQId){
        getFAQValue();
    }   
  },[FAQId])

    const goToFAQ = () => {
        router.push('/FAQ')
    }

    const getFAQValue=()=>{
        const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
        API.getFAQbyId(FAQId).then((res)=>{
            if (res?.data !== null && res?.status === 200) {
                setForm({
                    question:res.data.data.question,
                    answer:res.data.data.answer,
                    type:res.data.data.type
                })
                setDescriptionCount(CharacterCount(res.data.data.answer)); 
                ModalService.close(fullLoader)
            }
        }).catch((err)=>{
            ModalService.close(fullLoader)
            console.log(err)
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let localError = { ...errors };
        Object.entries(form).forEach(([key, value]) => {
            if (!value) {
                localError[key] = key + ' is required';
            }
        })
        if (localError!=null && Object.values(localError).length > 0 && Object.values(localError).every((obj)=> obj!=null)) {
            setErrors(localError);
            return
        } else {
            setErrors(null);
        }
        if (isEdit) {
            editFaq();
        } else {
            AddFaq();
        }
    }

    const AddFaq = () => {
        setdisabledCreate(true);
        const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
        API.addFaq(form).then((res) => {
            if (res?.data !== null && res?.status === 200) {
                ModalService.close(fullLoader)
                setData(res?.data)
                setAPIError(null)
                openModal()
                setdisabledCreate(false);
            } else if (res?.error?.error) {
                ModalService.close(fullLoader)
                ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
            }
        }).catch((err) => {
            
            ModalService.close(fullLoader)
            console.log(err)
            setdisabledCreate(false);
        })
    }
    const editFaq = () => {
        setdisabledCreate(true);
        const fullLoader = ModalService.open(() => <Loader width="100" height="60" />, { closeIcon: false })
        API.updateFaq(form, FAQId).then((res) => {
            if (res?.data !== null && res?.status === 200) {
                ModalService.close(fullLoader)
                setData(res?.data)
                setAPIError(null)
                openModal()
            } else if (res?.error?.error) {
                ModalService.close(fullLoader)
                ModalService.open((modalProps: any) => <ErrorModal title="Alert" desc={res?.error?.error?.message} close={modalProps.close} />)
                setdisabledCreate(false);
            }
        }).catch((err) => {
            ModalService.close(fullLoader)
            console.log(err)
            setdisabledCreate(false);
        })
    }

    const handleOnChange = (inputField, value) => {
        if(errors!=null && Object.entries(errors).length > 0){
            let localError={...errors}
            if(!value){
                localError[inputField]=inputField + ' is required'
                setErrors(localError)
            }else{
                localError[inputField]=null;
                setErrors(localError)
            }
         
        }
       
        let localform = { ...form };
        if (value) {
            localform[inputField] = value;
        } else {
            localform[inputField] = '';
        }
        setForm(localform)
        if(inputField=='answer'){
           setDescriptionCount(CharacterCount(value)); 
        }
    }




    return (
        <AdminLayout meta={meta} pageTitle={`Add FAQ`}>
            <Container>
                <BackButton onClick={() => goToFAQ()} />
                <FormWrapper>
                    <div className="inner-box margin-bottom-3vh">
                        <SelectWrapper>
                            <label className='color-black required-red label-font'>Type</label>
                            <Select
                                className='select-css'
                                placeholder='Type'
                                classNamePrefix='react-select'
                                options={options}
                                isClearable
                                name="type"
                                value={form?.type ? ({
                                    value: form?.type,
                                    label: options.filter((obj) => obj.value == form?.type)[0]?.label
                                }) : null}
                                onChange={(e: any) => { handleOnChange('type', e?.value ? e.value : null) }}
                            />
                            {errors?.type && (<p className='error'>Type is required</p>)}
                        </SelectWrapper>
                    </div>
                    <div className="inner-box">
                        <InputText label={`Question`} error={errors?.question} onChange={(e: any) => { handleOnChange('question', e.target.value) }} value={form?.question} name={`question`} placeholder={`Enter Question`} required={true} maxLength={300} />
                        <p className='remaining-info'>{form?.question?.length ? 300-form?.question.length:'300'} characters remaining</p>
                    </div>
                    <div className="inner-box">
                        <InputTextarea label={`Answer`} descriptionCount={descriptionCount} error={errors?.answer} onChange={(e: any) => { handleOnChange('answer', e.target.value) }} value={form?.answer} name={`description`} placeholder={`Enter Answer`} required={true} />
                    </div>
                    <div className="inner-box">
                        <div className="btn-wrp pos-flex-end">
                            <ButtonGradientPrimary className="create-faq-btn" disabled={disabledCreate} onClick={handleSubmit} blockBtn size={`lg`}>
                                {isEdit ? 'Update ' : 'Create '} FAQ
                            </ButtonGradientPrimary>
                        </div>
                    </div>
                </FormWrapper>
                {apiError ? <ErrorModal show={showModal} closeModal={closeModal} msg={apiError} /> : <SuccessModal show={showModal} closeModal={closeModal} title={data?.message} />}
            </Container>
        </AdminLayout>

    )
}

export default AddFqa;