import React, { useCallback, useEffect, useState,useRef } from 'react';
import API from "../../api/customer/index";
import { useRouter } from 'next/router'
import styled from 'styled-components';
import Loader from '@apps/customer/modules/shared/components/Loader';
import NotFound from '@apps/customer/components/NotFound';
import Pagination from '@apps/customer/components/pagination/pagination';
import { formatToUSD, handleApiImage } from '../../utils/helper';
import Image from 'next/image'
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ButtonPrimary } from '@apps/customer/modules/shared/components/button/button';

const CardWrapper = styled.div`

margin: 0 20px;
.current-price-font{
   color:#121212 !important;
}

.ends-font{
  color:#000000;
  font-weight:600;
}
.ends-title{
  color:#8A8A8A !important;
  font-size: 1.5rem;
}
  flex: 0 0 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1.09015px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
  gap: 15px;
  cursor: pointer;
  .image-box {
    position: relative;
    width: 100%;
    max-height: 220px;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    overflow: hidden;
    transition: all 0.7s ease-in-out;
  }
  &:hover {
    border: 1.09015px solid #2A7575;
    background:#f4ffff;
    .image-box {
      transform: scale(1.1);
    }
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    p, strong, h3 {
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      text-align: center;
      line-height: normal;
    }
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      color: #111727;
      /* text-transform: uppercase; */
    }
    strong {
      font-weight: 600;
      font-size: 18px;
      color: rgba(132, 138, 139, 1);
      /* text-transform: uppercase; */
    }
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #111727;
      /* text-transform: uppercase; */
    }
  }
  .line {
    width: 100%;
    height: 1px;
    margin: 2rem 0 1rem 0;
    padding: 1px;
    background: radial-gradient(circle, rgba(65, 173, 155, 0.2723214285714286) 0%, rgba(200, 199, 193, 0) 100%);
  }
  hr {
    position: relative;
    z-index: 2;
    border: 0px;
    height: 2px;
    padding: 1px;
    width: 100%;
    background: linear-gradient(90deg, rgba(209, 224, 226, 0) 0%, rgb(209, 224, 226) 52.11%, rgba(209, 224, 226, 0) 100%) !important;
  }
  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      h4 {
        color: #202a2a;
        font-size: 16px;
        font-weight: 900;
        line-height: 26px;
        font-family: proxima_novaBold;
        width: 100%;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
      }
      p {
        font-size: 12px;
        line-height: 20px;        
        color: #121212 !important;
        font-weight: 900;
        font-family: proxima_novalight;
      }
    }
  }
  .time-left {
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #8A8A8A;
    margin-bottom: 7px;
    span {
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        color: #000000;
        padding: 5px 12px;
        border-radius: 10px;
        margin-left: 10px;
        box-shadow: 0px 2px 6px 0px #0000000F;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 342px;
    min-width: 342px;
    .details {
      p {
        font-size: 18px;
        font-weight: 400;
        line-height: 28px;
      }
      strong {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
      }
      h3 {
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
      }
    }
    .btn-box {
      .price-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: flex-start;
        gap: 0.5rem;
        h4 {
          font-size: 18px;
          font-weight: 700;
          line-height: 25px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 470px) {
    max-width: 100%;
    min-width: 100%;
    margin: 0;
  }
`

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const HighlightContainer = styled.div`
  padding: 0rem 10vw 132px 10vw;
  .slick-list {
    width: calc(100% + 40px);
    left: -20px;
  }
  .slick-track {
    margin: 0;
  }
  .margin-top-10vh {
    margin-top: 10vh;
  }
  @media screen and (max-width: 800px) {
    padding: 0rem 24px 132px;
    .margin-top-10vh {
      margin-top: 7rem;
    }
  }
  @media screen and (max-width: 470px) {
    padding: 0rem 24px 5rem;
    .pad-slider {
      left: 0 !important;
    }
    .slick-list {
      width: 100%;
      left: 0;
    }
    .margin-top-10vh {
      margin-top: 5rem;
    }
  }
  .slick-prev{
    left: -20px !important;
    height: 60px !important;
    width: 60px !important;
    z-index: 3 !important;
  }
  .slick-next{
    right: -22px !important;
    height: 60px !important;
    width: 60px !important;
    z-index: 3 !important;
  }
.width-100{
  width:100%
}
.highlight-header{
   font-size:22px;
   margin-bottom: 2vh;
   color:#111727 !important;
}
@media screen and (min-width:900px){
  .highlight-header{
  font-size: 1.8vw !important;
  }
}
.pad-slider{
  padding: 0px;
  position: relative;
}
.highlight-image{
text-align:center;
}
.highlight-content-font{

  font-size: 1.8rem; 
  font-weight:500;
}
.highlight-content-first {
  
  font-size: 1.9rem !important; 
  font-weight:600 !important;
}
.highlight-content{
    padding-top:10px;
}
.pad-30px{
  padding: 0px 3%;
}
`
const HighlightCard = styled.div`

`

const VideoWrapper = styled.div`
  cursor: pointer;
  .videoComponent {
    position: relative;
  }
  video {
    object-fit: cover;
    width: 100%;
    height: 842px;
    @media screen and (max-width: 1600px) {
      height: 612px;
    }
    @media screen and (max-width: 1200px) {
      height: 459px;
    }
    @media screen and (max-width: 800px) {
      height: 389px;
    }
    @media screen and (max-width: 470px) {
      height: 180px;
    }
  }
  video::-webkit-media-controls-play-button {
    display: none;
  }
  video::-webkit-media-controls-start-playback-button {
    display: none;
  }
  video::-webkit-media-controls-play {
    display: none;
  }
  video::-webkit-media-controls-enclosure {
    overflow: hidden;
  }
  video::-moz-media-controls-play-button {
    display: none;
  }
`

const PlayBtn = styled.div`
  position: absolute;
  z-index: 1;
  border: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  // animation: pulse 1.5s cubic-bezier(0.29, 0.35, 0.94, 0.8) infinite alternate;
  @keyframes pulse {
    0% {
      transform: scale(0.95) translate(-50%, -50%);
      box-shadow: 0 0 0 0 transparent;
    }
    70% {
      transform: scale(1) translate(-50%, -50%);
      box-shadow: 0 0 0 10px transparent;
    }
  }
  @media screen and (max-width: 470px) {
    width: 40px !important;
    height: 40px !important;
  }
`


const Highlights = () => {

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [highlightData, setHighlightData] = useState(null);
  const [pageMeta, setPageMeta] = useState(null);
  const [isPlaying,setIsPlaying]= useState(false);
  const videoRef = useRef(null)

  const updatePage = useCallback((page) => {
    setCurrentPage(page)
  }, [])
  const getAuctions = () => {
    setIsLoading(true);
    let filter = '';
    API.getAuctions(currentPage, typeof window !== "undefined" && window?.innerWidth > 800 ? 1000 : 1000, 'highlight', filter).then((res) => {
      setIsLoading(false);
      console.log("res?.data tess", res?.data)
      if (res?.data) {
        setHighlightData(res?.data?.data?.auctions);
        setPageMeta(res?.data?.data?.pageMeta)
      }
    }).catch((err) => {
      setIsLoading(false);
    })
  }
  useEffect(() => {
    getAuctions();
  }, [currentPage])
  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    )
  }

  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current.play()
  }
  const handlePause = () => {
    setIsPlaying(false)
  }
  const handleClick = () => {
    if (isPlaying) {
      setIsPlaying(false)
      videoRef.current.pause()
    }
  }

  const handleStop = () => {
    setIsPlaying(false)
    videoRef.current.currentTime = 0
    videoRef.current.pause()
  }


  return (
    <>
      <HighlightContainer>
        <h2 className='highlight-header'>Highlights</h2>

        {highlightData?.length ? (
          <ListItemsComp items={highlightData} getAuctions={getAuctions} totalPage={Math.ceil(pageMeta?.totalItems / (typeof window !== "undefined" && window?.innerWidth > 800 ? 1000 : 1000))} currentPage={pageMeta?.page} updatePage={updatePage} />
        ) : (
          <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
        )}
        <div className='margin-top-10vh' >
          <h2 className='highlight-header'>Watch the highlights video</h2>
          <VideoWrapper>
            <div className="videoComponent">
              <PlayBtn className="playBtn-img">{!isPlaying && <Image onClick={handlePlay} width={86} height={86} src={`/images/customer/playbtn.png`} alt="ICO" />}</PlayBtn>
              <video
                onClick={handleClick}
                onPause={handlePause}
                onPlay={handlePlay}
                onEnded={handleStop}
                ref={videoRef}
                // muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                controlsList="nodownload noplaybackrate"
                poster="/images/customer/auctions/video-thumbnail-3.png"
              >
                <source type="video/mp4" src={'https://d3uwo5oqixn6qw.cloudfront.net/assets/10fc5407-2f73-4c8d-a2e5-551831f3d296.mp4'} />
              </video>
            </div>
          </VideoWrapper>
      </div>
      </HighlightContainer>
    </>
  )
}

function ListItemsComp({ items, totalPage, currentPage, updatePage, getAuctions }) {
  const settings = {
    dots: false,
    infinite: items?.length >= 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    // nextArrow: <ArrowForwardIosIcon style={{ 'color': 'rgb(42, 117, 117)', 'fontSize': '3rem' }} />,
    // prevArrow: <ArrowBackIosNewIcon style={{ 'color': 'rgb(42, 117, 117)', 'fontSize': '3rem' }} />,
    nextArrow:<img className='next-prev' src={'/images/customer/arrow-right.png'} alt="Product" />,
    prevArrow: <img className='next-prev'  src={'/images/customer/leftarrow.png'} alt="Product"  />,
    // beforeChange: getAuctions,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: items?.length >= 3,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: items?.length >= 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          infinite: items?.length >= 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: items?.length >= 1,
        },
      },
    ],
  }

  useEffect(() => {

  },[ items?.length])

  return (


    <>
      <Slider className="pad-slider" {...settings}>
        {items.map((product, i) => {
           return <Card key={i} data={product} />
        })}
      </Slider>
      {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}

    </>
  )
}

function Card({ data }) {

  const router = useRouter()
  return (
    <CardWrapper>
      <div className="image-box">
        {data?.assetEdition?.assetsData?.mainAssetUrl && <Image src={handleApiImage(data?.assetEdition?.assetsData?.mainAssetUrl)} alt="Product" width={250} height={303} objectFit="contain" />}
      </div>
      <div className="details">
        <p>{data?.assetEdition?.assetsData?.name}</p> 
        <strong>{data?.assetEdition?.assetsData?.refNo}</strong>
        <h3 >{data?.assetEdition?.assetsData?.refName}</h3>
      </div>
      <hr></hr>
      <div className="btn-box">
        <div className="price-box">
          {' '}
          <p className='current-price-font'>{'Estimate'}</p>
          <h4>{formatToUSD(data?.minPrice)} - {formatToUSD(data?.maxPrice)}</h4>
        </div>

      </div>
    </CardWrapper>
  )
}

export default Highlights;
