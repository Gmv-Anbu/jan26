import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import InputText from '../../shared/components/formInputs/inputText';
import TextEditor from '../../shared/components/formInputs/richTextEditor';
import InputRadio from '../../shared/components/formInputs/inputRadio';
import { InputWrapper, InputLabel } from '../../shared/styled-components/formInputs';
import { ButtonGradientPrimary, ButtonTransparent } from '../../shared/components/button/button';
import { ModalService } from '@nft-marketplace/modal';
import API from '@apps/admin/api/admin/index';
import SuccessModal from '../shared/modal/success';
import { APP_ENV } from '@apps/admin/config';

const FormWrapper = styled.div`
  background: #ffffff;
  box-shadow: 5px 0px 17px rgb(0 0 0 / 6%);
  border-radius: 8px;
  padding: 3rem;
  margin-right: 20px;
  .inner-box {
    background: #fafafa;
    border-radius: 8px;
    padding: 2rem 3.5rem;
    margin-bottom: 18px;
  }
`;

const Container = styled.div`
margin-top: 20px;
background: #F6F6F6;
min-height: 100vh;
height: 100%;
width: 100%;
padding: 80px 80px;
width: calc(100% + 30px);`
    ;

const Title = styled.div`
font-family: 'Inter';
font-style: semibold;
font-weight: 500;
font-size: 20px;
line-height: 24px;
color: #1B1B1B;
margin: 0px 40px 20px;
`;

const FormContent = styled.div`
display:flex;
justify-content: center;

.left-content{
    width: 70%
}
.right-content{
    width: 25%;
    height: 170px;
    .radio-btn {
        font-family: 'Inter';
        font-style: regular;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #3A3A3A
        ;
    }
}
`;

const LeftContainer = styled.div`
display:flex;
width: 52%;
justify-content: center;
display: flex;
flex-direction: column;
.content{
    margin-bottom: 12px;
}
`;

const FooterText = styled.div`
.title{
    font-family: 'Inter';
    font-style: regular;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 16px;
    weight:500px;
}
.heading{
    font-family: 'Inter';
    font-style: regular;
    font-size: 20px;
    line-height: 24px;
    color: #2C79B7;
    margin: 20px 0px;
}
.subheading{
    font-family: 'Inter';
    font-style: regular;
    font-size: 14px;
    line-height: 17px;
    color: #8C8C8C;
}
`;

const FormButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width:500px;
    .btn {
        margin : 10px;
        }

`

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
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
`;


const PageForm = ({ editData }) => {
    const formOG = {
        name: '',
        content: '',
        visibility: 'visible',
    };

    const nameRef = useRef(null);
    const [form, setForm] = useState(formOG);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    const handleTextEditorChange = (value) => {
        setForm({
            ...form,
            content: value,
        });
    }

    const handleOnChange = (e: any) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = async () => {
        if (!form.name || !form.content) {
            errors.name = !form.name ? "Please enter name" : '';
            errors.content = !form.content ? "Please enter content" : '';
            setErrors({ ...errors });
            return false;
        }
        const body = {
            name: form.name,
            content: form.content,
            isActive: form?.visibility === 'visible' ? true : false,
        };

        API.addPage(body)
            .then((response) => {
                if (response?.status === 200) {
                    showSuccessModal(response?.data?.message)
                }
            })
            .catch((error) => {
                errors.apiError = error?.response?.data?.message;
                setErrors({ ...errors });
            });
    };

    useEffect(() => {
        if(editData && Object.keys(editData).length > 0) {
            getAllPages();
        }
    }, [editData]);

    const getAllPages = async () => {
        const params: any = {
          page: 1,
          items: 100,
          search: editData?.key
        }
    
        API.getAllPages(params)
          .then((response) => {
            if (response?.status === 200) {
              const data = response?.data?.data?.pageList[0];
              const { name, content, isActive } = data;
              form.name = name;
              form.content = content;
              form.visibility = isActive ? 'visible' : 'hidden';
              setForm({...form});
            }
          })
          .catch((error) => {
            console.log('Error in getAllPages: ', error)
          })
      }

    const onEdit = async () => {
        const body = {
            name: form.name,
            content: form.content,
            isActive: form?.visibility === 'visible' ? true : false,
        }
        API.updatePage(editData?.id, body).then((response) => {
            if (response) {
                showSuccessModal(response?.data?.message)
            }
        }).catch((error) => {
            console.log('Error in enableOrDisable: ', error);
        })
    }

    const showSuccessModal = (message: string) => {
        const success = ModalService.open((modalProps: any) => (
            <SuccessModal
                title="Success"
                desc={message}
                close={() => handleClose(success)}
            />
        ));
    }

    const handleClose = (modal: any) => {
        ModalService.close(modal);
        goBack();
    };

    const getPageKey = () => {
        const preSlug = form?.name?.toLowerCase();
        const slug = preSlug.split(' ').join('-');
        return slug;
    }

    const pageKey = getPageKey()

    const goBack = () => {
        router.back()
      }    

    return (
        <>
            <BackButtonContainer>
                <IconContainer onClick={goBack}>
                    <Image src={'/svgs/icons/icon-arrow.svg'} width={10} height={10} alt={'icon'} />
                </IconContainer>
                <BackText onClick={goBack}>Back</BackText>
            </BackButtonContainer>
            <Container>
            <Title>Pages</Title>
            <FormContent>
                <LeftContainer className='left-content'>
                    <FormWrapper className='content'>
                        <InputText
                            label={`Title`}
                            inputRef={nameRef}
                            error={errors?.name}
                            onChange={handleOnChange}
                            value={form?.name}
                            name={`name`}
                            placeholder={`eg. Contact US`}
                        />
                        <TextEditor value={form?.content} onChange={handleTextEditorChange} />
                    </FormWrapper>
                    <FormWrapper>
                        <InputWrapper>
                            <FooterText>
                                <InputLabel required={false}>Search Engine Listing preview</InputLabel>
                                <div className='heading'>{form?.name}</div>
                                <div className='subheading'>{`${APP_ENV.CUSTOMER_WEB_URL}base/${pageKey}`}</div>
                            </FooterText>
                        </InputWrapper>
                        <FormButton>
                            <ButtonTransparent className='btn' onClick={goBack} blockBtn size={`md`}>
                                Discard
                            </ButtonTransparent>
                            <ButtonGradientPrimary className='btn' onClick={editData && Object.keys(editData).length > 0 ? onEdit : handleSubmit} blockBtn size={`md`}>
                                Save Changes
                            </ButtonGradientPrimary>
                        </FormButton>
                    </FormWrapper>
                </LeftContainer>
                <FormWrapper className='right-content'>
                    <InputWrapper>
                        <InputLabel required={false}>Visibility</InputLabel>
                        <InputRadio
                            value="visible"
                            id="visible"
                            checked={form?.visibility === 'visible'}
                            onChange={handleOnChange}
                            label="Make Page Visible"
                            name="visibility"
                        />
                        <InputRadio
                            value="hidden"
                            id="hidden"
                            checked={form?.visibility === 'hidden'}
                            onChange={handleOnChange}
                            label="Hidden"
                            name="visibility"
                        />
                    </InputWrapper>
                </FormWrapper>
            </FormContent>
        </Container >
        </>
    );
};

export default PageForm;
