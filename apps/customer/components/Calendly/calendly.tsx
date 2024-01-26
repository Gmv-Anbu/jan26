import { PopupModal } from 'react-calendly'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  ::-webkit-scrollbar {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    display: none; /* Safari and Chrome */
  }
`

const BookAnAppoinment: any = ({ isOpen, closePopup, pathName }) => {
  return (
    <Wrapper>
      <PopupModal url={`https://calendly.com/${process.env.NEXT_PUBLIC_CALENDLY_USERNAME}${pathName}`} onModalClose={closePopup} open={isOpen} rootElement={typeof window !== 'undefined' ? document.getElementById('overlay') : null} />
    </Wrapper>
  )
}

export default BookAnAppoinment
