import DetailsPage from '@apps/customer/components/product-details'
import { useRouter } from 'next/router'

const Details = () => {
  const router = useRouter()
  const { itemId } = router.query

  return (
    <>
      <DetailsPage itemID={itemId} isPath={'/collections'} backBtnName={'My Collections'} headerName={''} relatedProductsHeading={''} />
    </>
  )
}

export default Details
