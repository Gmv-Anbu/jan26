import styled from 'styled-components'

const CardErrorWrapper = styled.div`
    margin: 17rem 2rem 10rem;
    font-size: 22px;
    font-weight: 600;
`

const CardCollectError = () => {
    return (
        <CardErrorWrapper>Unsuccessfully in card verfication</CardErrorWrapper>
    )
}

export default CardCollectError