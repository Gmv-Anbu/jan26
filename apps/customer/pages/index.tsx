import type { NextPage } from 'next'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Home from '../modules/customer/base/home/home'
import Meta from '../modules/shared/components/meta'

const HomePage: NextPage = () => {
  return (
    <>
      <Meta />
      <Home />
    </>
  )
}

export default HomePage
