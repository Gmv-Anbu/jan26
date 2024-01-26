import { handleApiImage } from '@apps/customer/utils/helper';
import Image from 'next/image';
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import styled from 'styled-components';
import Slider from 'react-slick'

const SectionComp = styled.section`
  padding: 10rem 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
  }
`;
const Heading = styled.h2`
  font-size: 4.8rem;
  font-weight: 600;
  line-height: 5.2rem;
  text-align: center;
  max-width: 56rem;
  margin: auto;
  margin-bottom: 3rem;
`;
const Text = styled.p`
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.3rem;
  text-align: center;
  max-width: 56rem;
  margin: auto;
  color: ${({ theme }) => theme.colors.color781};
  margin-bottom: 3rem;
  text-transform: capitalize;
`;

const SliderContainer = styled.div`
  .slick-slide {
    width: 220px;
  }
`

const Supporter = styled.div`
  padding: 2rem;
  margin: 0 1rem;
  &:hover {
    background: ${({ theme }) => theme.colors.supporterbg};
    border-radius: 2rem;
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin: 0 1rem 1rem 1rem;
    img {
      max-width: 12rem;
    }
  }
`;
const SupporterSection = () => {
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const supporters = ThemeConfiguration?.sections?.home?.supporters;

  const settings = {
    autoplay: true,
    autoplaySpeed: 1200,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 2
  }

  return (
    supporters && supporters?.isEnable ?
      <SectionComp>
        <Heading>
          {supporters?.name}
        </Heading>
        <Text>
          {supporters?.description}
        </Text>
        <SliderContainer>
          {supporters?.images?.length ? (
            <Slider {...settings}>
              {supporters?.images.map((image: string, index) => {
                return (
                  <Supporter key={`${index}-${image}`}>
                    <Image
                      width={180}
                      height={120}
                      src={handleApiImage(image)}
                      alt={'image'}
                    />
                  </Supporter>
                );
              })}
            </Slider>
          ) : null}
        </SliderContainer>
      </SectionComp> : null
  );
};

export default SupporterSection;
