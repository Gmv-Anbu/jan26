import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalBackground,ModalContainer,Errormsg,FilterHeader,ButtonComponent,Button1,Button2,Dropdown,DropdownDate,DHead,DateL,Select,SelectD,Option,Line } from '../styled-components/FilterModalStyle'

const CreatorFilterModal = ({ setOpenModal, data, onApplyFilter, onResetFilter, requestsToggle }) => {
  const [from, setFrom] = useState(data.from);
  const [to, setTo] = useState(data.to);
  const [statusType, setStatusType] = useState(data.status);

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <h3>Filter By</h3>
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

          {requestsToggle && <Dropdown>
            <DHead>Status</DHead>
            <Select onChange={(e: any) => setStatusType(e.target.value)} value={statusType}>
              <Option value="pending">Pending</Option>
              <Option value="declined">Declined</Option>
              <Option value="approved">Approved</Option>
            </Select>
          </Dropdown>}

          <DropdownDate>
            <DateL>From</DateL>
            <SelectD
              onChange={(e: any) => setFrom(e.target.value)}
              type="date"
              value={from}
            ></SelectD>
          </DropdownDate>
          <DropdownDate>
            <DateL> To</DateL>
            <SelectD
              onChange={(e: any) => setTo(e.target.value)}
              type="date"
              value={to}
            ></SelectD>
          </DropdownDate>

          <Line></Line>
          <ButtonComponent>
            <Button1
              onClick={() => {
                onResetFilter({ from: null, to: null });
                setTo('');
                setFrom('');
                setStatusType('pending');
              }}
            >
              Reset
            </Button1>
            <Button2
              onClick={() => onApplyFilter({ from: from, to: to, status: statusType })}
            >
              Apply Filter
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CreatorFilterModal;