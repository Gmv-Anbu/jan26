import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { ModalService, IModalServiceCallback } from './ModalService';
import styled from 'styled-components';
import Image from 'next/image';

interface TModalRootState extends IModalServiceCallback {
    close: () => void
}
export function ModalRoot() {
    const [modal, setModal] = useState<Array<TModalRootState>>([]);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const closeModal = useCallback((id?: IModalServiceCallback['id']) => {
        setModal((prev) => {
            if (id) {
                return prev.filter(i => i.id !== id)
            }
            else {
                prev.pop();
            }
            return [...prev]
        });
    }, [])
    useEffect(() => {
        const callBackEvent = ({ id, component, config = {} }: IModalServiceCallback) => {
            setModal((prev) => {
                return [
                    ...prev,
                    {
                        id,
                        component,
                        config,
                        close: () => {
                            setModal((prev) => prev.filter(i => i.id !== id));
                        },
                    }
                ]
            });
        }
        const closeModalEvent = ({ id }: { id: IModalServiceCallback['id'] }) => {
            closeModal(id)
        }
        ModalService.on('open', callBackEvent);
        ModalService.on('close', closeModalEvent);
        return () => {
            ModalService.off('open', callBackEvent);
            ModalService.off('close', closeModalEvent);
        }
    }, [closeModal]);

    const handleClickOutside = (e: React.MouseEvent) => {
        const { target } = e;
        const elementData = (modal.length > 0) ? modal[modal.length - 1] : null
        const element = elementData ? document.getElementById(elementData.id) : null;
        // if (modalRef.current && !modalRef.current.contains(target as HTMLDivElement)) {
        //     closeModal();
        // }
        if (!elementData?.config?.disableOutsideClick && element && !element.contains(target as HTMLDivElement)) {
            closeModal();
        }
    }


    return (
        (Array.isArray(modal) && modal.length > 0) ?
            <ModalWrapper className="nft-modal" onClick={handleClickOutside}   >
                {modal.map(item => {
                    const ModalComponent = (item && item.component) ? item.component : null;
                    return (
                        <ModalContent id={item.id} key={item.id} ref={modalRef} width="500px" height="562px" {...item?.config}>
                            <>
                                {item?.config?.closeIcon && <CloseIcon onClick={item.close} >
                                    <Image className='close-icon' src="/svgs/close.svg" width={16} height={16} alt="close-icon" />
                                </CloseIcon>}
                                {ModalComponent && typeof ModalComponent === 'function' ? <ModalComponent close={item.close} /> : ModalComponent}
                            </>
                        </ModalContent>
                    )
                }
                )}
            </ModalWrapper>
            : null
    );
}

interface ImodalContent {
    width?: number | string | 'fit-content'
    height?: number | string | 'fit-content'
}

const ModalWrapper = styled.div`
    position: fixed; /* Stay in place */
    z-index: 20; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto;
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */ 
    display:flex;
    justify-content:center;
    align-items: center;
    @media screen and (max-width: 575px) {
        z-index: 1000; 
    }
`;

const ModalContent = styled.div<ImodalContent>`
    position:absolute;
    background-color: #FFFFFF;
    // color: ${({ theme }) => theme.colors.mainBG};
    /* border-radius: 0.9rem; */
    box-shadow: 0px 24px 36px rgba(0, 0, 0, 0.09);
    width: ${({ width }) => typeof width === 'number' ? width + 'px' : width};
    height: ${({ height }) => typeof height === 'number' ? height + 'px' : height};
    /* width: min(90%,640px);
    min-height: 416px; */
    @media screen and (max-width: 575px) {
        margin: 0 2rem;
    }
`;
const CloseIcon = styled.div`
    position:absolute;
    right:9px;
    top:7px;
    cursor:pointer;
`;