import { objectDeepClone } from '@apps/admin/utils/helper'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonGradientPrimary } from '../../shared/components/button/button'

const AttributesWrapper = styled.div`

`
const AttributesHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    label {
        font-family: Poppins;
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.7rem;
        margin: 0;
        display: block;
    }
`
const AttributesContent = styled.div`

`
const Enum = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr 0.1fr;
    grid-gap: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
`
const EnumInput = styled.input`
    font-family: Poppins;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    padding: 1rem 1.6rem;
    color: #333333;
    background: #fff;
    border: 1px solid #bac6d9;
    border-radius: 6px;
    width: 100%;
`
const Cancel = styled.a`
    cursor: pointer;
`
const ShowInfoMsg = styled.p`
    font-family: Poppins;
    font-size: 1.4rem;
    font-weight: 500;
`


const AssetAttributes = (props) => {

    const { form, setForm } = props

    const emptyObj = {
        trait_type:'',
        value: ''
    }
    const [attributes, setAttributes] = useState([emptyObj])
    const [showInfo, setShowInfo] = useState(null)

    const handleInput = (e, index) => {
        const { name, value } = e?.target
        let arr = objectDeepClone(attributes)
        arr[index][name] = value
        setAttributes(arr)
    }

    const addAttribute = () => {
        if(attributes?.length === 5) {
            setInfo('Maximum limit is 5')
            // cannot add more than 5 elemnsts
        } else {
            let arr = objectDeepClone(attributes)
            arr.push(emptyObj)
            setAttributes(arr)
        }
    }

    const setInfo = (msg) => {
        setShowInfo(msg)
        setTimeout(() => {
            setShowInfo(null)
        }, 3000)
    }

    const removeAttribute = (i) => {
        if(attributes?.length === 1) {
            setInfo('Atleast one is required')
            // cannot delete last eletemet
        } else {
            let arr = attributes.filter((el, j) => i !== j)
            setAttributes(arr)
        }
    }

    useEffect(() => {
        setForm({
            ...form,
            attributes
        })
    },[attributes])

    return (
        <AttributesWrapper>
            <AttributesHeader>
                <label>Attributes</label>
                <ButtonGradientPrimary onClick={() => addAttribute()}>+ Add Attribute</ButtonGradientPrimary>
            </AttributesHeader>
            <AttributesContent>
                {attributes?.length 
                ? attributes.map((el, i) => {
                    return (
                        <Enum>
                            <EnumInput type="text" name={'trait_type'} onChange={(e) => handleInput(e, i)} value={el?.trait_type}  />
                            <EnumInput type="text" name={'value'} onChange={(e) => handleInput(e, i)} value={el?.value} />
                            <Cancel onClick={() => removeAttribute(i)}>X</Cancel>
                        </Enum>
                    )
                })
                : null}
            </AttributesContent>
            {showInfo ? <ShowInfoMsg>{showInfo}</ShowInfoMsg> : null}
        </AttributesWrapper>
    )
}

export default AssetAttributes