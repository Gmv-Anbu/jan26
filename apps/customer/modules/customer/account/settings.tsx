import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonGradientPrimary, ButtonPrimary } from '../../shared/components/button/button'
import { Title } from './profile.styled'
import { FormWrapper, Header, SettingSection } from './settings.styled'
import { useForm, ValidateRule, CreateFormField } from '../../../hooks/form';
import accountService from '../../../api/customer/UserService'
import ImageUploader from '../../shared/components/formInputs/ImageUploader'
import { IFormObjectType } from '../../../hooks/form/useForm'
import { getProfile } from '../../../redux/reducer/userSlice'

import { AppDispatch, RootState } from '../../../redux/store'

const profileForm:IFormObjectType = {
    "firstName": {
        ...CreateFormField('First Name', 'firstName', 'text'),
        validationRules: [
            ValidateRule.requiredRule('First name'),
            ValidateRule.minLengthRule('First name', 3),
            ValidateRule.maxLengthRule('First name', 25),
        ]
    },
    "lastName": {
        ...CreateFormField('Last Name', 'lastName', 'text'),
        validationRules: [
            ValidateRule.requiredRule('Last Name'),
            ValidateRule.minLengthRule('Last Name', 3),
            ValidateRule.maxLengthRule('Last Name', 25)
        ]
    },
    "userName": {
        ...CreateFormField('User Name', 'userName', 'text'),
        validationRules: [
            ValidateRule.requiredRule('User Name'),
            ValidateRule.minLengthRule('User Name', 3),
            ValidateRule.maxLengthRule('User Name', 25)
        ]
    },
    "email": {
        ...CreateFormField('Email ID', 'email', 'email'),
        validationRules: [
            ValidateRule.requiredRule('Email ID'),
            ValidateRule.validateEmail('Email ID')
        ]
    },
    "profilePic":{
        ...CreateFormField('Profile Pic', 'profilePic', 'data'),
        validationRules:[]
    }
};
export default function Settings({ className }: any) {
    const { renderFormInputs, isFormValid, form,setFormValue } = useForm(profileForm);
    const dispatch = useDispatch<AppDispatch>();
    
    const userData = useSelector<RootState,any>((state)=> state?.userData?.userDetails);
    useEffect(()=>{
        setFormValue({
            "firstName": {
                "value": userData?.firstName||'',
            },
            "lastName": {
                "value": userData?.lastName||'',
            },
            "userName": {
                "value": userData?.userName||'',
            },
            "email": {
                "value": userData?.email||'',
            },
            "profilePic":{
                "value":(userData?.profilePicUrl)?`${process.env.NEXT_PUBLIC_ASSET_S3}/${userData?.profilePicUrl}`:''
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userData])
    
    const updateProfile = async ()=>{
        if(isFormValid()){
            const data = {
                "firstName":form?.firstName?.value||'',
                "lastName":form?.lastName?.value||'',
                "userName":form?.userName?.value||'',
                "email":form?.email?.value||'',
            }
            const res = await accountService.updateProfile(data);
            await dispatch(getProfile(undefined))
        }
    }
    const fileHandler = async (fileUrl:string|ArrayBuffer|null,fileBlob:File)=>{
        // const { value, name, files, checked } = e?.target;
        if(fileBlob){
            const res = await accountService.updateProfileImage(fileBlob);
            
        }
        else{
            await accountService.deleteProfileImage()
        }
        await dispatch(getProfile(undefined));
    }
    return (
        <SettingSection className={className || ''}>
            <Header>
                <Title>Profile Settings</Title>
                <Link href="/base/profile" passHref>
                    <ButtonPrimary blockBtn={false} size="sm" marginBottom="0" >Preview</ButtonPrimary>
                </Link>
            </Header>
            <FormWrapper>
                <div className='left'>
                    <ImageUploader
                        label = "Upload your profile picture"
                        value = {form?.profilePic?.value}
                        onChange = {fileHandler}
                    />
                    
                </div>
                <div className='right'>
                {renderFormInputs()}
                <ButtonGradientPrimary onDoubleClick={()=>{}} blockBtn onClick={updateProfile} id="save" fs="1.4" size="sm">Save</ButtonGradientPrimary>
                </div>
            </FormWrapper>
        </SettingSection>
    )
}
