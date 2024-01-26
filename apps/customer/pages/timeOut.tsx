import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from '../components/Modal'

const TimeOutWrapper = styled.div`
    /* min-height: 80vh; */
    padding: 271px 0 115px;
    @media screen and (max-width: 680px){
      padding: 100px 0 60px;
    }
`
const TimeOut = () => {
  const [isShow, setIsShow] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsShow(true)
  }, [])
  
  return (
    <TimeOutWrapper>
        <Modal isShow={isShow} img="/images/customer/modals/timeout.svg" title="Session timeout" content="You have been logged out because of inactivity." btnText="Login Now" onClose={() => router.replace("/base/signin")}  />
    </TimeOutWrapper> 
  )
}

export default TimeOut