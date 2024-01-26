import DetailsPage from '@apps/customer/components/product-details'
import { useRouter } from 'next/router'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'

const BuyDetails = () => {
  const router = useRouter()
  const { itemId } = router.query

  return (
    <>
      <DetailsPage itemID={itemId} isPath={'/buy'} backBtnName={'Our Collections'} relatedProductsHeading={'Other Related Products'} />
    </>
  )
}

export default BuyDetails
