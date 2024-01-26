import styled from 'styled-components';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

export interface IinfinteScroll {
  children: any;
  dataLength?: number;
  next: () => void;
  hasMore: true | false;
  [index: string]: any;
}

export function InfiniteScroll({
  children,
  dataLength = 12,
  next,
  hasMore,
  ...props
}: IinfinteScroll) {
  return (
    <InfiniteScrollComponent
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={<CardSkeleton >Loading...</CardSkeleton>}
      {...props}
    >
      {children}
    </InfiniteScrollComponent>
  );
}

const CardSkeleton = styled.h4`
  margin:0;
  margin-top:1rem;
  padding:1rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  // border: 1px solid ${({ theme }) => theme.colors.cardContainerColor};
  color: ${({ theme }) => theme.colors.fontprimary};
  text-align:center;
`;
