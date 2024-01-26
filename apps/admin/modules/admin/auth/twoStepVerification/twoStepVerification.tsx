import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import OtpInput from 'react18-input-otp';
import styled from 'styled-components';

import { KEYS } from '../../../../utils/storage';
import { getCookie } from '@nft-marketplace/js-cookie';
import actions from '../../../../redux/actions';
import { AppDispatch, RootState } from '../../../../redux/store';
import auth from '@apps/admin/api/admin/auth';
import LoginPageWrapper from '../../components/layout/loginWrapper';
import {
  InputSubmit,
  FormWrapper,
  BtnWrapper,
  InputError,
} from '../../styled-components/formInputs';

const { twoFactorLogin } = actions;

const OtpWrapper = styled.div`
  text-align: center;
`;

const VerifyNumberSection = styled.div`
  justify-content: space-around;
  padding: 1.5rem 0;
  display: flex;
`;

const OtpBox = styled(OtpInput).attrs({
  inputStyle: {
    width: '38px',
    height: '38px',
    margin: '11px',
    color: `${({ theme }) => theme.colors.loginHeader}`,
    border: `1px solid ${({ theme }) => theme.colors.inputBorder}`,
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '22px',
  },
  focusStyle: {
    border: `1px solid ${({ theme }) => theme.colors.inputBorder}`,
    outline: '1px solid black',
  },
})``;

const OtpError = styled(InputError)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const QrImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QrImage = styled.img``;

const TwoStepVerification = () => {
  const router = useRouter();
  const userData = useSelector<RootState, any>(
    (state) => state?.userData?.userDetails
  );
  const dispatch = useDispatch<AppDispatch>();
  const [otpValue, setOtpValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (value: string) => {
    setOtpValue(value);
  };

  const handleSubmit = () => {
    if (otpValue.length < 6) setErrorMessage('Please enter all fields');
    else {
      let formData = { email: userData.email, otp: otpValue };
      dispatch(twoFactorLogin(formData))
        .then((res: any) => {
          if (getCookie(KEYS.ADMIN_TOKEN)) {
            router.push('/');
          }
          let { code } = res.error.error;
          if (code === 412) {
            setErrorMessage('Invalid code');
          }
        })
        .catch((err: any) => {
          // console.log(err);
        });
    }
  };

  return (
    <OtpWrapper>
      <LoginPageWrapper
        title={`2 Factor Authentication`}
        subTitle={`Please enter the verification code from your Google Authenticator App.`}
      >
        <FormWrapper>
          {userData?.qr && (
            <QrImageContainer>
              <QrImage src={userData?.qr} alt="qr" />
            </QrImageContainer>
          )}
          <VerifyNumberSection>
            <OtpBox
              isInputNum
              value={otpValue}
              shouldAutoFocus
              numInputs={6}
              onChange={handleChange}
            />
          </VerifyNumberSection>
          <OtpError>{errorMessage}</OtpError>
          <BtnWrapper>
            <InputSubmit onClick={handleSubmit} onDoubleClick={()=>{}}>Verify code</InputSubmit>
          </BtnWrapper>
        </FormWrapper>
      </LoginPageWrapper>
    </OtpWrapper>
  );
};

export default TwoStepVerification;
