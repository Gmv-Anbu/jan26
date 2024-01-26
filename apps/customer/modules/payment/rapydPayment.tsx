import { useEffect } from 'react'
import styled from 'styled-components'

const RapydConatiner = styled.div`

`

const RapydPayments = () => {

    const initializeRapyd =() => {
        // Instantiating ‘checkout’ with parametersInstantiating 'checkout' & setting variables
        // let checkout = new RapydCheckoutToolkit({
        //     pay_button_text: "Click to pay",
        //         // Text that appears on the 'Pay' button. 
        //         // String. Maximum length is 16 characters.
        //         // Default is "Place Your Order". Optional. 
        //     pay_button_color: "blue",
        //         // Color of the 'Pay' button. String.
        //         // Standard CSS color name or hexadecimal code such as #323fff.
        //         // Default is the color that is returned in the 'merchant_color'
        //         // field of the response to 'Create Checkout Page'. Optional.
        //     id: "checkout_9ebe58dcb9d75e8f972a35350f96c2fa",
        //         // ID of the 'Create Checkout Page' response. String. Required.
        //     close_on_complete: true,
        //         // Causes the embedded Rapyd Checkout Toolkit window to close
        //         // when the payment is complete. Boolean. Default is 'true'. Optional.           
        //     page_type: '“collection”'
        //         // Default is "collection". Optional.
        // });
    }

    useEffect(() => {
        if(window) initializeRapyd()
    },[])

    return (
        <RapydConatiner>
            <h1>Rapyd Checkout Toolkit Demo</h1>
            <div style={{width: '500px'}} id="rapyd-checkout"></div>
        </RapydConatiner>
    )
}

export default RapydPayments