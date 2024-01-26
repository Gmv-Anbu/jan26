import Image from 'next/image'
import styled from 'styled-components'

const SectionComp = styled.section`
  padding: 10rem 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
  }
`
const CollectAndSellContainer = styled.div`
  display: grid;
  grid-template-columns: 42rem auto;
  grid-gap: 7rem;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-gap: 1;
    justify-content: center;
    align-items: center;
  }
`
const BoxContainer = styled.div`
  max-width: 100%;
`
const CollectAndSellImgBox = styled.div`
  img {
    max-width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    img {
      max-width: 40rem;
    }
  }
  @media screen and (max-width: 520px) {
    img {
      max-width: 30rem;
    }
  }
`
const CollectAndSellTextBox = styled.div`
  padding: 4.5rem 5.5rem;
  background: ${({ theme }) => theme.colors.auctionBoxbg};
  backdrop-filter: blur(25.8121px);
  border-radius: 1.5rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.shareBtnBorder};
  &::before {
    content: '';
    position: absolute;
    left: 0;
    box-shadow: 0rem 0rem 15rem 5rem ${({ theme }) => theme.colors.cardShadow};
  }
  &::after {
    content: '';
    position: absolute;
    box-shadow: 0rem 0rem 15rem 5rem ${({ theme }) => theme.colors.cardShadow};
    right: 0;
  }
  h3 {
    font-family: ${({ theme }) => theme.fontsFamily.secondary};
    font-weight: 600;
    font-size: 6.6rem;
    line-height: 8.5rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.whiteSand};
    margin: 0;
  }
  @media screen and (max-width: 520px) {
    max-width: 100%;
    padding: 3rem;
    h3 {
      font-size: 4rem;
      line-height: 1.4;
    }
  }
`
const FLexSpaceBetween = styled.div`
  padding: 4.5rem 5.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 2rem;
  @media screen and (max-width: 520px) {
    padding: 3rem 3rem 0;
  }
`
const AuctionBoxMainText = styled.p`
  font-family: ${({ theme }) => theme.fontsFamily.secondary};
  font-size: 6.4rem;
  font-weight: 400;
  line-height: 7.6rem;
  margin: 0;
  margin-bottom: 1.2rem;
  @media screen and (max-width: 520px) {
    font-size: 3rem;
    line-height: normal;
  }
`
const AuctionBoxSubText = styled.span`
  font-family: ${({ theme }) => theme.fontsFamily.secondary};
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 2.9rem;
  color: ${({ theme }) => theme.colors.color999};
  @media screen and (max-width: 520px) {
    font-size: 1.2rem;
  }
`
const ImageContainer = styled.img`
  object-fit: contain;
`

const CollectAndSellNFTs = (props: any) => {
  const { data } = props
  //need to implement richText here
  return (
    <SectionComp>
      <CollectAndSellContainer>
        <CollectAndSellImgBox>
          <ImageContainer src={data?.richText?.appLogo} alt="collect-and-sell-section" />
        </CollectAndSellImgBox>
        <BoxContainer>
          <CollectAndSellTextBox>
            <h3>{data?.richText?.name}</h3>
          </CollectAndSellTextBox>
          <FLexSpaceBetween>
            <div>
              <AuctionBoxMainText>{data?.richText?.stats?.art}</AuctionBoxMainText>
              <AuctionBoxSubText>Artwork</AuctionBoxSubText>
            </div>
            <div>
              <AuctionBoxMainText>{data?.richText?.stats?.auction}</AuctionBoxMainText>
              <AuctionBoxSubText>Auction</AuctionBoxSubText>
            </div>
            <div>
              <AuctionBoxMainText>{data?.richText?.stats?.creator}</AuctionBoxMainText>
              <AuctionBoxSubText>Creator</AuctionBoxSubText>
            </div>
          </FLexSpaceBetween>
        </BoxContainer>
      </CollectAndSellContainer>
    </SectionComp>
  )
}

export default CollectAndSellNFTs
