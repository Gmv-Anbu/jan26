import DetailsPage from '@apps/customer/components/product-details'
import { useRouter } from 'next/router'
import Header from '@apps/customer/modules/customer/layout/header/header.customer'
import Footer from '@apps/customer/modules/customer/layout/footer/footer.customer'

const Details = () => {
  const router = useRouter()
  const { itemId } = router.query

  return (
    <>
      <DetailsPage itemID={itemId} isPath={'/my-nft'} backBtnName={'My NFTs'} headerName={'My NFT Detail'} relatedProductsHeading={'Other Related Products'} />
    </>
  )
}

export default Details

// Details.getLayout = function PageLayout(page) {
//   return (
//     <>
//       <Header isBgWhite={true}/>
//       {page}
//       <Footer fadedBgImg={true}/>
//     </>
//   )
// }
