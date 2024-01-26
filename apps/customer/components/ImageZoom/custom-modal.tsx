import ReactDOM from 'react-dom'
import styled from 'styled-components'

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9998;
  background-color: #fff;
  ::-webkit-scrollbar {
    width: 5px;
  }
`

const ModalBox = styled.div`
  display: block;
  max-height: 100vh;
  height: fit-content;
  position: fixed;
  top: 0%;
  width: 100%;
  z-index: 999999;
  overflow: hidden;
  animation: slide-down 300ms ease-out forwards;
  /* padding: 0.5rem 0; */
  /* @media (max-width: 1340px) {
    width: 120rem;
    left: calc(50% - 60rem);
  }
  @media (max-width: 768px) {
    width: 80rem;
    left: calc(50% - 40rem);
  }
  @media (max-width: 552px) {
    width: 40rem;
    left: calc(50% - 20rem);
  } */
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Backdrops = (props) => {
  return <BackDrop onClick={props.closePopUp} />
}

const ModalOverlay = (props) => {
  return <ModalBox>{props.children}</ModalBox>
}

const Modal = (props) => {
  if (typeof window !== 'undefined') {
    // your code with access to window or document object here
    return (
      <>
        {ReactDOM.createPortal(<Backdrops closePopUp={props.closePopUp} />, document.getElementById('overlay'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlay'))}
      </>
    )
  }

  return
  ;<></>
}
export default Modal
