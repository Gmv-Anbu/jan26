import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const FilterTabList = styled.div`
	margin:4rem 0 0;
	justify-content:left;
	align-items: center;
	display: flex;
`
const FilterTab = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 1.4rem;
    display:inline-block;
    padding: 1rem;
`
const FilterTabLink = styled.button`
	border: none; 
	outline: none;
	background:none;
	border:1px solid ${({ theme }) => theme.colors.transparent};
	color:${({ theme }) => theme.colors.fontdark};
	padding: 0.5rem 1rem;
	text-decoration: none;
	border-radius: 0.5rem;
	font-size:1.8rem;
	padding:0.5rem 3rem;
	font-family: ${({theme}) => theme.fontsFamily.primary};
	font-weight: 400;
	line-height: 2.8rem;
	margin: 0 .4rem;
    &:hover, &:active {
        background: ${({ theme }) => theme.colors.singleOptionbg};
		border: 1px solid ${({ theme }) => theme.colors.borderColor};
        border-radius: 1rem;
        color:${({ theme }) => theme.colors.white};
    } 
	&.active  {
        background: ${({ theme }) => theme.colors.singleOptionbg};
		border: 1px solid ${({ theme }) => theme.colors.borderColor};
        border-radius: 1rem;
        color:${({ theme }) => theme.colors.white};
		font-weight: 600;
    }
	@media screen and (max-width: 576px) {
        padding:0.5rem 1.5rem;
		margin: 0 .5rem;
		font-size:1.4rem;
    }
`
const FilterTabWrapper = styled.div`
    margin: 1.5rem 0 0;
	position: relative;
	padding-bottom: 7.5rem;
	&:before {
		content: '';
		width: 50vw;
		height: 100%;
		background: ${({ theme }) => theme.colors.tabcontentActivitybg};
		position: absolute;
		left: -6.7rem;
		z-index: 0;
		@media screen and (max-width: 786px) {
			display: none;
		}
	}
`
const FlexBodyRowFlex	= styled.div`
    padding: 1.5rem 4.2rem 1.5rem 2rem;
    margin-bottom: 1.2rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.flexBodyRowFlexbg};;
	border-radius:1.5rem;
    display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 8.27216px 19.3017px ${({ theme }) => theme.colors.rowFlexShadow};
	font-family: ${({theme}) => theme.fontsFamily.primary};
	@media screen and (max-width: 576px) {
        padding: 1.2rem;
    }
`
const ArtCol = styled.div`
    display:flex;
	align-items:center;
	p {
		font-size:1.6rem;
		font-weight: 500;
		line-height: 2.6rem;
		color:${({ theme }) => theme.colors.currentBidsColor};
	}
	span {
		font-size: 1.3rem;
		font-weight: 400;
		line-height: 2.1rem;
		color: ${({ theme }) => theme.colors.fontdark};
	}
	span.img {
		display:flex;
		width: 4.1rem;
		height: 4.1rem;
		margin-right: 2.2rem;
		min-width: 4.1rem;
	}
	@media screen and (max-width: 576px) {
        span.img {
			margin-right: 1rem;
		}
    }
`
const EthCol = styled.div`
	p {
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 29px;
		color:${({ theme }) => theme.colors.currentBidsColor};
		white-space: nowrap;
	}
	span {
		font-size: 1.3rem;
		font-weight: 400;
		line-height: 2.1rem;
		color: ${({ theme }) => theme.colors.fontdark};
	}
`
const FilterTabContent = styled.div`
	position: relative;
	padding: 2rem 0;
	max-width: 58rem;
`
const DetailsTab = styled.div`
	p {
		font-family: ${({theme}) => theme.fontsFamily.primary};
		font-weight: 400;
		line-height: 24px;
		margin: 0;
		&.label {
			font-size: 16px;
			color: ${({ theme }) => theme.colors.white};
		}
		&.desc {
			font-size: 14px;	
			color: ${({ theme }) => theme.colors.currentBidsColor};
		}
	}
	.tr {
		display: grid;
		grid-template-columns: 9rem auto;
		margin-bottom: 1.2rem;
		grid-gap: 1rem;
		align-items: baseline;
		&:first-child {
			display: block;
			margin-bottom: 3rem;
			p.label {
				margin: 0 0 1.1rem 0;
			}
		}
	}
`

const CardFilter = () => {

	const [selected, setSelected] = useState('details')


	const Listing = [
        {
            id : 1,
            img: '/images/customer/customer1.png',
            ethcol: 'ETH 2.25',
			date: '08 June 13',
        },
		{
            id : 2,
            img: '/images/customer/customer1.png',
            ethcol: 'ETH 2.25',
			date: '08 June 13',
        },
		{
            id : 3,
            img: '/images/customer/customer2.png',
            ethcol: 'ETH 2.25',
			date: '08 June 13',
        },
		{
            id : 4,
            img: '/images/customer/customer2.png',
            ethcol: 'ETH 2.25',
			date: '08 June 13',
        },
		{
            id : 5,
            img: '/images/customer/customer1.png',
            ethcol: 'ETH 2.25',
			date: '08 June 13',
        }
	]
	const listName = Listing.map(listings =>(
		<FlexBodyRowFlex>	
			<ArtCol>
				<span className='img'>
					<Image src={listings.img} alt='Customer1' width="41" height="41" />
				</span>
				<div><p>Bid placed by @jcdavis</p> <span>Oct 25,2021</span></div>
			</ArtCol>
			<EthCol>
				<p>{listings.ethcol}</p>
				<span>{listings.date}</span>
			</EthCol>
		</FlexBodyRowFlex>
	))

	

	return (
		<>
			<FilterTabList>	
				<FilterTab>
					<FilterTabLink className={selected === 'details' ? 'active' : ''} onClick={() => setSelected('details')}>Details</FilterTabLink>
					<FilterTabLink className={selected === 'current-bids' ? 'active' : ''} onClick={() => setSelected('current-bids')}>Current Bids</FilterTabLink>
					<FilterTabLink className={selected === 'activity' ? 'active' : ''} onClick={() => setSelected('activity')}>Activity</FilterTabLink>
				</FilterTab>
			</FilterTabList>
			<FilterTabWrapper>
				<FilterTabContent>
					{selected === 'details' 
					? <DetailsTab>
						<div className='tr'>
							<p className='label'>Description</p>
							<p className='desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
						</div>
						<div className='tr'>
							<p className='label'>Current Bid</p>
							<p className='desc'>: USD Infinity (15.8986 VLX)</p>
						</div>
						<div className='tr'>
							<p className='label'>Type</p>
							<p className='desc'>: Auction</p>
						</div>
						<div className='tr'>
							<p className='label'>Quantity</p>
							<p className='desc'>: 1</p>
						</div>
					</DetailsTab>
					: null}
					{selected === 'current-bids' 
					? <>{listName}</>
					: null}
					{selected === 'activity' 
					? <>{listName}</>
					: null}
				</FilterTabContent>
			</FilterTabWrapper>
		</>
	)
}

export default CardFilter