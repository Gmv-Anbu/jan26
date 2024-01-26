import React, { useRef } from 'react'
import styled from 'styled-components';
import { ModalBackground,ModalContainer,Errormsg,FilterHeader,ButtonComponent,Button1,Button2,Dropdown,DropdownDate,DHead,DateL,Select,SelectD,Option,Line } from '../styled-components/FilterModalStyle';

const CreatorRejectModal = ({ setRejectModal, rejectionData, setRejectionData, handleReject }) => {
   
  const inputref=useRef<HTMLInputElement | null>()
  return (
    <ModalBackground>
      <ModalContainer>
        <FilterHeader
          onClick={() => {
            setRejectModal(false);
          }}
        >
          <h3>Reject creator request</h3>
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

        <RejectInput>
          <InputLabel>Reason*</InputLabel>
          <InputText
            onChange={(e: any) => setRejectionData({ ...rejectionData, reason: e.target.value })}
            type="text"
            value={rejectionData.reason}
            ref={inputref}
          ></InputText>
        </RejectInput>

        <ButtonComponent>
          <Button1
            onClick={() => {
              setRejectionData({ ...rejectionData, reason: '' })
            }}
          >
            Reset
          </Button1>
          <Button2
            onClick={() => {
              if (rejectionData.reason) {
                handleReject(rejectionData)
                setRejectModal(false)
              }else{
                inputref.current.focus()
              }

            }}
          >
            Reject
          </Button2>
        </ButtonComponent>
      </ModalContainer>
    </ModalBackground>
  )
}

export default CreatorRejectModal;

const RejectInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  margin-top: 10px;
  margin-bottom: 20px;
`;

const InputLabel = styled.h3`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #323232;
  margin-top: 25px;
  margin-bottom: 10px;
  line-height: 21px;
`;

const InputText = styled.input`
  /* width: 100%;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #bac6d9;
  border-radius: 6px; */
  width: 100%;
  padding: 10px;
  font-size: 16px;
  line-height: 1;
  border: 1px solid #bac6d9;
  border-radius: 5px;
`;