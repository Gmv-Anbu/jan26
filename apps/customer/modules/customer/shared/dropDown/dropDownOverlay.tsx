import React, { DetailedReactHTMLElement, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
type AppProps = {
    children: React.ReactNode;
    overlay: React.ReactNode;
    trigger: string[];
}
const DropDownOverlay = ({ children, overlay, trigger = ['click'] }: AppProps) => {
    const overlayRef = useRef<HTMLElement>(null);
    const [offsetPos, setOffsetPos] = useState({ x: 0, y: 0, width: 0 });
    const [openModal, setOpenModal] = useState<HTMLElement | undefined>();
    const [openOverlay, setOpenOverlay] = useState(false);

    useEffect(() => {
        const overlayWrapperDiv = document.createElement('div');
        overlayWrapperDiv.style.position = 'absolute';
        overlayWrapperDiv.style.top = '0';
        overlayWrapperDiv.style.left = '0';
        overlayWrapperDiv.style.right = '0';
        document.body.appendChild(overlayWrapperDiv);
        setOpenModal(overlayWrapperDiv);
        return () => {
            ReactDOM.unmountComponentAtNode(overlayWrapperDiv);
            document.body.removeChild(overlayWrapperDiv);
            setOpenModal(undefined)
        }
    }, [])
    const handleOverlayTrigger = (e: any) => {
        if (null !== overlayRef.current) {
            if (overlayRef.current.contains(e.target)) {
                setOpenOverlay(true)
            }
            else {
                setOpenOverlay(false)
            }
        }
    }
    const renderMenu = useCallback(() => {
        const offsetPos = { x: 0, y: 0, width: 0 }
        if (null !== overlayRef.current) {
            const triggerPosition = overlayRef.current?.getBoundingClientRect();
            offsetPos.y = Math.round(triggerPosition.bottom)
            offsetPos.x = triggerPosition.right
        }

        setOffsetPos(offsetPos)
    }, [])

    useEffect(() => {
        renderMenu()
    }, [renderMenu])
    useEffect(() => {
        trigger.forEach(t => {
            document.addEventListener(t, handleOverlayTrigger);
        })
        window.addEventListener('resize', renderMenu)
        return () => {
            trigger.forEach(t => {
                document.removeEventListener(t, handleOverlayTrigger);
            })
            window.removeEventListener('resize', renderMenu)
        }
    }, [renderMenu, trigger])
    return (
        <>
            {React.Children.map(children, (element: any, idx) => {
                if (idx === 0)
                    return React.cloneElement(element, { ref: overlayRef });
                else
                    return React.cloneElement(element);
            })}
            {openModal && ReactDOM.render(<DropList offsetPos={offsetPos} style={{ visibility: `${openOverlay ? 'visible' : 'hidden'}` }} >
                {overlay}
            </DropList>, openModal)}
            {/* <DropList ref={modelRef} offsetPos={offsetPos} style={{ visibility: `${openModal ? 'visible' : 'hidden'}` }} >
                {overlay}
            </DropList> */}
        </>
    )
}
export default DropDownOverlay;

const DropDownOverlayWrapper = styled.div`
    position:relative;
`;

const DropList = styled.div<any>`
    position:absolute;
    top:${(props) => `${props.offsetPos.y}px`};
    z-index:99999;
    ${props => css`${((window.innerWidth / 2) < props.offsetPos.x) ? 'right:' + (window.innerWidth - props.offsetPos.x) + 'px' : 'left:' + props.offsetPos.x + 'px'}`}
`;