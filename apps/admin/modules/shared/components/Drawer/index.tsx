import React from 'react';
import styled from 'styled-components';

interface StyleProps {
  open: boolean;
  position?: string;
  size?: string | number;
  backgroundColor?: string;
}

const transforms = {
  top: 'translateY(-100%)',
  right: 'translateX(100%)',
  bottom: 'translateY(100%)',
  left: 'translateX(-100%)',
};
const placements = {
  top: {
    top: 0,
    right: 0,
    left: 0,
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottom: {
    right: 0,
    bottom: 0,
    left: 0,
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
  },
};

const DrawerWrapper = styled.div<StyleProps>`
  display: block;
  width: ${(props) =>
    props.position !== 'top' && props.position !== 'bottom' && props.size
      ? props.size
      : '300px'};
  height: ${(props) =>
    (props.position === 'top' || props.position === 'bottom') && props.size
      ? props.size
      : '100%'};
  transform: ${(props) => (!props.open ? transforms[props.position] : null)};
`;

const DrawerOverlay = styled.div<StyleProps>`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 8;
  display: ${(props) => (props.open ? null : 'none')};
`;

const DrawerContent = styled.div<StyleProps>`
  display: block;
  box-sizing: border-box;
  position: fixed;
  ${(props) => placements[props.position]}
  z-index: 16;
  width: ${(props) =>
    props.position !== 'top' && props.position !== 'bottom' && props.size
      ? props.size
      : '300px'};
  transform: ${(props) => (!props.open ? transforms[props.position] : null)};
  transition: transform 0.2s ease-out;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #000;
  background-color: ${(props) => props.backgroundColor || '#fff'};
  box-shadow: -10px 0px 10px rgba(0, 0, 0, 0.19);
  padding: 0 3rem;
`;

const DrawerHeader = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 35px;
  line-height: 1.19rem;
  color: #172f53;

  h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    color: #172f53;
  }
  svg {
    cursor: pointer;
  }
`;

const Drawer = (props) => {
    const {
        open,
        size,
        position,
        onDismiss,
        backgroundColor,
        header,
      } = props;
  return (
    <DrawerWrapper open={open} size={size} position={position}>
      <DrawerOverlay open={open} />
      <DrawerContent
        open={open}
        size={size}
        position={position}
        backgroundColor={backgroundColor}
      >
        <DrawerHeader>
          <h3>{header}</h3>
          <span onClick={onDismiss}>
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
        </DrawerHeader>
        {props.children}
      </DrawerContent>
    </DrawerWrapper>
  );
};

export default Drawer;
