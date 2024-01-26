import React from 'react';
import BoxContent from './BoxContent';
import {
  BoxWrap,
  ContainerWrap,
  Icon,
  Icon_1,
  Icon_2,
  Icon_3,
  Icon_4,
  Icon_5,
} from './BoxStyle';
const dataSource: any = [
  {
    Amount: '$20,000',
    Status: 'Pending Payment',
    Icon: (
      <Icon>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.32695 14.8707C3.35039 14.8707 0.126953 11.6473 0.126953 7.6707C0.126953 3.69414 3.35039 0.470703 7.32695 0.470703C11.3035 0.470703 14.527 3.69414 14.527 7.6707C14.527 11.6473 11.3035 14.8707 7.32695 14.8707ZM4.80695 9.1107V10.5507H6.60695V11.9907H8.04695V10.5507H8.76695C9.24434 10.5507 9.70218 10.3611 10.0397 10.0235C10.3773 9.68593 10.567 9.22809 10.567 8.7507C10.567 8.27332 10.3773 7.81548 10.0397 7.47791C9.70218 7.14035 9.24434 6.9507 8.76695 6.9507H5.88695C5.79148 6.9507 5.69991 6.91278 5.6324 6.84526C5.56488 6.77775 5.52695 6.68618 5.52695 6.5907C5.52695 6.49523 5.56488 6.40366 5.6324 6.33615C5.69991 6.26863 5.79148 6.2307 5.88695 6.2307H9.84696V4.7907H8.04695V3.3507H6.60695V4.7907H5.88695C5.40956 4.7907 4.95173 4.98035 4.61416 5.31791C4.2766 5.65548 4.08695 6.11331 4.08695 6.5907C4.08695 7.06809 4.2766 7.52593 4.61416 7.8635C4.95173 8.20106 5.40956 8.3907 5.88695 8.3907H8.76695C8.86243 8.3907 8.954 8.42863 9.02151 8.49615C9.08903 8.56366 9.12695 8.65523 9.12695 8.7507C9.12695 8.84618 9.08903 8.93775 9.02151 9.00526C8.954 9.07278 8.86243 9.1107 8.76695 9.1107H4.80695Z"
            fill="#FFB23B"
          />
        </svg>
      </Icon>
    ),
  },
  {
    Amount: '$45,000',
    Status: 'All transactions',
    Icon: (
      // eslint-disable-next-line react/jsx-pascal-case
      <Icon_1>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.63652 5.36551V7.98369H5.01834V5.36551H7.63652ZM8.94561 5.36551H12.2183V7.98369H8.94561V5.36551ZM7.63652 12.5655H5.01834V9.29278H7.63652V12.5655ZM8.94561 12.5655V9.29278H12.2183V11.911C12.2183 12.0846 12.1494 12.251 12.0266 12.3738C11.9039 12.4965 11.7374 12.5655 11.5638 12.5655H8.94561ZM7.63652 0.783691V4.05642H5.01834V0.783691H7.63652ZM8.94561 0.783691H11.5638C11.7374 0.783691 11.9039 0.852652 12.0266 0.975403C12.1494 1.09815 12.2183 1.26464 12.2183 1.43824V4.05642H8.94561V0.783691ZM3.70925 5.36551V7.98369H0.436523V5.36551H3.70925ZM3.70925 12.5655H1.09107C0.917473 12.5655 0.750986 12.4965 0.628235 12.3738C0.505484 12.251 0.436523 12.0846 0.436523 11.911V9.29278H3.70925V12.5655ZM3.70925 0.783691V4.05642H0.436523V1.43824C0.436523 1.26464 0.505484 1.09815 0.628235 0.975403C0.750986 0.852652 0.917473 0.783691 1.09107 0.783691H3.70925Z"
            fill="#6A66D5"
          />
        </svg>
      </Icon_1>
    ),
  },
  {
    Amount: '$80,000',
    Status: 'Royality Commission',
    Icon: (
      <Icon_2>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.7 15.4C3.44729 15.4 0 11.9527 0 7.7C0 3.44729 3.44729 0 7.7 0C11.9527 0 15.4 3.44729 15.4 7.7C15.4 11.9527 11.9527 15.4 7.7 15.4ZM5.005 9.24V10.78H6.93V12.32H8.47V10.78H9.24C9.75054 10.78 10.2402 10.5772 10.6012 10.2162C10.9622 9.85517 11.165 9.36554 11.165 8.855C11.165 8.34446 10.9622 7.85483 10.6012 7.49382C10.2402 7.13281 9.75054 6.93 9.24 6.93H6.16C6.05789 6.93 5.95996 6.88944 5.88776 6.81724C5.81556 6.74503 5.775 6.64711 5.775 6.545C5.775 6.44289 5.81556 6.34496 5.88776 6.27276C5.95996 6.20056 6.05789 6.16 6.16 6.16H10.395V4.62H8.47V3.08H6.93V4.62H6.16C5.64946 4.62 5.15983 4.82281 4.79882 5.18382C4.43781 5.54483 4.235 6.03446 4.235 6.545C4.235 7.05554 4.43781 7.54517 4.79882 7.90618C5.15983 8.26719 5.64946 8.47 6.16 8.47H9.24C9.34211 8.47 9.44003 8.51056 9.51224 8.58276C9.58444 8.65496 9.625 8.75289 9.625 8.855C9.625 8.95711 9.58444 9.05503 9.51224 9.12724C9.44003 9.19944 9.34211 9.24 9.24 9.24H5.005Z"
            fill="#2097BC"
          />
        </svg>
      </Icon_2>
    ),
  },
  {
    Amount: '$36,246',
    Status: 'Artist Transactions',
    Icon: (
      <Icon_3>
        <svg
          width="15"
          height="13"
          viewBox="0 0 15 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.17066 2.88711L11.4035 0.373001C11.5293 0.275226 11.6865 0.22673 11.8456 0.236612C12.0047 0.246493 12.1547 0.314073 12.2675 0.426674L14.2278 2.38638C14.3406 2.49921 14.4083 2.64934 14.4182 2.80856C14.4281 2.96778 14.3795 3.12513 14.2815 3.25104L11.768 6.48318C11.9453 7.20607 11.9559 7.95977 11.7992 8.68737C11.6424 9.41496 11.3224 10.0974 10.8633 10.6832C10.4041 11.269 9.81786 11.7428 9.14878 12.0689C8.4797 12.3949 7.74528 12.5646 7.00099 12.5652C4.70877 12.5652 1.76332 11.5821 0.126953 10.6003C2.73204 8.63664 2.12135 7.45191 2.41786 6.34573C3.11037 3.76027 5.58717 2.25024 8.17066 2.88711ZM10.4046 4.117C10.4472 4.15824 10.4897 4.20078 10.531 4.24398L11.2739 4.98624L12.8939 2.90347L11.751 1.76064L9.66826 3.38064L10.4046 4.117Z"
            fill="#A406BE"
          />
        </svg>
      </Icon_3>
    ),
  },
  {
    Amount: '$45,000',
    Status: 'User Transactions',
    Icon: (
      <Icon_4>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.782227 13.2184C0.782227 11.8957 1.30764 10.6272 2.24289 9.692C3.17814 8.75675 4.4466 8.23134 5.76924 8.23134C7.09188 8.23134 8.36034 8.75675 9.29559 9.692C10.2308 10.6272 10.7563 11.8957 10.7563 13.2184H0.782227ZM5.76924 7.60796C3.70275 7.60796 2.02898 5.93419 2.02898 3.8677C2.02898 1.80121 3.70275 0.127441 5.76924 0.127441C7.83573 0.127441 9.5095 1.80121 9.5095 3.8677C9.5095 5.93419 7.83573 7.60796 5.76924 7.60796ZM10.3592 8.99996C11.3127 9.24504 12.1646 9.78469 12.7936 10.5421C13.4227 11.2995 13.7967 12.236 13.8625 13.2184H12.003C12.003 11.5913 11.3796 10.1102 10.3592 8.99996ZM9.09807 7.58116C9.62046 7.11392 10.0382 6.54157 10.324 5.90162C10.6097 5.26167 10.757 4.56856 10.7563 3.8677C10.7576 3.01584 10.5397 2.17796 10.1235 1.43466C10.8296 1.57654 11.4647 1.95853 11.921 2.51572C12.3773 3.07291 12.6265 3.77091 12.6264 4.49108C12.6266 4.93521 12.5318 5.37425 12.3484 5.77877C12.1651 6.18329 11.8974 6.54394 11.5632 6.83656C11.2291 7.12917 10.8363 7.34699 10.4112 7.47541C9.98601 7.60383 9.53831 7.63988 9.09807 7.58116Z"
            fill="#385DFF"
          />
        </svg>
      </Icon_4>
    ),
  },
  {
    Amount: '$20,000',
    Status: 'Platform Commission',
    Icon: (
      <Icon_5>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.7 15.4C3.44729 15.4 0 11.9527 0 7.7C0 3.44729 3.44729 0 7.7 0C11.9527 0 15.4 3.44729 15.4 7.7C15.4 11.9527 11.9527 15.4 7.7 15.4ZM5.005 9.24V10.78H6.93V12.32H8.47V10.78H9.24C9.75054 10.78 10.2402 10.5772 10.6012 10.2162C10.9622 9.85517 11.165 9.36554 11.165 8.855C11.165 8.34446 10.9622 7.85483 10.6012 7.49382C10.2402 7.13281 9.75054 6.93 9.24 6.93H6.16C6.05789 6.93 5.95996 6.88944 5.88776 6.81724C5.81556 6.74503 5.775 6.64711 5.775 6.545C5.775 6.44289 5.81556 6.34496 5.88776 6.27276C5.95996 6.20056 6.05789 6.16 6.16 6.16H10.395V4.62H8.47V3.08H6.93V4.62H6.16C5.64946 4.62 5.15983 4.82281 4.79882 5.18382C4.43781 5.54483 4.235 6.03446 4.235 6.545C4.235 7.05554 4.43781 7.54517 4.79882 7.90618C5.15983 8.26719 5.64946 8.47 6.16 8.47H9.24C9.34211 8.47 9.44003 8.51056 9.51224 8.58276C9.58444 8.65496 9.625 8.75289 9.625 8.855C9.625 8.95711 9.58444 9.05503 9.51224 9.12724C9.44003 9.19944 9.34211 9.24 9.24 9.24H5.005Z"
            fill="#01A862"
          />
        </svg>
      </Icon_5>
    ),
  },
];
const BoxContainer = () => {
  return (
    <BoxWrap>
      <ContainerWrap>
        {dataSource.map((data,index) => {
          return <BoxContent key={index} data={data}></BoxContent>;
        })}
      </ContainerWrap>
    </BoxWrap>
  );
};

export default BoxContainer;
