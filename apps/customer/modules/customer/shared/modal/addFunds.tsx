import Image from 'next/image';
import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { ButtonGradientPrimary } from '../../../shared/components/button/button';
import { useWeb3Context } from '@nft-marketplace/wallet-selector';
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import { handleApiImage } from '@apps/customer/utils/helper';
interface ModalProps {
  show?: boolean;
}

const AddFundsModalWrapper = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 1072;
  display: none;
  transition: opacity 0.25s linear;
  &.show {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    width: 100%;
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: ${({ theme }) => theme.colors.black};
      opacity: 0.4;
    }
    .modal-dialog {
      transform: translate(0, 0);
    }
  }
`;
const ModalDialog = styled.div<ModalProps>`
  max-width: 48rem;
  margin: 0rem auto;
  position: relative;
  width: 100%;
  pointer-events: none;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  transform: translate(0, -25%);
`;
const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width:60rem;
  pointer-events: auto;
  background-color: ${({ theme }) => theme.colors.modelContentColor};
  border-radius: 1.5rem;
`;
const ModalHeader = styled.div`
  padding: 3.5rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  @media screen and (max-width: 520px) {
    padding: 2rem;
  }
  h3 {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 3.6rem;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.8rem;
    color: ${({ theme }) => theme.colors.fontdark};
    margin-bottom: 0rem;
  }
  a {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
  }
`;
const ModalBody = styled.div``;
const TabLinks = styled.div`
  display: grid;
  // grid-template-columns: auto auto; //commented for hiding the credit card option
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tabLinksColor};
  a {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    width: 100%;
    font-weight: 500;
    line-height: 2.1rem;
    color: ${({ theme }) => theme.colors.fontdark};
    padding: 1.7rem 3.5rem;
    cursor: pointer;
    position: relative;
    span {
      margin-left: 1.2rem;
    }
    @media screen and (max-width: 520px) {
      padding: 1.5rem;
    }
    &.active {
      color: ${({ theme }) => theme.colors.fontcolor};
      &:before {
        content: '';
        background: ${({ theme }) => theme.colors.activeBeforeColor};
        height: 3px;
        width: 100%;
        bottom: 0;
        left: 0;
        position: absolute;
        border-radius: 8px 8px 0px 0px;
      }
    }
  }
`;
const TabContent = styled.div`
  min-height: 45rem;
  height: 100%;
  padding: 2.5rem 3.5rem 6rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  h4 {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.7rem;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 3.8rem;
  }
  @media screen and (max-width: 520px) {
    padding: 2rem 2rem 5rem;
  }
`;
const SelectWrapper = styled.div`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
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
    &--is-focused,
    &--is-focused:hover {
      border-radius: 1.2rem 1.2rem 0 0;
      border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
    .react-select__input-container,
    .react-select__single-value {
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
`;
const BtnWrapper = styled.div`
  margin-top: 3.5rem;
  button {
    padding: 1.7rem;
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.1rem;
  }
`;
const TransferWalletFundsDiv = styled.div`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  margin: 0 auto 6rem;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-wrapper {
    width: 9.5rem;
    height: 9.5rem;
    display: block;
    margin-bottom: 3rem;
  }
  p {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.colors.transferColor};
    text-align: center;
  }
`;
const CopyTextToClipboard = styled.div`
  background: ${({ theme }) => theme.colors.copyTextToColor};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 1.2rem;
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  .address {
    padding: 1.6rem;
    color: ${({ theme }) => theme.colors.textInput};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
  }
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1.65rem 3rem;
    background: ${({ theme }) => theme.colors.gradientBtnBG};
    border-radius: 0px 11px 11px 0px;
  }
`;

const AddFundsModal = (props: any) => {
  const { show, closeModal } = props;
  const [activeTab, setActiveTab] = useState('Deposit crypto');
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const imgSrc = handleApiImage(ThemeConfiguration?.sections?.home?.popUpImages?.images?.transferWalletImg) || "/svgs/transfer-wallet.svg";

  const { accountInfo } = useWeb3Context();


  const options = [
    { value: 'ETH', label: 'ETH' },
    { value: 'USD', label: 'USD' },
  ];

  const handleChange = (e: any) => {
    console.log(e);
  };

  const CopyToClipboard = () => {
    if (navigator?.clipboard) navigator.clipboard.writeText(accountInfo?.activeAccount);
  };

  return (
    <AddFundsModalWrapper className={show ? 'show' : 'fade'}>
      <ModalDialog className="modal-dialog">
        <ModalContent>
          <ModalHeader>
            <h3>Add Funds</h3>
            <p>Add funds preferred wallet account</p>
            <a onClick={closeModal}>
              <Image
                src={`/svgs/wallet-cancel.svg`}
                alt={`wallet-cancel`}
                width="20"
                height="20"
              />
            </a>
          </ModalHeader>
          <ModalBody>
            <TabLinks>
              <a
                onClick={() => setActiveTab('Deposit crypto')}
                className={`${activeTab === 'Deposit crypto' ? 'active' : ''}`}
              >
                <Image
                  src={`/svgs/arrow-down${activeTab === 'Deposit crypto' ? '-active' : ''
                    }.svg`}
                  alt={`Deposit crypto`}
                  width="16"
                  height="16"
                />
                <span>Deposit crypto</span>
              </a>
              {/* <a
                onClick={() => setActiveTab('Buy ETH with card')}
                className={`${activeTab === 'Buy ETH with card' ? 'active' : ''
                  }`}
              >
                <Image
                  src={`/svgs/credit-card${activeTab === 'Buy ETH with card' ? '-active' : ''
                    }.svg`}
                  alt={`Buy ETH with card`}
                  width="16"
                  height="16"
                />
                <span>Buy ETH with card</span>
              </a> */}
            </TabLinks>
            {activeTab === 'Buy ETH with card' && (
              <TabContent>
                <h4>Buy crypto</h4>
                <SelectWrapper>
                  <label>Currency</label>
                  <Select
                    placeholder="Choose category"
                    classNamePrefix="react-select"
                    options={options}
                    isClearable
                    name="category"
                    onChange={handleChange}
                  />
                </SelectWrapper>
                <SelectWrapper>
                  <label>Amount</label>
                  <Select
                    placeholder="Choose category"
                    classNamePrefix="react-select"
                    options={options}
                    isClearable
                    name="category"
                    onChange={handleChange}
                  />
                </SelectWrapper>
                <BtnWrapper>
                  <ButtonGradientPrimary blockBtn size="lg">
                    Continue
                  </ButtonGradientPrimary>
                </BtnWrapper>
              </TabContent>
            )}
            {activeTab === 'Deposit crypto' && (
              <TabContent>
                <TransferWalletFundsDiv>
                  <div className="img-wrapper">
                    <Image
                      src={imgSrc}
                      alt={`transfer-wallet`}
                      width="95"
                      height="95"
                    />
                  </div>
                  <p>Transfer another wallet funds to your wallet address </p>
                </TransferWalletFundsDiv>
                <CopyTextToClipboard>
                  <p className="address">{accountInfo?.activeAccount}</p>
                  <a onClick={CopyToClipboard}>Copy</a>
                </CopyTextToClipboard>
              </TabContent>
            )}
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </AddFundsModalWrapper>
  );
};

export default AddFundsModal;
