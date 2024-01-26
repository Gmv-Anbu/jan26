import AuctionDetails from '@apps/customer/components/Auction-details'
import DetailsPage from '@apps/customer/components/product-details'
import AuctionDetailsPage from '@apps/customer/modules/auctions/auctionDetails'
import { useRouter } from 'next/router'

const BuyDetails = () => {
  const router = useRouter()
  const { itemId } = router.query

  return (
    <>
      <AuctionDetailsPage itemID={itemId} isPath={'/auctions'} backBtnName={'Auctions'} headerName={'Auction Detail'} relatedProductsHeading={'Other Live Auctions'} />
    </>
  )
}

export default BuyDetails
