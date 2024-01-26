import Image from 'next/image'
import styled from 'styled-components'

const Box = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem 0;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 120%;
    color: #0e1818;
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2.75rem;
    }
  }
  @media screen and (max-width: 376px) {
    padding: 5rem 0 0 0;
  }
`
const IconsBox = styled.div`
  width: max-content;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  .icons {
    max-width: 22.5px;
    max-height: 22.5px;
    img {
      min-width: 22.5px;
      max-height: 22px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 22px;
    max-height: 22px;
    .icons {
      img {
        min-width: 22px;
        max-height: 22px;
      }
    }
  }
`

const ShareNowBox = ({ title = 'Share Now', images }) => {
  return (
    <Box>
      <h1>{title}</h1>
      <IconsBox>
        {images.map((image, key) => (
          <div className="icons" key={key}>
            <Image src={image.src} alt={image.alt} />
          </div>
        ))}
      </IconsBox>
    </Box>
  )
}
export default ShareNowBox
