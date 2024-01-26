import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { ModalService } from '@nft-marketplace/modal';
import ErrorModal from '@apps/admin/modules/admin/shared/modal/error';
import ADMIN_API from '../../../../api/admin/auth';
import LoginPageWrapper from '../../components/layout/loginWrapper';
import { useRouter } from 'next/router'
import {
  InputSubmit,
  LinksAnchor,
  FormWrapper,
  InputWrapper,
  InputFeild,
  InputIcon,
  Input,
  BtnWrapper,
} from '../../styled-components/formInputs';
import SuccessModal from '../../shared/modal/success';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  const router = useRouter()

  const handleSubmit = (e: any) => {
    if (!validateEmail(email)) {
      ModalService.open((modalProps: any) => (
        <ErrorModal
          title="Alert"
          desc={'Please enter a valid email'}
          close={modalProps.close}
        />
      ));
    } else {
      ADMIN_API.forgotPassword({ email }).then((res) => {
        if (res.status === 200) {
          ModalService.open((modalProps: any) => (
            <SuccessModal
              title="Success"
              desc={res?.data?.data?.message || "Success"}
              close={modalProps.close}
            />
          ));
          router.push('/')
        } else {
          ModalService.open((modalProps: any) => (
            <ErrorModal
              title="Alert"
              desc={res?.statusText}
              close={modalProps.close}
            />
          ));
        }
      }).catch(() => {
        ModalService.open((modalProps: any) => (
          <ErrorModal
            title="Alert"
            desc={'Please enter a valid email'}
            close={modalProps.close}
          />
        ));
      })
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  return (
    <LoginPageWrapper
      title={`Forgot Password?`}
      subTitle={`Enter your details to recieve a reset link`}
    >
      <FormWrapper>
        <InputWrapper>
          <InputFeild>
            <InputIcon className="at-the-rate"></InputIcon>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="email@address.com"
              onChange={(e) => setEmail(e?.target?.value)}
            />
          </InputFeild>
        </InputWrapper>
        <BtnWrapper className="mb-3">
          <InputSubmit onClick={handleSubmit} onDoubleClick={()=>{}}>Send Link</InputSubmit>
        </BtnWrapper>
        <Link href="/auth/login/" passHref>
          <a>
            <LinksAnchor className="primary">Back to Sign In</LinksAnchor>
          </a>
        </Link>
      </FormWrapper>
    </LoginPageWrapper>
  );
};

export default ForgotPassword;
