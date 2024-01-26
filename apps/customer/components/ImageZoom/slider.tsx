import Slider from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'

const Container = styled.div`
  min-width: 82rem;
  flex-grow: 1;
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    min-width: 12rem;
  }
`
const ZoomSlider = ({ value, onSetValue }) => {
  return (
    <Container>
      <Slider
        handleStyle={{
          backgroundColor: '#2A7575',
          opacity: '1',
          width: '24px',
          height: '24px',
          border: 'none',
          margin: '0 0 2px 0',
          cursor: 'pointer',
        }}
        railStyle={{
          height: '1px',
          backgroundColor: '#D9D9D9',
        }}
        className="slider"
        draggableTrack
        min={0}
        max={4}
        value={value}
        onChange={onSetValue}
      />
    </Container>
  )
}

export default ZoomSlider
