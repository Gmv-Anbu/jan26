import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@apps/customer/styles/CommonStyles'
import Pagination from '@apps/customer/components/pagination/pagination'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader';
import Highlights from './highlights';

import NotFound from '@apps/customer/components/NotFound'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'
import useNft from '../my-nft/useNFt'
import { ModalService } from '@nft-marketplace/modal'
import ArchiveModal from '@apps/customer/components/FormModal/archiveModal';
import Select from 'react-select';
import API from "../../../api/customer/index";
import { handleApiImage } from '../../../utils/helper';
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { SelectChangeEvent } from '@mui/material/Select';
import MUISelect from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyNftWrapper = styled.div`
  .Image-banner{
    margin-top: 12rem;
    img{
      width: 100% !important;
      object-fit: contain !important;
    }
  }
  display: flex;
  flex-direction: column;
  .flex-100{
    flex:0 0 100;
  }
  .flex-50{
    flex:0 0 50;
  }
  .align-start{
    align-self: flex-start;
  }
  .broadway-font{
    font-family:broadway !important;
  }
  .online-f{
    font-size:2.2rem;
  }
  .auction-f{
    font-size: 3rem;
    letter-spacing: 6px;
  }
  .pad-lef-80{
    padding-left:75%;
  }
  .sub-font{
    font-size: 1.5rem;
    line-height: inherit;
    font-weight: 600;
  }
  .display-flex{
    display:flex;
    align-items:center;

  }
  .filter-image{
    margin-left:10px;
    postion:relative;
  }
  .filter-options{
    display:none;
    z-index: 10;
  }
  .selection{
    flex:0 0 80%;
  }
  .margin-bottom-3vh{
    margin-bottom:3vh;
  }
  .display-block{
    display:block !important;
  }
  .mar-lr-10{
    padding:0px 10px;
    align-self: flex-end;
  }
  .filter-options{
    width:30vw;
    height:100vh;
    right:0px;
    top:0px;
    position:fixed;
    padding: 3rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    background-color: #fff;
    box-shadow: 0px 0px 20px -2px rgba(0,0,0,0.25), 2px 2px 4px 4px rgba(0,0,0,0.06);
    font-size:16px;
    input{
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: none;
    box-sizing: border-box;
    border: 1px solid lightgray;
    font-size: 16px;
    height: 50px;
    width:100%;
    
    }
  }
  .flex-90{
    flex:0 0 90%;
  }
  .margin-bottom-3vh{
    margin-bottom:3vh;
  }
  .filter-apply{
    color: #ffffff;
    background: #2a7575;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left:2rem;
    width: 102px;
    height: 29px;
  }
  .justify-content-right{
    justify-content:right;
  }
  .max-width-100{
    max-width:100% !important;
  }
  .padding-10vw{
    padding: 6rem 10vw;
  }
  .flex-50{
    flex:0 0 50%;
  }
  .ml-10{
    padding-left:10px;
    input{
      border-left:none !important;
    }
  }
  .mr-10{
    padding-right:10px;
    input{
      border-left:none !important;
    }
  }
  .estimate-font{
    color: #8A8A8A;
    margin-left: 9px;
    font-size:1.4rem !important;
  }
  .width-100{
    width:100%;
    font-size:1.6rem;
  }
  .width-100-percent{
     width:100% !important;
  }
  .time-card{
    box-shadow: 0px 2px 6px 0px #00000021;
    background: white;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 1.5rem;
    margin-left:5px;
  }
  .bid-now-width{
    width: 5vw !important;
  }
  @media screen and (max-width: 768px){
    .bid-now-width{
      width: auto !important;
      padding: 5px 10px;
    }
  }
  .upcoming-title{
    font-size: 3vh !important;
    margin-bottom: 3vh;
    flex:0 0 90%;
  }
  .viewall{
    color: #0e1818;
    font-weight: 600;
    text-align: right;
    cursor:pointer;
    flex: 0 0 10%;
    .viewall-arrow{
      margin-left:10px;
      position: relative;
      top: 1px;
    }
  }
  .FUTUREGRAIL-TAG{
    background:#e0e2e1;
    padding:15px 20px;
    width:100%;
    text-align:right;
  }
  .card-content{
    background:#51c2ca;
    min-height:10vh;
    width:100%;
    padding:15px;
  }
  .card-image-section{
    position: relative;
    left: -15px;
    background: aliceblue;
    top: 15px;
    img{
      object-fit:cover !important;
      width:100% !important;
    }
  }
  .card-image-description{
    background: #dee2e5c4;
    width: 90%;
    position: absolute;
    left: 10%;
    bottom: 10px;
    padding: 10px;
    p{
      font-size:1.2rem !important;
      line-height: inherit !important;
      margin-bottom: 5px;
      font-weight:600;
    }
    display:flex;
    align-items:center;
    .flex-60{
       flex:0 0 60%;
    }
    .flex-40{
      flex:0 0 40%;
      padding-left:10px;
   }
  }
 .pos-relative{
  position:relative;
 }
 .font-size-2{
  font-size:2rem;
 }
 @media screen and (max-width: 768px) {
 .mob-pad-0{
   padding:0px !important;
 }
}
`
const HeadSection = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;
  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 50px;
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    line-height: 104%;
    text-transform: uppercase;
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 24px;
      margin: 30px 0;
    }
  }
`
const ListBox = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
`

const Selector = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 47px;
  border-bottom: 0.2rem solid #e4e4e4;
  .active-h2,
  .not-active-h2 {
    font-style: normal;
    font-size: 1.6rem;
    text-align: center;
    cursor: pointer;
    padding: 0 10px 10px 10px;
    transition: border-bottom 0.2s;
  }
  .active-h2 {
    font-weight: 600;
    line-height: 120%;
    color: #2a7575;
    border-bottom: 0.5rem solid #2a7575;
  }
  .not-active-h2 {
    font-weight: 400;
    line-height: 142.5%;
    letter-spacing: -0.015em;
    color: #898989;
  }
  @media screen and (max-width: 768px) {
    gap: 24px;
    .active-h2,
    .not-active-h2 {
      font-size: 16px;
      padding: 0 0 10px 0;
    }
  }
`
const GridContianer = styled.div`
  padding: 0px 0 80px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 30.33% 30.33% 30.33%;
  gap: 6rem 3%;
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

const EventTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 3rem;
  border-bottom: 1.5286px solid #e1e1e1;
  @media screen and (max-width: 480px) {
    justify-content: center;
  }
`
const EventTime = styled.a`
  font-size: 22px;
  font-weight: 400;
  line-height: 26px;
  color: #4e4e4e;
  width: 25.4rem;
  padding: 2rem 0;
  text-align: center;
  cursor: pointer;
  &.active {
    color: #0e1818;
    font-weight: 600;
    position: relative;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 5px;
      border-radius: 10px 10px 0 0px;
      background: #2a7575;
    }
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  // 'Oliver Hansen',
  // 'Van Henry',
  // 'April Tucker',
  // 'Ralph Hubbard',
  // 'Omar Alexander',
  // 'Carlos Abbott',
  // 'Miriam Wagner',
  // 'Bradley Wilkerson',
  // 'Virginia Andrews',
  // 'Kelly Snyder',
];

const Auction = () => {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [activeAuction, setActiveAuction] = useState('upcoming');
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [sortOptions, setSortOptions] = useState([{
    name: 'Ascending(A-Z)',
    value: 'asc'
  },
  {
    name: 'Desceding(Z-A)',
    value: 'desc'
  },
  ]);
  const [sortType, setSortType] = useState('asc');

  const [auctionCards, setAuctionCard] = useState([])
  const [pageMeta, setPageMeta] = useState(null)
  const showArchiveModal = () =>
    ModalService.open((modalProps: any) =>
      <ArchiveModal close={modalProps.close} />
    )

  const updatePage = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const handleTab = (val) => {
    setActiveAuction(val)
    localStorage.setItem('auctionIndex', val)
  }

  const getAuctions = () => {
    setIsLoading(true);
    let filter = {};
    if (sortType) {
      // filter['sortBy'] = 'name';
      // filter['orderBy'] = sortType
    }
    API.getAuctions(currentPage, window.innerWidth>800 ? 3:4, activeAuction, filter).then((res) => {
      setIsLoading(false);
      console.log("res?.data", res?.data)
      if (res?.data) {
        calculateRemainingTimeForEachItem(res?.data?.data?.auctions)

        setPageMeta(res?.data?.data?.pageMeta)
      }
    }).catch((err) => {
      setIsLoading(false);
    })
  }

  const sortTypeHandler = (e) => {
    setSortType(e.value)
  }

  const handleChange = (e) => {

  }

  useEffect(() => {
    getAuctions();
  }, [activeAuction, currentPage, sortType])
  const calculateRemainingTime = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }

  useEffect(() => {
    let intervalId = setInterval(() => { calculateRemainingTimeForEachItem([...auctionCards]) }, 1000)
    return (() => {
      clearInterval(intervalId)
    })

  }, [auctionCards])

  const calculateRemainingTimeForEachItem = (tempArray) => {
    if (tempArray.length > 0) {
      tempArray.forEach((obj) => {
        if (activeAuction == 'live') {
          obj['remainingTime'] = calculateRemainingTime(obj?.endTime)
        } else if (activeAuction == 'upcoming' ) {
          obj['remainingTime'] = moment(obj?.startTime).format('DD-MMM-YYYY')

        }else if(activeAuction == 'past'){
          obj['remainingTime'] = moment(obj?.endTime).format('DD-MMM-YYYY')
        }

      })
      setAuctionCard(tempArray);
    }
  }


  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    )
  }

  return (
    <MyNftWrapper>
      <Container className='max-width-100 mob-pad-0'>
        {/* <HeadSection>
          <h1>Live Auction</h1>
        </HeadSection> */}
        <div className='Image-banner'>
          <img src='/images/customer/premium-Register now.jpg' alt="" />
        </div>
        {/* <Banner heading={activeAuction === 'live' ? 'Live Auctions' : 'Upcoming Auctions'} description={''} height={'450px'} /> */}
        <ListBox className='padding-10vw'>
          <EventTimeContainer>
            {/* <EventTime onClick={() => handleTab('past')} className={activeAuction === 'past' ? 'active' : ''}>
              Past Auctions {activeAuction=='past' && '('+pageMeta?.totalItems+')'}
            </EventTime> */}
            <EventTime onClick={() => handleTab('upcoming')} className={activeAuction === 'upcoming' ? 'active' : ''}>
              Upcoming
            </EventTime>
            <EventTime onClick={() => handleTab('past')} className={activeAuction === 'past' ? 'active' : ''}>
              Past Auctions
            </EventTime>
            <EventTime onClick={() => handleTab('live')} className={activeAuction === 'live' ? 'active' : ''}>
              All Live
            </EventTime>

          </EventTimeContainer>
          {/* <div className='pad-lef-80 display-flex margin-bottom-3vh'>
            <div className='selection'>
              <Select

                classNamePrefix="react-select"
                menuPlacement="auto"
                maxMenuHeight={300}
                onChange={sortTypeHandler}
                name="Sort"
                placeholder="Sort by"
                value={{ label: sortOptions.filter((obj) => { return obj.value == sortType })[0].name, value: sortOptions.filter((obj) => { return obj.value == sortType })[0].value }}
                options={sortOptions.map((option) => ({ label: option.name, value: option.value }))}
                isClearable={true}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    '&:hover': { borderColor: 'gray' }, // border style on hover
                    border: '1px solid lightgray', // default border color
                    boxShadow: 'none', // no box-shadow
                    fontSize: '16px',
                    height: '50px'
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '16px'
                  })
                }}
              />
            </div>

            <div className='filter-image'>
              <div className='filter-overlay'></div>
              <Image src="/images/customer/filter-image.png" onClick={() => { setDisplayFilter(!displayFilter) }} className='filter-image' width={50} height={50} />
              <div className={displayFilter ? 'filter-options display-block' : 'filter-options'}>
                <div className='display-flex margin-bottom-3vh'>
                  <h3 className='flex-90'>Filter By</h3>
                  <Image src="/images/customer/close-cross.png" onClick={() => { setDisplayFilter(false) }} width={24} height={24} />
                </div>
           
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon fontSize="large" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h4>Estimate</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className='display-flex'>
                        <div className='flex-50 mr-10'>
                          <TextField
                            required
                            id="outlined-start-adornment"
                            type={'number'}
                            sx={{ m: 1 }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                            }}
                          />
                        </div>
                        <div className='flex-50 ml-10'>
                          <TextField
                            required
                            sx={{ m: 1 }}
                            id="outlined-start-adornment"
                            type={'number'}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                            }}
                          />
                        </div>
                      </div>
                      <p className='estimate-font'>Based on the estimate range</p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon fontSize="large" />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <h4>Category</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <MUISelect
                        className='width-100'
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </MUISelect>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon fontSize="large" />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <h4>Brands</h4>
                    </AccordionSummary>
                  </Accordion>
                </div>
              </div>
            </div>

          </div> */}
          {auctionCards?.length ? (
            <ListItemsComp items={auctionCards} activeAuction={activeAuction} showArchiveModal={showArchiveModal} totalPage={Math.ceil(pageMeta?.totalItems / (window.innerWidth>800 ? 3:4))} currentPage={pageMeta?.page} updatePage={updatePage} />
          ) : (
            <NotFound padding="200px 0 156px" mrPadding="60px 0 0 0" />
          )}
        </ListBox>
        <Highlights />
        <Newsletter />
      </Container>
    </MyNftWrapper>
  )
}

const CardWrapper = styled.div`
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
  // padding: 30px;
  gap: 15px;
  cursor: pointer;
  .image-box {
    position: relative;
    width: 100%;
    max-width: 148px;
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
    .image-box {
      transform: scale(1.1);
    }
    .details h3 {
      color: ${({ theme }) => theme.colors.secondary} !important;
    }
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
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
      text-align: center;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
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
        color: #121212;
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
      }
      p {
        font-size: 16px;
        font-weight: 300;
        line-height: 20px;        
        color: #6B6B6B;
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
    .details {
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
      strong {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
      }
      h3 {
        font-size: 18px;
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
`
const CardButton = styled.button`
    position: relative;
    z-index: 5;
    display: block;
    width: 102px;
    height: 29px;
    background: #ffffff;
    border: 1px solid #2A7575;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    color: #2A7575;
`

function ListItemsComp({ items, showArchiveModal, totalPage, currentPage, updatePage, activeAuction }) {
  return (


    <>
      <GridContianer>
        {items.map((product, i) => {
          if (window.screen.availWidth < 549) {
            if (i < 4) {
              return <Card key={i} data={ product } showArchiveModal={showArchiveModal} activeAuction={activeAuction} />
            }
          } else {
            return <Card key={i} data={product} showArchiveModal={showArchiveModal} activeAuction={activeAuction} />
          }
        })}
      </GridContianer>
      {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}

    </>
  )
}

function Card({ data, showArchiveModal, activeAuction }) {

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
    <CardWrapper>
      <div className='width-100-percent pos-relative'>
        <p className='FUTUREGRAIL-TAG'>FUTUREGRAIL</p>
        <div className='card-content'>
          <h3 className='broadway-font online-f'>ONLINE</h3>
          <h2 className='broadway-font auction-f'>AUCTION</h2>
          <p className='sub-font'>{data?.assetEdition?.assetsData?.shortDescription}</p>
          {/* <h2 className='font-size-2'>{data?.assetEdition?.assetsData?.name}</h2>
          <p className='sub-font'>Ref Name:{data?.assetEdition?.assetsData?.refName}</p>
          <p className='sub-font'>Ref No:{data?.assetEdition?.assetsData?.refNo}</p> */}
          <div className='card-image-section'>
            {data?.assetEdition?.assetsData?.mainAssetUrl && <Image src={handleApiImage(data?.assetEdition?.assetsData?.mainAssetUrl)} alt="Product"  width={0}
  height={0}
  sizes="100vw"
  style={{ width: '100%', height: 'auto' }} />}
          </div>
        </div>
        <div className='card-image-description'>
          <div className='flex-50'>
          <p>{data?.assetEdition?.assetsData?.name}</p>
          <p>Ref Name:{data?.assetEdition?.assetsData?.refName}</p>
          <p>Ref No:{data?.assetEdition?.assetsData?.refNo}</p>
            {/* {activeAuction == 'live' && (<p>Ends In: {data?.remainingTime ? data?.remainingTime : '-'}</p>)}
            {activeAuction == 'past' && (<p>Completed On: {data?.remainingTime ? data?.remainingTime : '-'}</p>)}
            {activeAuction == 'upcoming' && (<p>Upcoming On: {data?.remainingTime ? data?.remainingTime : '-'}</p>)}
            {activeAuction == 'live' && (<p>Current Price: ${data?.bidAmount}</p>)}
            {activeAuction == 'past' && (<p>Price: ${data?.bidAmount}</p>)}
            {activeAuction == 'upcoming' && (<p>Estimate: ${data?.bidAmount}</p>)} */}
          </div>
          <div className='flex-50 align-start'>
            {/* {activeAuction == 'live' && <CardButton className='bid-now-width' onClick={() => router.push(`/base/auction/355`)}>Bid Now</CardButton>}
            {activeAuction == 'upcoming' && <CardButton className='bid-now-width'>Follow</CardButton>} */}
               {activeAuction == 'live' && (<p>Ends In: {data?.remainingTime ? data?.remainingTime : '-'}</p>)}
            {activeAuction == 'past' && (<p>Completed On: {data?.remainingTime ? data?.remainingTime : '-'}</p>)}
            {activeAuction == 'upcoming' && (<p>Upcoming On: {data?.remainingTime ? data?.remainingTime : '-'}</p>)}
            {activeAuction == 'live' && (<p>Current Price: ${data?.bidAmount}</p>)}
            {activeAuction == 'past' && (<p>Price: ${data?.bidAmount}</p>)}
            {activeAuction == 'upcoming' && (<p>Estimate: ${data?.bidAmount}</p>)}
          </div>

        </div>
      </div>
    </CardWrapper>
  )
}
export default Auction
