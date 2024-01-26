import { SectionHeading } from '@apps/customer/styles/section'
import Slider from 'react-slick'
import styled from 'styled-components'

import Card from '../shared/card/card'
import useTrendingData from './useTrendingData'

const SectionComp = styled.section`
  padding: 12rem 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  max-width: 100%;
  @media screen and (max-width: 768px) {
    padding: 6rem 0;
  }
`
const SliderContainer = styled.div`
  .slick-prev,
  .slick-next {
    top: -7rem;
    width: 4.6rem;
    height: 4.6rem;
    z-index: 2;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &:before {
      display: none;
    }
  }
  .slick-prev {
    right: 7rem;
    left: auto;
    background-image: url(/svgs/chevron-arrow-left.svg);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      top: -7.2rem;
    }
  }
  .slick-next {
    right: 2rem;
    background-image: url(/svgs/chevron-arrow-right.svg);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      top: -7.2rem;
    }
  }
  @media screen and (max-width: 520px) {
    .slick-prev,
    .slick-next {
      width: 3rem;
      height: 3rem;
    }
    .slick-prev {
      right: 3.5rem;
    }
    .slick-next {
      right: 0rem;
    }
  }
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`

const NFTCardSlider = (props: any) => {
  const { sectionTitle } = props

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  // const [nftList, setNFTList] = useState<any>([]);
  // const isAuthenticated = useSelector<RootState, any>(
  //   (state) => state?.userData?.isAuthenticated
  // );
  // const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)

  // const items = 5;
  // // method to get trending nft list
  // const getTrendingNFTItems = (page: number) => {
  //   MarketService.getTrendingNFTList(page, items)
  //     .then((res) => {
  //       const trendingList = processCardData(res?.data?.data?.assetList,res?.data?.data?.exchangeRates);
  //       setNFTList(trendingList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getTrendingNFTItems(1);
  // }, []);

  const { nftList } = useTrendingData()
  return (
    <SectionComp>
      <SectionHeading marginBottom="4">{sectionTitle || ''}</SectionHeading>
      <SliderContainer>
        <Slider {...settings}>
          {nftList?.map((data: any) => (
            <Card key={data.id} vidHeight={24.2} type="slider" {...data}></Card>
          ))}
        </Slider>
      </SliderContainer>
    </SectionComp>
  )
}

export default NFTCardSlider
