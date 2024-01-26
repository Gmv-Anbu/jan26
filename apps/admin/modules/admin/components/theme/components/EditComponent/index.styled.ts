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
    textarea {
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
    .pad{
    display: flex;
    gap: 5px;
    }
    .enable-section{
        display: flex;
        justify-content:space-between;
        background: #FAFAFA;
        margin-top: 2rem;
        margin-bottom: -2rem;
        word-break: break-word;
        align-items: baseline;
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
const Counter = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    height: 4rem;
	span {
        cursor:pointer;
       
       
        background: #F5F4F4;
        border-radius: 2px;
    }
		.number{
			margin:100px;
		}
		.minus, .plus{
			width:34px;
            height:25px ;
			background:#f2f2f2;
			border-radius:4px;
			
			border:1px solid #ddd;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
		}
		input{
			height:34px;
      width: 10rem;
      text-align: center;
      font-size: 26px;
	  border:1px solid #ddd;
	  border-radius:4px;
      display: inline-block;
      vertical-align: middle;
}
`

const ImageUploadHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`

export { EditSeperator, ImageUploader, Counter, ImageUploadHeader }