import React, { useCallback, useEffect, useState, } from 'react';
import API from "../../../api/customer/index";
import { useRouter } from 'next/router'
import styled from 'styled-components';
import Loader from '@apps/customer/modules/shared/components/Loader';
import NotFound from '@apps/customer/components/NotFound';
import Pagination from '@apps/customer/components/pagination/pagination';
import { handleApiImage } from '../../../utils/helper';
import Image from 'next/image'
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const HighlightContainer = styled.div`
padding: 0rem 10vw 6rem 10vw;
.highlight-header{
   font-size:22px;
   margin-bottom: 2vh;
}
.pad-slider{
  padding: 0px 1vw;
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

const GridContianer = styled.div`
  padding: 0px 0 80px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 19% 19% 19% 19% 19%;
  gap: 6rem 1%;
  /* place-content: center; */
  @media screen and (max-width: 1368px) {
    grid-template-columns: auto auto auto;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 20px;
  }
  @media screen and (max-width: 594px) {
    grid-template-columns: auto;
  }
`

const Line = styled.div`
  display: block;
  width: 100%;
  height: 2px;
  background: #d5d5d5;
  background: radial-gradient(circle, rgba(100, 114, 112, 0.272) 0%, rgba(200, 199, 193, 0) 100%);
  margin-bottom: 4px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`


const Highlights = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [highlightData, setHighlightData] = useState(null);
    const [pageMeta, setPageMeta] = useState(null);
    
    const updatePage = useCallback((page) => {
        setCurrentPage(page)
      }, [])
    const getAuctions = () => {
        setIsLoading(true);
        let filter = '';
        API.getAuctions(currentPage, window.innerWidth>800 ? 1000:1000, 'highlight', filter).then((res) => {
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



    return (
        <>
            <HighlightContainer>
                <h2 className='highlight-header'>Highlights</h2>
      
                    {highlightData?.length ? (
                        <ListItemsComp items={highlightData} getAuctions={getAuctions}  totalPage={Math.ceil(pageMeta?.totalItems / (window.innerWidth>800 ? 1000:1000))} currentPage={pageMeta?.page} updatePage={updatePage} />
                    ) : (
                        <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
                    )}
            </HighlightContainer>

        </>

    )
}

function ListItemsComp({ items, totalPage, currentPage, updatePage,getAuctions }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
    nextArrow: <ArrowForwardIosIcon  style={{'color':'rgb(42, 117, 117)','fontSize':'3rem'}} />,
    prevArrow: <ArrowBackIosNewIcon style={{'color':'rgb(42, 117, 117)','fontSize':'3rem'}} />,
    // beforeChange: getAuctions,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
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
    return (
  
  
      <>
        <Slider className="pad-slider" {...settings}>
          {items.map((product, i) => {
            if (window.screen.availWidth < 549) {
              if (i < 4) {
                return <Card  key={i} data={ product }  />
              }
            } else {
              return <Card key={i} data={product} />
            }
          })}
        </Slider>
        {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
  
      </>
    )
  }
  
  function Card({ data}) {
  
    const router = useRouter()
    return (
      // <CardWrapper>
      //   <p className='ends-font'><span className='ends-title'>{activeAuction == 'live' ? 'Ends In:' : ''} </span> <span className='time-card'>{data?.remainingTime ? data?.remainingTime : '-'}</span></p>
      //   <div className="image-box">
      //     {data?.assetEdition?.assetsData?.mainAssetUrl && <Image src={handleApiImage(data?.assetEdition?.assetsData?.mainAssetUrl)} alt="Product" width={250} height={303} objectFit="contain" />}
      //   </div>
      //   <div className="details">
      //     <p>{data?.assetEdition?.assetsData?.refName}</p>
      //     <strong>{data?.assetEdition?.assetsData?.refNo}</strong>
      //     <h3 >{data?.assetEdition?.assetsData?.name}</h3>
      //   </div>
      //   <hr></hr>
      //   <div className="btn-box">
      //     <div className="price-box">
      //       {' '}
      //       <p className='current-price-font'>{activeAuction == 'live' ? 'Current Price':'Estimate'}</p>
      //       <h4>$ {data?.bidAmount}</h4>
      //     </div>
      //     {activeAuction == 'live' ? <CardButton className='bid-now-width' onClick={() => router.push(`/base/auction/355`)}>Bid Now</CardButton> : <CardButton className='bid-now-width'>Follow</CardButton>}
      //   </div>
      // </CardWrapper>
      <>
                <HighlightCard className="pad-30px">
                    <div className='highlight-image'>
                    {data?.assetEdition?.assetsData?.mainAssetUrl && <Image src={handleApiImage(data?.assetEdition?.assetsData?.mainAssetUrl)} alt="Product"  width={0}
  height={0}
  sizes="100vw"
  style={{ width: '100%', height: 'auto' }} />}
                    </div>
                    <div className='highlight-content'>
                    <h3 className='highlight-content-first'>{data?.assetEdition?.assetsData?.name}</h3>
                    <h3 className='highlight-content-font'>Ref Name:{data?.assetEdition?.assetsData?.refName}</h3>
                    <h3 className='highlight-content-font'>Ref No:{data?.assetEdition?.assetsData?.refNo}</h3>
                    <h3 className='highlight-content-font'>Estimate:${data?.bidAmount}</h3>
                    </div>
                </HighlightCard>
      
      </>
    )
  }

export default Highlights;
