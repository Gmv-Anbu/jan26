import styled from "styled-components"

const EditSeperator = styled.div`
    padding: 2.5rem 2rem;
    border: 1px solid #E0E0E0;
    font-family: Inter;
    h4 {
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.9rem;
    }
    label {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.7rem;
        display: block;
        margin-bottom: 6px;
    }
    input {
        background: #FFFFFF;
        border: 1px solid #BAC6D9;
        border-radius: 4px;
        font-family: Poppins;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 2.1rem;
        padding: 1rem 1.2rem;
        width: 100%;
        color: #3C527D;
    }
    .d-flex-aic {
        display: flex;
        align-items: center;
    }
    .redirect-text {
        display: flex;
        align-items: center;
        span {
            font-family: Inter;
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.7rem;
        }
    }
    .mr-2 {
        margin-right: 4px;
    }
    .ml-auto {
        margin-left: auto;
    }
    .pointer{
        cursor: pointer;
    }
    .sociallink{
        margin:1rem;
    }
`

const ImageUploader = styled.div`
    padding: 3rem 1.5rem 1.8rem;
    background: #F9F9F9;
    border: 1px dashed #BAC6D9;
    border-radius: 4px;
    border-width: 2px;
    text-align: center;
    label {
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;   
        margin-bottom: 5px;     
    }
    span {
        display: block;
        font-family: Inter;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        margin-bottom: 15px;     
    }
    .btn-in {
        background: #FFFFFF;
        border-radius: 6px;
        font-family: Inter;
        padding: 1rem;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        width: 100%;
        border: 1px solid #2D5B9A;
        
        // border-image-source: linear-gradient(90deg, rgba(45, 91, 154, 0.56) 0%, rgba(8, 18, 35, 0.56) 100%);
        color: #23487B;
    }
    .hide{
        visibility: hidden;
    }
`

const StatsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
justify-content:space-between;
background: #FAFAFA;
margin-top: 2rem;
`
const StatsItem = styled.div`
list-style: none;
padding:1rem;
display: flex;
gap:5rem;
span{
    display: flex;
    align-items: baseline;
}

`

export { EditSeperator, ImageUploader, StatsContainer, StatsItem }