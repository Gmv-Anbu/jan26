import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const TabContentWrap = styled.div`
  width: 63%;
  padding-left: 12rem;
`
const TabContents = styled.div`
  display: none;
  &:first-child {
    display: block;
  }
`
const TabInner = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
`
const TabContentleft = styled.div`
  width: 59%;
  /* width: 462px; */
  position: relative;
  p {
    color: #dadddd !important;
    width: 100% !important;
    margin-bottom: 3rem;
    font-size: 2.4rem !important;
    line-height: 130% !important;
  }
  img {
    height: 290px !important;
    width: 100%;
    /* object-fit: cover; */
    /* width: 446px !important; */
  }
`
const TabPosBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-right:1.3rem;
  @media screen and (max-width: 1224px) {
      padding-right: 0rem;
  }
`
const TabContentRight = styled.div`
  width: 41%;
  padding-left: 3rem;
  img {
    height: 505px !important;
    /* object-fit: cover; */
    width: 100%;
  }
`
interface ContentProps {
  article: {
    name: string
    primaryImg: string
    secondaryImg: string
  }
}
const TabContent = ({ article }: ContentProps) => {
  return (
    <TabContentWrap>
      <TabContents>
        <TabInner>
          <TabContentleft>
            <TabPosBottom>
              <p>{article?.name}</p>
              <figure>
                <Image src={article?.primaryImg} alt="ICO" width={446} height={290} />
              </figure>
            </TabPosBottom>
          </TabContentleft>
          <TabContentRight>
            <figure>
              <Image src={article?.secondaryImg} alt="ICO" width={290} height={505} />
            </figure>
          </TabContentRight>
        </TabInner>
      </TabContents>
    </TabContentWrap>
  )
}

export default TabContent
