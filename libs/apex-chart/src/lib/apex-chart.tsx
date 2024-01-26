import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { ModalService,IModalServiceCallback } from './ModalService';
import styled from 'styled-components';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface ApexChartProps {}

const StyledApexChart = styled.div`
  color: pink;
`;

export function ApexChart(props: ApexChartProps) {
  return (
    <StyledApexChart>
      <h1>Welcome to ApexChart!</h1>
    </StyledApexChart>
  );
}


export function ModalRoot() {
    const [modal, setModal] = useState<TModalRootState | null>(null);
  
    const handleClickOutside = (e:React.MouseEvent) => {
        const {target} = e;
        if (modalRef.current && !modalRef.current.contains(target as HTMLDivElement)) {
            modal?.close();
        }
    }

    const ModalComponent = (modal && modal.component) ? modal.component : null;
    return (
        (ModalComponent && modal) ? <ModalWrapper className="nft-modal" onClick={handleClickOutside}   >
            <ModalContent ref={modalRef} width="500px" height="562px" {...modal?.config}>
                <>
                {/* {modal?.config?.closeIcon&&<CloseIcon onClick={modal.close} >
                    <Image className='close-icon' src="/svgs/close.svg" width={16} height={16} alt="close-icon" />
                </CloseIcon>} */}
                {ModalComponent && typeof ModalComponent === 'function' ?  <ModalComponent close={modal.close} /> : ModalComponent}
                </>
            </ModalContent>
        </ModalWrapper> : null
    );
}

interface ImodalContent {
    width?: number | string | 'fit-content'
    height?: number | string | 'fit-content'
}


const ModalContent = styled.div<ImodalContent>`
    position:relative;
    background-color: #FFFFFF;
    // color: ${({ theme }) => theme.colors.mainBG};
    border-radius: 0.9rem;
    width: ${({ width }) => typeof width === 'number' ? width + 'px' : width};
    height: ${({ height }) => typeof height === 'number' ? height + 'px' : height};
`;


export default ApexChart;
