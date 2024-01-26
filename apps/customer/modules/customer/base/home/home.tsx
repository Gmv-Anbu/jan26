import React from 'react'
import HomeVideoBanner from '../../section/homeVideoBanner'
import ValueProposition from '../../section/valueProposition'
import SalientFeature from '../../section/salientFeature'
import HomeCollection from '../../section/homeCollection'
import HomeVisitMusuem from '../../section/homeVisitMusuem'
import Membership from '../../section/membership'
import SupporterList from '../../section/supporterList'
import HomeMedia from '../../section/homeMedia'
import NewsLetter from '../../../../components/newletterSection/newsLetter'

const Home = () => {
  return (
    <>
      <HomeVideoBanner/>
      <ValueProposition/>
      <SalientFeature/>
      <HomeCollection/>
      <Membership/>
      <HomeVisitMusuem/>
      <SupporterList/>
      <HomeMedia/> 
      <NewsLetter/>
   </>
  )
}

export default Home