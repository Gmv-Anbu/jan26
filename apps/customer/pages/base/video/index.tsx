import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'

const MainContainer = styled.div`
  width: 100%;
  background: #000000;
  padding: 14rem 0rem;
  @media screen and (max-width: 768px) {
    padding: 12rem 0rem;
  }
`
const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  iframe {
    width: 1200px;
    min-width: 300px;
    height: 600px;
    min-height: 200px;
    border: none;
  }
  @media screen and (max-width: 768px) {
    iframe {
      width: 600px;
      min-width: 250px;
      height: 400px;
      min-height: 150px;
    }
  }
`

const VideoPage: any = () => {
  return (
    <MainContainer>
      <Container>
        <VideoContainer>
          <iframe src={'https://www.youtube.com/embed/DAj3rdYhNPI'}></iframe>
        </VideoContainer>
      </Container>
    </MainContainer>
  )
}

export default VideoPage
