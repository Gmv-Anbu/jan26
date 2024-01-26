import SuccessModal from '@apps/customer/modules/customer/shared/modal/SuccessModal';
import { ModalService } from '@nft-marketplace/modal';
import Image from 'next/image';
import React, { useState } from 'react';


import styled from 'styled-components';

const ShareContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  width:20rem;
`;
const DropUl = styled.ul`
  background: ${({ theme }) => theme.colors.modelContentColor};
  border: 0.1px solid ${({ theme }) => theme.colors.activeBeforeColor};
  border-radius: 0.9rem;
  padding: 1rem;
  list-style: none;
  display: block;
  // position: relative;

  width: 100%;
`;
const DropLi = styled.li`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  position: relative;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  margin-bottom: 1.2rem;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  gap: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
  .link {
    margin: 0;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  span {
    padding: 0.5rem;
  }
`;
function ShareComponent(props: any) {
  const { path } = props;
  const CopyTextToClipboard = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      ModalService.open(
        (modalProps: any) => (
          <SuccessModal title="Link Copied" desc="" close={modalProps.close} />
        ),
        { closeIcon: false }
      );
    }
  };
  return (
    <ShareContainer>
      <DropUl>
        <DropLi>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${path}`}
            target="_blank"
            rel="noreferrer"
          >
          
            <Image
              src={'/svgs/icons/facebook.svg'}
              alt={`copy-to-clipboard`}
              width="20"
              height="20"
            />
            <span>Share on Facebook</span>
          </a>
        </DropLi>
        <DropLi>
          <a
            href={`https://twitter.com/share?url=${path}`}
            target="_blank"
            rel="noreferrer"
          >
           
            <Image
              src={'/svgs/icons/twitter.svg'}
              alt={`copy-to-clipboard`}
              width="20"
              height="20"
            />
            <span>Share on Twitter</span>
          </a>
        </DropLi>
        <DropLi onClick={CopyTextToClipboard}>
          <a title="Copy To Clipboard" className="link">
            <Image
              src={'/svgs/copy-to-clipboard.svg'}
              alt={`copy-to-clipboard`}
              width="20"
              height="20"
            />
          </a>
          <span>copy link</span>
        </DropLi>
      </DropUl>
    </ShareContainer>
  );
}
export default ShareComponent;
