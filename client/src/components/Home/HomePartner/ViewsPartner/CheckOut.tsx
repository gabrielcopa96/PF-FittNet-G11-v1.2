import React from 'react';
import { useEffect } from 'react';

export default function CheckOut({
    data
}: any){
    useEffect(() => {
        // @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
        const script = document.createElement('script')
        // @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
        const attr_data_preference = document.createAttribute('data-preference-id')
        attr_data_preference.value = data.id

        script.src='https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
        script.setAttributeNode(attr_data_preference)

        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(data)

        // @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
        document.getElementById('form1').appendChild(script)
        return () =>{
            // @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
            document.getElementById('form1').removeChild(script)
        }
    }, [data])

    

    return (
        <div>
            <form id='form1'>
            </form>
        </div>
    )
}