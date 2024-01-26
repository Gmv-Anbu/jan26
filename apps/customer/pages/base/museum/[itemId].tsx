import DetailsPage from '@apps/customer/components/product-details'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Details = () => {
  const router = useRouter()
  const { itemId } = router.query
  const [backUrl, setBackUrl] = useState('/museum?tab=$1#collection')

  useEffect(() => {
    if(localStorage?.getItem('museumIndex')) {
      setBackUrl(`/museum?tab=${localStorage?.getItem('museumIndex')}#collection`)
    }
  },[])

  return (
    <>
      <DetailsPage itemID={itemId} isPath={backUrl} backBtnName={'Our Collections'} headerName={''} relatedProductsHeading={''} />
    </>
  )
}

export default Details
