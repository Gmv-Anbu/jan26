import styled from 'styled-components'
import Avatar from '../avatar/avatar'
import ICard from './card.interface'

const CardContainer = styled.div`
  width: 33rem;
  height: 41.7rem;
  background: ${({ theme }) => theme.colors.secondary};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.fontprimary};
  padding: 1.4rem;
  margin: 1rem;
  margin-bottom: 5rem;
  @media screen and (max-width: 1500px) {
    width: 28.5rem;
  }
`
const PreviewContainer = styled.div`
  position: relative;
  border-radius: 1.5rem;
  width: 100%;
  height: 100%;
`
const CardContent = styled.div`
  width: 100%;
`
const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 2rem;
  font-weight: 700;
  line-height: 3rem;
  margin: 0;
  text-transform: capitalize;
  max-width: 15rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`
const CardTotalNFTs = styled.p`
  font-family: ${({ theme }) => theme.fontsFamily.primary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.color6C6};
  margin: 0;
  margin-bottom: 2rem;
`
const ContainerBGImg = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`

const CollectionCard = ({ id, coverImg, title, totalNFTs, userImg, userName, isVerified, onClick }: ICard) => {
  return (
    <CardContainer key={id} onClick={onClick}>
      <PreviewContainer>
        <ContainerBGImg
          style={{
            backgroundImage: `linear-gradient(1.33deg, rgba(0, 0, 0, 0.5) 3.52%, rgba(0, 0, 0, 0) 98.87%), url(${coverImg})`,
          }}
        >
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardTotalNFTs>{totalNFTs} NFT</CardTotalNFTs>
            {userImg ? <Avatar collection={true} withBG={true} atTheRate={false} image={userImg} userName={userName} isVerified={isVerified} /> : <Avatar image={'/images/customer/avatar.png'} userName={userName} isVerified={isVerified} />}
          </CardContent>
        </ContainerBGImg>
      </PreviewContainer>
    </CardContainer>
  )
}

export default CollectionCard
