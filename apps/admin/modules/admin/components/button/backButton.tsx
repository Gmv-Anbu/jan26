import Image from "next/image";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const Back = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  div {
    display: flex;
  }
`
const SpanB = styled.span`
margin-left: 10px;
`
const Button3 = styled.button`
  width: 20px;
  cursor: pointer;
  background: #e7e7e7;
  border-radius: 4px;
  border: none;
  img {
    height: 10px;
  }
`

const BackButton = (props: any) => {

    const { onClick } = props

    return (
        <Container>
            <Back>
                <div>
                    <Button3 onClick={onClick}>
                        <Image src={`/svgs/back.svg`} width={`8`} height={`10`} />
                    </Button3>
                    <SpanB>Back</SpanB>
                </div>
            </Back>
        </Container>
    )
}

export default BackButton