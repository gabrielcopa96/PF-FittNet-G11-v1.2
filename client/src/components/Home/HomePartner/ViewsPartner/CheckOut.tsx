import { useEffect } from 'react';

export default function CheckOut({
    data
}: any) {
    useEffect(() => {
        const script = document.createElement('script')
        const attr_data_preference = document.createAttribute('data-preference-id')
        attr_data_preference.value = data.id

        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js' as any
        (script.setAttributeNode(attr_data_preference) as any)

            (document.getElementById('form1') as any).appendChild(script)
        return () => {
            (document.getElementById('form1') as any).removeChild(script)
        }
    }, [data])



    return (
        <>
            <form id='form1'>
            </form>
        </>
    )
}