// import InputText from '@apps/admin/modules/shared/components/formInputs/inputText';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import API from '../../../api/admin';
import { ModalService } from '@nft-marketplace/modal';
import SuccessModal from '../shared/modal/success';
import ErrorModal from '../shared/modal/error';
import { ModalBackground,ModalContainer,Errormsg,FilterHeader,ButtonComponent,Line } from '../styled-components/FilterModalStyle';

interface ICommissionData {
  PRIMARY: string,
  SECONDARY: string
}
interface IError {
  status: boolean,
  PRIMARY: string,
  SECONDARY: string
}

const initialCommissionData = { PRIMARY: "0.00", SECONDARY: "0.00" }
const errorInitialData = { status: false, PRIMARY: "", SECONDARY: "" }



const CommissionUpdateModal = ({ setCommissionModal }) => {

  const [data, setData] = useState<ICommissionData>(initialCommissionData)
  const [oldValue, setOldValue] = useState<ICommissionData>(initialCommissionData)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<IError>(errorInitialData)

  const getCommissions = () => {
    API.getCommissions().then(res => {
      if (res.status === 200) {
        setData(res?.data?.data)
        setOldValue(res?.data?.data)
      }
    })
  }

  const updateCommissions = (formData: ICommissionData) => {
    const promiseArray: Array<any> = []
    promiseArray.push(API.updateCommissions({ type: "PRIMARY", fee: Number(formData?.PRIMARY) }))
    promiseArray.push(API.updateCommissions({ type: "SECONDARY", fee: Number(formData?.SECONDARY) }))

    Promise.all(promiseArray)
      .then(() => {
        setCommissionModal(false);
        ModalService.open((modalProps: any) =>
          <SuccessModal title="Success" desc={'Commission updated successFully'} close={modalProps.close} />
        )
      })
      .catch(() => {
        ModalService.open((modalProps: any) =>
          <ErrorModal close={modalProps.close} />
        )

      });
  }

  const handleChange = (value: string, name: string) => {
    value = value.replace("%", '')

    if (/^\d*\.?\d*$/.test(value)) {
      setData({ ...data, [name]: value })
    }

    if (Number(value).toFixed(2) === "0.00") {
      setError({ ...error, status: true, [name]: "Minimum value 0.01 required" })
    } else {
      const errObj = { ...error, [name]: "" }
      errObj.status = errObj.PRIMARY || errObj.SECONDARY ? true : false
      setError(errObj)
    }
  }

  useEffect(() => {
    getCommissions()
  }, [])
  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader
            onClick={() => {
              setCommissionModal(false);
            }}
          >
            <section>
              <h3>Commission Settings</h3>
              <Div>Update your coommission settings</Div>
            </section>
            <span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </span>
          </FilterHeader>


          <Line />

          <section>
            <EditWrapper>
              <h3>{editMode ? "Setup Your Commissions" : "Current Commissions"}</h3>
              <span>
                <Image src="/svgs/icons/edit-pencil.svg" alt="edit-icon" width="18" height="15" />
                <Edit onClick={() => setEditMode(true)}>Edit</Edit>
              </span>

            </EditWrapper>

            <EditSubTxt>Setup your new commission rate for each sale in the platform</EditSubTxt>
          </section>

          <CommissionBg>
            <div>
              <InputWrapper>
                <InputLabel>Primary Commisison</InputLabel>
                <InputText name="PRIMARY" disabled={!editMode} value={data.PRIMARY + "%"} onChange={(e) => handleChange(e.target.value, e.target.name)} />
              </InputWrapper>
              <ErrorLabel>{error.PRIMARY}</ErrorLabel>
            </div>

            <div>
              <InputWrapper>
                <InputLabel>Secondary Commisison</InputLabel>
                <InputText name="SECONDARY" disabled={!editMode} value={data.SECONDARY + "%"} onChange={(e) => handleChange(e.target.value, e.target.name)} />
              </InputWrapper>
              <ErrorLabel>{error.SECONDARY}</ErrorLabel>
            </div>
          </CommissionBg>

          <InfoWrapper>
            <Image src="/svgs/icons/info.svg" alt="info-icon" width="18" height="18" />
            <InfoText>Your Commission rate will be changes once you update the amount</InfoText>
          </InfoWrapper>



          <Line></Line>
          <ButtonComponent>
            <Button1
              disabled={!editMode || loading}
              onClick={() => {
                setData(oldValue)
                setError(errorInitialData)
              }}
            >
              Reset
            </Button1>
            <Button2
              disabled={!editMode || error.status || loading}
              onClick={() => {
                setLoading(true)
                updateCommissions(data)
              }}
            >
              {loading ? <>Updating...  <Spinner src={`/svgs/loader.svg`} alt='loading' width="20" height="20" /></> : "Update"}
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CommissionUpdateModal;

const CommissionBg = styled.div`
padding:8px;
background: #F5F5F5;
border-radius: 5px;`

const InputLabel = styled.span`
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: .8vw;
line-height: 24px;
color: #000000;
`
const ErrorLabel = styled.div`
color:red;
padding:0 20px;
margin:0;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: .7vw;
line-height: 20px;
`
const InputWrapper = styled.div`
margin-bottom: 18px;
padding:0 20px;
display:flex;
justify-content:space-between;
 align-items:center;
`

const InputText = styled.input`
width:102px;
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #BAC6D9;
border-radius: 6px;
padding: 2px 10px;
`;

const InfoWrapper = styled.div`
margin-top: 20px;
box-sizing: border-box;
background: linear-gradient(89.95deg, rgba(42, 155, 211, 0.09) 0.04%, rgba(49, 86, 154, 0.09) 99.95%);
border: 1px solid rgba(102, 147, 196, 0.45);
border-radius: 4px;

display : flex;
`;

const InfoText = styled.span`
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 140%;

color: #333333;
padding-left:6px;
`
const EditWrapper = styled.div`
display : flex;
justify-content:space-between;
`
const Edit = styled.a`
color:blue;
cursor:pointer;
padding-left: 3px;
text-decoration: underline;
`
const Button1 = styled.button`
  height: auto;
  width: 100px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  background: ${props => props.disabled ? "#cccccc" : "#ffffff"};
  color: ${props => props.disabled ? "#ffffff" : "#23487b"};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #bac6d9;
  cursor: ${props => props.disabled ? "auto" : "pointer"};
`;
const Button2 = styled.button`
  padding: 10px;
  background: ${props => props.disabled ? "#cccccc" : "linear-gradient(266.81deg, #305498 3.68%, #25c0f2 144.79%)"};
  border-radius: 6px;
  width: 154px;
  height: auto;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: ${props => props.disabled ? "auto" : "pointer"};
`;

const Div = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin: 10px 0px;
`;
const EditSubTxt = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin: 10px 0px;
  max-width:75%;
`;

const rotate = keyframes`
from {
  tranform:rotate(0deg);
}
to{
  transform:rotate(360deg);
}
`

const Spinner = styled.img`
animation:${rotate} infinite 1s linear;
`