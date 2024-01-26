import React from 'react';
import { LinkS, One, Page, Pages } from './tableStyles';

const Pagination = () => {
  return (
    <Page>
      <Pages>
        <span>
          <LinkS href="#">
            <svg
              width="5"
              height="7"
              viewBox="0 0 5 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.45563 3.20108L4.00391 0.711238L3.27597 6.21784e-08L-0.00024147 3.20108L3.27597 6.40215L4.00391 5.69091L1.45563 3.20108Z"
                fill="#23487B"
              />
            </svg>
          </LinkS>
        </span>
        <One>
          <LinkS href="#">1</LinkS>
        </One>
        <LinkS href="#">2</LinkS>
        <LinkS href="#">3</LinkS>
        <LinkS href="#">....</LinkS>
        <LinkS href="#">11</LinkS>
        <LinkS href="#">12</LinkS>
        <span>
          <LinkS href="#">
            {' '}
            <svg
              width="5"
              height="7"
              viewBox="0 0 5 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.54828 3.20127L-1.45953e-09 5.69111L0.727933 6.40234L4.00415 3.20127L0.727933 0.000193121L-1.16783e-08 0.711432L2.54828 3.20127Z"
                fill="#23487B"
              />
            </svg>
          </LinkS>
        </span>
      </Pages>
    </Page>
  );
};

export default Pagination;
