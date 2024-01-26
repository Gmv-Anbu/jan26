import CUSTOMERAPI from '@apps/customer/api/customer'
import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import useWindowSize from '@apps/customer/hooks/useWindowSize'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import { Container } from '@apps/customer/styles/CommonStyles'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const FaqWrapper = styled.section`
  padding: 2rem 0 15rem;
  max-width: 1120px;
  margin: 0 auto;
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 120%;
  }
  .no-border{
    border: 0;
  }
  .more-ico{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    p{
      cursor: pointer;
    }
  }
  .no-data {
    padding: 40px 0 38px 35px;
  }
  @media screen and (max-width: 1200px) {
    padding-left: 3rem !important;
    padding-right: 3rem !important;
  }
  @media screen and (max-width: 549px) {
    padding: 0 3rem 15rem !important;
    .more-ico{
      margin-top: 1.7rem;
    }
    .no-data {
      padding: 32px 32px 32px 36px;
    }
  }
`
const FaqContent = styled.div`
  cursor: pointer;
  padding: 40px 0 38px;
  border-bottom: 1.5px solid #d1e0e2;
  display: flex;
  gap: 17px;
  &:last-child {
    border: none;
  }
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 120%;
  }
  p {
    color: ${({ theme }) => theme.colors.fontGray};
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    max-width: 80%;
    padding-top: 12px;
  }
  span {
    width: 16px;
    margin-top: -3px;
    margin-left: 4px;
  }
  svg {
    margin-top: 8px;
    cursor: pointer;
  }
  @media screen and (max-width: 549px) {
    padding: 32px 0 15px;
    p{
      max-width: 98%;
    }
  }
`
const FaqMain = styled.div`
  padding: 10rem 0 0;
`
const FaqNavList = styled.div`
  max-width: 144rem;
  margin: auto;
  border-bottom: 1.5px solid #D1E0E2;
  a {
    width: 157px;
    display: inline-block;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.015em;
    color: #4E4E4E;
    text-align: center;
    padding: 8px;
    cursor: pointer;
    &.active {
      font-weight: 600;
      color: #2A7575;
      border-bottom: 4px solid #2A7575;
    }
  }
  @media screen and (max-width: 549px) {
    display: flex;
    overflow: auto;
    white-space: nowrap;
    margin: 0 3rem;
    &::-webkit-scrollbar {
      width: 3px;
      display: none;
    }
    a {
      width: 120px;
      min-width: 120px;
      font-size: 12px;
      font-weight: 600;
      line-height: 15px;
    }
  }
`

const faqContent = [
  {
    question: 'What is Watch NFT?',
    answer: 'A watch NFT platform is a platform that allows users to buy, sell and transfer unique watches that are stored on a blockchain as non-fungible tokens (NFTs).',
  },
  {
    question: 'How do I know if a watch NFT is authentic?',
    answer:
      'Ans: Watch NFT platforms typically use blockchain technology to verify the authenticity of each NFT. Each NFT is unique and has a distinct identifier that is stored on the blockchain, which can be used to prove ownership and authenticity.',
  },
  {
    question: 'What is an NFT?',
    answer: 'An NFT, or ‘non-fungible token’, is a unique, digital certificate that is stored on a blockchain and provides certain ownership rights in an asset, typically a digital one, such as a digital work of art.',
  },
  {
    question: "What Is The Buyer's Premium?",
    answer:
      'The buyer’s premium is a percentage of the final hammer price that the buyer of an object must pay in addition to the hammer price of an object. In addition to the buyer’s premium and hammer price, the buyer is responsible for paying all relevant taxes and shipping costs. The buyer’s premium varies by hammer price, sale location and sale category.',
  },
  {
    question: 'Users can buy assets only if they are a member?',
    answer: 'Yes user will be able to buy assets once purchasing a membership.',
  },
  {
    question: 'Can a non-registered view the museum assets detailed page?',
    answer: 'No, only registered users will be able to the museum asset detailed page',
  },
  {
    question: 'What will be the payment process for purchasing a membership?',
    answer: 'Credit and debit cards',
  },
]

const Faq = () => {
  const moreConst = 6
  const [show, setShow] = useState<string | number>(0)
  const [more, setMore] = useState(moreConst)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState(1)
  const [faqData, setFaqData] = useState([])
  const [faqList, setFaqList] = useState([])
  const [faqHead, setFaqHead] = useState(1920)
  const {width} = useWindowSize()


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const getFaqData = () => {
    CUSTOMERAPI.getFaqs()
    .then(res => {
      console.log('res', res)
      if(res?.data?.data?.rows) {
        setFaqData(res?.data?.data?.rows)
      }
    })
    .catch(err => {
      console.log('err', err)
    })
  }

  const renderFaq = useMemo(() => (
    faqContent.slice(0,more)
    .filter((el) => el.question.toLowerCase().includes(search.toLowerCase()))
    .map((each, index) => (
      <FaqContent onClick={() => (show === index ? setShow('') : setShow(index))} key={index} className={index + 1 === more ? "no-border" : ''}>
        <span>
          <Icon name={show === index ? 'faq-up' : 'faq-down'} fill={width < 549 ? "black" : null}/>
        </span>
        <div>
          <h2>{each.question}</h2>
          {show === index && <p>{each.answer}</p>}
        </div>
      </FaqContent>
    ))
  ),[more,search,show,width]) 

  const filterFaqData = () => {
    if(faqData?.length) {
      let arr = []
      if(activeTab === 1) arr = faqData.filter(el => el?.type === "general")
      if(activeTab === 2) arr = faqData.filter(el => el?.type === "bid")
      if(activeTab === 3) arr = faqData.filter(el => el?.type === "payment")
      if(activeTab === 4) arr = faqData.filter(el => el?.type === "transaction")
      console.log('arr', arr)
      if(search?.length) arr = arr.filter(el => el?.answer.toLowerCase().includes(search.toLowerCase()) || el?.question.toLowerCase().includes(search.toLowerCase()))
      setFaqList(arr)
      setMore(moreConst)
    }
  }

  useEffect(() => {
    setFaqHead(width)
  },[width])

  useEffect(() => {
    filterFaqData()
  },[faqData, activeTab])

  useEffect(() => {
    getFaqData()
  },[search])

  return (
    <>
      <Banner
        search={true}
        handleChange={handleChange}
        heading={faqHead > 549 ? 'Frequently Asked Questions' : "FAQ's"}
        description={'If your payment fails, you can use the (COD) payment option, if available on that order. If your payment is debited from your account after a payment failure, it will be credited back within 7-10 days.'}
        height={'484px'}
      />
      <FaqMain>
        <FaqNavList>
          <a className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>General</a>
          <a className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Biding</a>
          <a className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>Payment</a>
          <a className={activeTab === 4 ? 'active' : ''} onClick={() => setActiveTab(4)}>Transaction</a>
        </FaqNavList>
        <FaqWrapper>
            {/* {renderFaq.length > 0 ? renderFaq : <h4>No questions found!</h4>} */}
            {faqList.length > 0 
            ? faqList.slice(0, more).map((each, index) => {
              return(
                <FaqContent onClick={() => (show === index ? setShow('') : setShow(index))} key={index} className={index + 1 === more ? "no-border" : ''}>
                  <span>
                    <Icon name={show === index ? 'faq-up' : 'faq-down'} fill={width < 549 ? "black" : null}/>
                  </span>
                  <div>
                    <h2>{each.question}</h2>
                    {show === index && <p>{each.answer}</p>}
                  </div>
                </FaqContent>
              )
            }) 
            : <h4 className='no-data'>No questions found!</h4>}
            {
              faqList.length > more && (
                <div className="more-ico">
                  <p onClick={() => setMore(more + (faqList.length - more))}><Icon name='faq-more'/></p>
                </div>
              )
            }
        </FaqWrapper>
      </FaqMain>
      <Newsletter />
    </>
  )
}

export default Faq
