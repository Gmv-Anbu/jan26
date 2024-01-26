import { useState } from "react";
import Image from "next/image"
import { ButtonGradientPrimary } from "../../shared/components/button/button";
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../styled-components/FilterModalStyle'
import { SuccessModalWrapper, ModalDialog, ModalContent, ModalBody, Title, SuccessImgWrapper, Info } from "../styled-components/confirmModalStyle"
import { acceptNumbersWithDecimal } from '../../../utils/helper'

const EventReqConfirmDetails = (props: any) => {

    const { show, closeModal, title, onConfirmation, to, setTo } = props;
    const [time,setTime]= useState(null);
    const [errors,setErrors]= useState({
        price:'',
        date:'',
        time:''
    });
    const [form,setForm]=useState({
        price:'',
        date:'',
        time:''
    })

    const submitForm=()=>{
        let localError = { ...errors };
        Object.entries(form).forEach(([key, value]) => {
            if (!value) {
                localError[key] = key + ' is required';
            }
        })
        if (localError!=null && Object.values(localError).length > 0 && Object.values(localError).every((obj)=> obj!=null)) {
            setErrors(localError);
            return
        } else {
            setErrors(null);
        }
    }

  

    const handleFormvalues=(inputField:any,e:any)=>{
        if(errors!=null && Object.entries(errors).length > 0){
            let localError={...errors}
            if(!e.target.value){
                localError[inputField]=inputField + ' is required'
                setErrors(localError)
            }else{
                localError[inputField]=null;
                setErrors(localError)
            }
         
        }
        let localform = { ...form };
        setForm(localform)
        const { name, value } = e?.target;
        if(inputField=='price'){
            const val = acceptNumbersWithDecimal(value)
            setForm({
              ...localform,
              ['price']: val,
            })
        }else {
            setForm({
                ...localform,
                [inputField]: e?.target.value,
              })
        }
        saveEventReqDetails()
    }

    const saveEventReqDetails=()=>{
        
    }

    return (<>
        {show && (<ModalBackground className="pos-tl-0">
            <ModalContainer>
                <ModalContent className="bg-white">
                    <FilterHeader
                        className="bg-white"
                        onClick={() => {
                            closeModal(false)
                        }}
                    >
                        <h3>Approve Details</h3>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                                    fill="#172F53"
                                />
                            </svg>
                        </span>

                    </FilterHeader>
                    <div>
                    <label className="input-label">Price in USD</label>
                    <input className="input-text" type="text" value={form?.price} onChange={(e)=>{handleFormvalues('price',e)}} />
                    <p className="error">{errors?.price}</p>
                    </div>
                 
                    <DropdownDate>
                        <DateL>Date</DateL>
                        <SelectD
                            onChange={(e: any) => {
                               handleFormvalues('date',e)
                            }}
                            type="date"
                            value={form?.date}
                        ></SelectD>
                        <p className="error">{errors?.date}</p>
                    </DropdownDate>
                    <DropdownDate>
                        <DateL>Time</DateL>
                        <SelectD
                            onChange={(e: any) => {
                                handleFormvalues('time',e)
                            }}
                            type="time"
                            value={form?.time}
                        ></SelectD>
                       <p className="error">{errors?.time}</p>
                    </DropdownDate>
                    <ButtonComponent className="marginTop25px">
            <Button1>
              Cancel
            </Button1>
            <Button2 onClick={()=>{
                submitForm();
            }}>
                Approve            
            </Button2>
          </ButtonComponent>
                </ModalContent>
            </ModalContainer>
        </ModalBackground>)}
    </>)

}

export default EventReqConfirmDetails