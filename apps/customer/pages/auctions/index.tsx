import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@apps/customer/styles/CommonStyles'
import Pagination from '@apps/customer/components/pagination/pagination'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from '@apps/customer/modules/shared/components/Loader';
import Highlights from '../../modules/auctions/highlights';

import NotFound from '@apps/customer/components/NotFound'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'
import useNft from '../base/my-nft/useNFt'
import { ModalService } from '@nft-marketplace/modal'
import ArchiveModal from '@apps/customer/components/FormModal/archiveModal';
import Select from 'react-select';
import API from "../../api/customer/index";
import { handleApiImage } from '../../utils/helper';
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
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@apps/customer/redux/store'
import AuctionCard from '@apps/customer/components/cardDesigns/auctionCard'
import { getCookie, setCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '@apps/customer/utils/storage'
import Toast from '@apps/customer/components/Toast-Popup/toast-popup'
import Icon from '@apps/customer/modules/shared/components/icon/icon'
import BuyFilter from '@apps/customer/components/filterModal/buyFilter'
import AuctionFilter from '@apps/customer/components/filterModal/auctionFilter'
import config from '../../apiConfig'

const FullPageLoader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingDummyContainer = styled.div`
  min-height: 600px;
`

const AuctionPageWrapper = styled.div`
.loader-section{
  position:fixed;
  left:0px;
  top:0px;
  width:100vw;
  height:100vh;
  z-index:100;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #0000006e;
}
.bg-text{
  background: url(/images/customer/shared/bg-footer-txt.png) no-repeat bottom center;
  background-size: 100%;
}
  .Image-banner{
    margin-top: 12rem;
    img{
      width: 100% !important;
      object-fit: contain !important;
    }
  
  }
  @media screen and (min-width:400px) and (max-width:800px){
    .Image-banner{
      margin-top: 7vh;
    }
  }

  @media screen and (max-width:400px){
    .Image-banner{
      margin-top: 9vh;
    }
  }
  @media screen and (min-width:810px) and (max-width:912px){
    .Image-banner{
      margin-top: 5vh;
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
const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 9px;
  max-height: 44px;
  max-width: 44px;
  border: 1.5px solid #D1E0E2;
  margin-left: 24px;
  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
  }
  @media screen and (max-width: 500px) {
    float: right;
    margin-bottom: 2rem;
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
  padding: 6rem 0;
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
  @media screen and (min-width: 800px) {
    grid-template-columns: 31.33% 31.33% 31.33%;
  }
  /* place-content: center; */
  @media screen and (max-width: 1368px) {
    grid-template-columns: auto auto auto;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 20px;
    padding: 0;
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
  justify-content: space-between;
  margin-bottom: 3rem;
  border-bottom: 1.5286px solid #e1e1e1;
  div {
    display: flex;
    align-items: center;
    overflow-x: auto;
  }
  a.reg {
    font-size: 16px;
    font-weight: 600;
  }
  @media screen and (max-width: 480px) {
    justify-content: center;
    a.reg {
      font-size: 14px;
      position: absolute;
      top: 0;
      right: 8px;
    }
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
const LiveAuctionCardWrapper = styled.div`
  padding: 0px 0 40px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: flex-start;
  gap: 8rem 3rem;
  &.no-product {
    justify-content: center;
    grid-template-columns: auto;
    .img-box {
      margin: 0 0 50px 0;
    }
  }
  @media screen and (max-width: 1368px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media screen and (max-width: 594px) {
    grid-template-columns: 1fr;
  }
`
const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media screen and (max-width: 500px) {
    display: block;
  }
`
const CategoryNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  overflow-x: auto;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    width: 3px;
    display: none;
  }
  a {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    color: #898989;
    cursor: pointer;
    min-width: 80px;
    text-align: center;
    padding: 1.7rem 2.1rem;
    border-radius: 59px;
    border: 1px solid #D1E0E2;
    background-color: #F4F9F9;
    white-space: nowrap;
    &.active {
      background-color: #2A7575;
      color: white;
      border: 0;
    }
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
  
  const { API_URL } = config
  const router = useRouter()
  const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
  const [currentPage, setCurrentPage] = useState(Number(getCookie('auctionRedirect')?.split('-')?.[2]) || 1)
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1)
  const [activeAuction, setActiveAuction] = useState(getCookie('auctionRedirect')?.split('-')?.[0] || 'upcoming');
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [sortOptions, setSortOptions] = useState([
    { name: 'Ascending(A-Z)', value: 'asc' },
    { name: 'Desceding(Z-A)', value: 'desc' },
  ]);
  const [sortType, setSortType] = useState('asc');
  const [pageMeta, setPageMeta] = useState(null)
  // cards
  const [commonCards, setCommonCards] = useState([1,2,3])
  const [liveState, setLiveState] = useState(1)
  const [liveCards, setLiveCards] = useState([])
  const [upcomingState, setUpcomingState] = useState(1)
  const [upcomingCards, setUpcomingCards] = useState([])
  const [pastState, setPastState] = useState(1)
  const [pastCards, setPastCards] = useState([])
  // category
  const [activeCategory, setActiveCategory] = useState(getCookie('auctionRedirect')?.split('-')?.[1] || null)
  const categoryOptions = [
    { label: 'All', value: 'all'},
    { label: 'Modern/Independents', value: '4,5'},
    { label: 'Pocket Watches', value: '7'},
    { label: 'Vintage Watches', value: '6'}
  ]
  let filterOG = {
    search: '',
    minPrice: '',
    maxPrice: '',
    // from: '',
    // to: ''
  }
  const [brands, setBrands] = useState([])
  const [filterData, setFilterData] = useState(filterOG)
  const [displayFilter, setDisplayFilter] = useState(false);
  const openFilter = () => setDisplayFilter(true)
  const closeFilter = () => setDisplayFilter(false) 
  const reserveNotMet = ['183', '199', '203', '149']
  const noBids = ['47']
  const envs = ['https://api-asn-qa1.devtomaster.com', 'https://api-asn-dev1.devtomaster.com', 'https://api-asn-uat1.devtomaster.com']

  // const liveAuctionCards = [
  //   { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '$25,400', image: '/images/customer/dashboard/watch-1.png'  },
  //   { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '$25,400', image: '/images/customer/dashboard/watch-2.png'  },
  //   { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '$25,400', image: '/images/customer/dashboard/watch-3.png'  },
  // ]
  const liveAuctionCards = [
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-3.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-2.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-4.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-1.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-3.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“American” Calendar', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-2.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-4.png'  },
    { refName: 'Patek Philippe & Co', refNo: 'Ref. 3418A N ', name: '“Amag” “Noir” Early 1st Series', price: '25,400', ethPrice: '0.035', image: '/images/customer/dashboard/watch-1.png'  },
  ]

  const applyFilter = (val) => {
    if(val === 'clear') {
      getAuctionsData(true, true)
    } else if(filterData?.search === '' && filterData?.minPrice === '' && filterData?.maxPrice === '')  {
      getAuctionsData()
    } else if(filterData?.search?.length || filterData?.minPrice?.length && filterData?.maxPrice?.length) {
      getAuctionsData()
    }
    closeFilter()
  }

  const changeState = (val, type) => {
    // console.log('changeState', val, type, categoryOptions[val])
    if(type === 'live') {
      setLiveState(2)
      setActiveCategory(categoryOptions[val+1]?.value)
    } else if(type === 'past') {
      setPastState(2)
      setActiveCategory(categoryOptions[val+1]?.value)
    } else {
      setUpcomingState(2)
      setActiveCategory(categoryOptions[val + 1]?.value)
    }
  }

  const updatePage = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const handleTab = (val) => {
    setActiveAuction(val)
    localStorage.setItem('auctionIndex', val)
  }

  const getAuctionsData = (loading = true, clear = false) => {
    if(loading!) setIsLoading(true);
    let filter = {};
    if(activeCategory !== 'all') {
      filter['categoryId'] = activeCategory === 'null' ? null : activeCategory
    }
    if(filterData?.minPrice?.length && filterData?.maxPrice?.length) {
      filter['minPrice'] = filterData?.minPrice
      filter['maxPrice'] = filterData?.maxPrice
    }
    let search = filterData?.search 
    if(clear) {
      filter = {}
      search = ''
    } 
    if (activeAuction === 'past') filter['includeNullBids'] = false
    let limit = typeof window !== "undefined" && window.innerWidth > 800 ? 24 : 12
    API.getAuctions(currentPage, limit, activeAuction, filter, search)
    .then((res) => {
      setIsLoading(false);
      // console.log("res?.data", res?.data)
      if (res?.data && res?.data?.data?.auctions?.length) {
        setTotalPage(Math.ceil(res?.data?.data?.pageMeta?.totalItems / limit))
        setPageMeta(res?.data?.data?.pageMeta)
        if(activeAuction  === 'live' || activeAuction === 'upcoming') {
          calculateRemainingTimeForEachItem(res?.data?.data?.auctions)
        } else {
          calculateRemainingTimeForEachItem(res?.data?.data?.auctions)
        }
      } else {
        setUpcomingCards([])
        setLiveCards([])
        setPastCards([])
      }
    }).catch((err) => {
      setIsLoading(false);
    })
  }

  const updateFav = async (id, val) => {
    console.log('id', id, val)
    const response = await API.createOrRemovefavorite({assetId: id })
    if (response?.status === 200) {
      Toast.success(response?.data?.data?.isFavorite ? 'Added to favorite' : 'Removed from favorite')
      getAuctionsData(false)
    } else {
      Toast.error(response.error.error.message || 'Something went wrong try again later')
    }
  }

  const calculateRemainingTime = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    if(days === 0 && hours === 0) {
      return minutes + "m " + seconds + "s"
    } else if(days === 0) {
      return hours + "h " + minutes + "m " + seconds + "s";
    } else {
      return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }
  }

  const calculateRemainingTimeForEachItem = (tempArray) => {
    if (tempArray.length > 0) {
      tempArray.forEach((obj) => {
        if (activeAuction == 'live') {
          obj['remainingTime'] = calculateRemainingTime(obj?.endTime)
        } else if (activeAuction == 'upcoming' ) {
          obj['remainingTime'] = moment(obj?.endTime).format('DD-MMM-YYYY')
        }else if(activeAuction == 'past'){
          obj['remainingTime'] = moment(obj?.endTime).format('DD-MMM-YYYY')
        }
      })
      if(activeAuction == 'live') {
        setLiveCards(tempArray);
        setUpcomingCards([])
        setPastCards([])
      } else if(activeAuction == 'upcoming') {
        setUpcomingCards(tempArray)
        setLiveCards([])
        setPastCards([])
      } else {
        setUpcomingCards([])
        setLiveCards([])
        setPastCards(tempArray)
      }
    }
  }

  useEffect(() => {
    let intervalId = setInterval(() => { calculateRemainingTimeForEachItem([...liveCards]) }, 1000)
    return (() => {
      clearInterval(intervalId)
    })
  }, [liveCards])

  useEffect(() => {
    document.getElementsByTagName( 'html' )[0].setAttribute('class','')
    document.body.classList.remove('overflow-hidden');
  }, [currentPage, sortType])

  useEffect(() => {
    if (activeAuction === 'live' || activeAuction === 'upcoming' || activeAuction === 'past') {
      if(activeCategory !== null && currentPage === 1) {
        getAuctionsData();
        setTimeout(() => setCookie('auctionRedirect', `${activeAuction}-${activeCategory}-${currentPage}`), 500)
      } else {
        setCurrentPage(1)
      }
    }
  },[activeCategory])

  useEffect(() => {
    if (activeAuction === 'live' || activeAuction === 'upcoming' || activeAuction === 'past') {
      getAuctionsData();
      setTimeout(() => setCookie('auctionRedirect', `${activeAuction}-${activeCategory}-${currentPage}`), 500)
    }
  },[currentPage])

  useEffect(() => {
    setLiveState(1)
    setUpcomingState(1)
    setPastState(1)
    setActiveCategory(null)
    setCurrentPage(1)
  },[activeAuction])

  useEffect(() => {
    let int = getCookie('auctionRedirect')
    if(int) {
      console.log('int', int, int.split('-')?.[0], int.split('-')?.[1], int.split('-')?.[2], currentPage)
      setActiveAuction(int.split('-')?.[0])
      setCurrentPage(Number(int.split('-')?.[2]) || 1)
      setActiveCategory(int.split('-')?.[1])
      if(int.split('-')?.[0] === 'live') {
        setTimeout(() => setLiveState(2), 500)
      } else if (int.split('-')?.[0] === 'past') {
        setTimeout(() => setPastState(2), 500)
      } else {
        setTimeout(() => setUpcomingState(2), 500)
      }
      setTimeout(() => {
        let el = document.getElementById('auction-container')
        el.scrollIntoView({ behavior: "smooth", });
      }, 500)
    }
  },[])

  // if (isLoading) {
  //   return (
  //     <FullPageLoader>
  //     </FullPageLoader>
  //   )
  // }

  return (
    <AuctionPageWrapper>
      {isLoading && (
         <div className='loader-section'>
      <Loader />
      </div>
      )}
      {displayFilter ? <AuctionFilter show={displayFilter} applyFilter={applyFilter} filterData={filterData} setFilterData={setFilterData} closeFilter={closeFilter} /> : null}
      <div className='Image-banner'>
        {profileData?.id && profileData?.accessToken 
        ? <img src='/images/customer/premium-Register now.jpg' alt="premium-Register now" />
        : <Link href="/base/signup">
          <a><img src='/images/customer/premium-Register now.jpg' alt="premium-Register now" /></a>
        </Link>}
      </div>
      <Container>
        {/* <HeadSection>
          <h1>Live Auction</h1>
        </HeadSection> */}
        {/* <Banner heading={activeAuction === 'live' ? 'Live Auctions' : 'Upcoming Auctions'} description={''} height={'450px'} /> */}
        <ListBox id='auction-container' className='bg-text'>
          <EventTimeContainer>
            {/* <EventTime onClick={() => handleTab('past')} className={activeAuction === 'past' ? 'active' : ''}>
              Past Auctions {activeAuction=='past' && '('+pageMeta?.totalItems+')'}
            </EventTime> */}
            <div>
              <EventTime onClick={() => handleTab('live')} className={activeAuction === 'live' ? 'active' : ''}>
                All Live
              </EventTime>
              <EventTime onClick={() => handleTab('upcoming')} className={activeAuction === 'upcoming' ? 'active' : ''}>
                Upcoming
              </EventTime>
              <EventTime onClick={() => handleTab('past')} className={activeAuction === 'past' ? 'active' : ''}>
                Past 
              </EventTime>
            </div>
            <a className='reg' href={`/files/fg-how-to-register.pdf`} target="_blank">
              (How to Register for Auction)
          </a>
          </EventTimeContainer>
          <div>
            {activeAuction === 'live' && envs.includes(API_URL)
            ? <>
              {liveState === 1 
              ? <>
                {commonCards?.length 
                ? <ListItemsComp items={commonCards} activeAuction={activeAuction} onClick={(val) => changeState(val, 'live')} totalPage={1} currentPage={1} updatePage={updatePage} />
                : <NotFound padding="100px 0" mrPadding="60px 0 0 0" />}
              </>
              : <>
                <CategoryFilter>
                  <CategoryNav>
                      {categoryOptions?.map(el => {
                        return <a key={el?.value} className={`${activeCategory === el?.value ? 'active' : ''}`} onClick={() => setActiveCategory(el?.value)} >{el?.label}</a>
                      })}
                  </CategoryNav>
                  <FilterWrapper onClick={openFilter}>
                    <Icon name="filter" />
                  </FilterWrapper>
                </CategoryFilter>
                <LiveAuctionCardWrapper className={`${liveCards?.length === 0 ? 'no-product' : ''}`}>
                  {isLoading 
                  ? <LoadingDummyContainer></LoadingDummyContainer> 
                  : <>
                    {liveCards?.length 
                    ? liveCards.map((el,i) => {
                      return (
                        <AuctionCard auctionType={activeAuction} data={el} updateFav={updateFav} routerPush={profileData?.id && profileData?.accessToken ? `/auctions/${el?.id}` : `/auctions/${el?.id}`} key={i} />
                      )
                    })
                    : <NotFound padding="100px 0" mrPadding="60px 0 0 0" />}
                  </>}
                </LiveAuctionCardWrapper>
                {liveCards?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
              </>}
              {/* <NotFound padding="100px 0" mrPadding="60px 0 0 0" /> */}
            </>
              : activeAuction === 'upcoming' 
              ? <>
                {upcomingState === 1 
                ? <>
                  {commonCards?.length 
                  ? <GridContianer>
                      {commonCards.map((product, i) => {
                        return <Card key={i} data={ product } index={i} onClick={(val) => changeState(val, 'upcoming')} activeAuction={activeAuction} />
                      })}
                    </GridContianer>
                  : <NotFound padding="100px 0" mrPadding="60px 0 0 0" />}
                </>
                : <>
                  <CategoryFilter>
                    <CategoryNav>
                        {categoryOptions?.map(el => {
                          return <a key={el?.value} className={`${activeCategory === el?.value ? 'active' : ''}`} onClick={() => setActiveCategory(el?.value)} >{el?.label}</a>
                        })}
                    </CategoryNav>
                    <FilterWrapper onClick={openFilter}>
                      <Icon name="filter" />
                    </FilterWrapper>
                  </CategoryFilter>
                  <LiveAuctionCardWrapper className={`${upcomingCards?.length === 0 ? 'no-product' : ''}`}>
                    {isLoading 
                    ? <LoadingDummyContainer></LoadingDummyContainer>   
                    : <>
                      {upcomingCards?.length 
                      ? upcomingCards.map((el,i) => {
                        return (
                          <AuctionCard auctionType={activeAuction} updateFav={updateFav} data={el} routerPush={profileData?.id && profileData?.accessToken ? `/auctions/${el?.id}` : `/auctions/${el?.id}`} key={i} />
                        )
                      })
                      : <NotFound padding="100px 0" mrPadding="60px 0 0 0" />}
                    </>}
                  </LiveAuctionCardWrapper>
                  {upcomingCards?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
                </>}
              </> 
                : activeAuction === 'past' 
                ? <>
                    {pastState === 1
                      ? <>
                        {commonCards?.length
                          ? <ListItemsComp items={commonCards} activeAuction={activeAuction} onClick={(val) => changeState(val, 'past')} totalPage={1} currentPage={1} updatePage={updatePage} />
                          : <NotFound padding="100px 0" mrPadding="60px 0 0 0" />}
                      </>
                      : <>
                        <CategoryFilter>
                          <CategoryNav>
                            {categoryOptions?.map(el => {
                              return <a key={el?.value} className={`${activeCategory === el?.value ? 'active' : ''}`} onClick={() => setActiveCategory(el?.value)} >{el?.label}</a>
                            })}
                          </CategoryNav>
                          <FilterWrapper onClick={openFilter}>
                            <Icon name="filter" />
                          </FilterWrapper>
                        </CategoryFilter>
                        <LiveAuctionCardWrapper className={`${pastCards?.length === 0 ? 'no-product' : ''}`}>
                          {isLoading
                            ? <LoadingDummyContainer></LoadingDummyContainer>
                            : <>
                              {pastCards?.length
                                ? pastCards.map((el, i) => {
                                  return (
                                    <AuctionCard auctionType={activeAuction} updateFav={updateFav} data={el} routerPush={profileData?.id && profileData?.accessToken ? `/auctions/${el?.id}` : `/auctions/${el?.id}`} key={i} />
                                  )
                                })
                                : <NotFound padding="100px 0" mrPadding="60px 0 0 0" />}
                            </>}
                        </LiveAuctionCardWrapper>
                        {pastCards?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null}
                      </>}
                </>
                : null}
          </div>
        </ListBox>
        <Highlights />
        <Newsletter page='auctions' />
      </Container>
    </AuctionPageWrapper>
  )
}

const CardWrapper = styled.div`
transition: all .2s ease-in-out;
&:hover {
  transform: scale(1.03);
}
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

function ListItemsComp({ items, onClick, totalPage, currentPage, updatePage, activeAuction }) {
  return (
    <>
      <GridContianer>
        {items.map((product, i) => {
          return <Card key={i} data={ product } index={i} onClick={onClick} activeAuction={activeAuction} />
        })}
      </GridContianer>
      {/* {items?.length && totalPage > 1 ? <Pagination totalPage={totalPage} currentPage={currentPage} updatePage={updatePage} /> : null} */}

    </>
  )
}

function Card({ data, onClick, activeAuction, index }) {

  const router = useRouter()
  return (
    <CardWrapper onClick={() => onClick(index)}>
        <img style={{width:"100%"}} src={activeAuction === 'upcoming' ? "/images/customer/auctions/upcoming-banner.jpg" : "/images/customer/auctions/img-new-"+(index+1)+".jpg"} alt="" />
    </CardWrapper>
  )
}
export default Auction
