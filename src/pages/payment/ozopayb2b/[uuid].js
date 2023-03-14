import { createRef, useEffect } from "react";

export default function Ozopay({ payment_url, address, city, country, currencyText, customerPaymentPageText,
    email, firstname, lastname, OrderDescription, orderDetail, phone, purchaseamount, IsSameAsBilling, 
    shipaddress, shipcity, shipcountry, shipfirstname, shiplastname, shipstate, shipzip, state, zip,
    signature, TransactionOriginatedURL, pattern }){
    const formRef = createRef();

    useEffect(()=>{
        formRef.current.submit();
    },[])

    return(<form ref={formRef} method="post" name="ePayment" action={payment_url}>
            <input name="address" value={address} hidden/>
            <input name="city" value={city} hidden/>
            <input name="country" value={country} hidden/>
            <input name="currencytext" value={currencyText} hidden/>
            <input name="customerPaymentPageText" value={customerPaymentPageText} hidden/>
            <input name="email" value={email} hidden/>
            <input name="firstname" value={firstname} hidden/>
            <input name="lastname" value={lastname} hidden/>
            <input name="OrderDescription" value={OrderDescription} hidden/>
            <input name="orderDetail" value={orderDetail} hidden/>
            <input name="phone" value={phone} hidden/>
            <input name="purchaseamount" value={purchaseamount} hidden/>
            <input name="IsSameAsBilling" value={IsSameAsBilling} hidden/>
            <input name="shipaddress" value={shipaddress} hidden/>
            <input name="shipcity" value={shipcity} hidden/>
            <input name="shipcountry" value={shipcountry} hidden/>
            <input name="shipfirstname" value={shipfirstname} hidden/>
            <input name="shiplastname" value={shiplastname} hidden/>
            <input name="shipstate" value={shipstate} hidden/>
            <input name="shipzip" value={shipzip} hidden/>
            <input name="state" value={state} hidden/>
            <input name="TransactionOriginatedURL" value={TransactionOriginatedURL} hidden/>
            <input name="zip" value={zip} hidden/>
            <input name="signature" value={signature} hidden/>
    </form>)
}

export async function getServerSideProps(context) {
    const {uuid} = context.params;
    try{
        const body = await (await fetch(`${process.env.APP_URL}/api/ozopay/pay/b2b`,{
            method:"POST",
            body:JSON.stringify({ref_id:uuid}),
            headers:{
                'Content-Type':"application/json;charset=UTF-8"
            }
        })).json();
        
        return {
          props: body, // will be passed to the page component as props
        }
    }catch(ex){
        console.log(ex);
    }

    return { props:{} };
}