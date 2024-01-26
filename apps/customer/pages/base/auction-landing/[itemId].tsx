import AuctionDetailsPage from '@apps/customer/components/Auction-details'
import { useRouter } from 'next/router'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'

const Details = () => {
  const router = useRouter()
  const { itemId } = router.query

  return (
    <>
      <AuctionDetailsPage itemID={itemId} isPath={'/auction'} backBtnName={'Auctions'} headerName={'Auction Detail'} relatedProductsHeading={'Other Live Auctions'} />
    </>
  )
}

export default Details
