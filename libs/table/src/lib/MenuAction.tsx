import React, { useEffect, useRef, useState } from 'react';
import { ActivityContainer, Container, Dropdown } from './ActivityStyle';

const MenuAction = (props: any) => {
  const [open, setOpen] = useState(false);
  const ref: any = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <ActivityContainer ref={ref}>
      <Container onClick={() => setOpen(!open)}>
        <svg
          width="4"
          height="16"
          viewBox="0 0 4 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.99967 0.5C1.08301 0.5 0.333008 1.25 0.333008 2.16667C0.333008 3.08333 1.08301 3.83333 1.99967 3.83333C2.91634 3.83333 3.66634 3.08333 3.66634 2.16667C3.66634 1.25 2.91634 0.5 1.99967 0.5ZM1.99967 12.1667C1.08301 12.1667 0.333008 12.9167 0.333008 13.8333C0.333008 14.75 1.08301 15.5 1.99967 15.5C2.91634 15.5 3.66634 14.75 3.66634 13.8333C3.66634 12.9167 2.91634 12.1667 1.99967 12.1667ZM1.99967 6.33333C1.08301 6.33333 0.333008 7.08333 0.333008 8C0.333008 8.91667 1.08301 9.66667 1.99967 9.66667C2.91634 9.66667 3.66634 8.91667 3.66634 8C3.66634 7.08333 2.91634 6.33333 1.99967 6.33333Z"
            fill="#131313"
          />
        </svg>

        {open ? (
          <Dropdown>
            {props?.data?.map((d: any) => {
              if(d?.link) {
                return <div>
                  <a target='_blank' href={d?.link} key={d.id}>{d.name}</a>
                </div>
              } else {
                return <div key={d.id} onClick={() => d.action()}>
                {d.name}
              </div>
              }
            })}
          </Dropdown>
        ) : null}
      </Container>
    </ActivityContainer>
  );
};

export default MenuAction;

export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
