import { createRef, useEffect } from "react";

export default function Ipay88({ MerchantCode, RefNo, Amount, Currency, ProdDesc, UserName, UserEmail, UserContact, Remark, Signature, ResponseURL, BackendURL }){
    const formRef = createRef();

    useEffect(()=>{
        formRef.current.submit();
    },[])

    return(<form ref={formRef} method="post" name="ePayment" action="https://payment.ipay88.com.my/ePayment/entry.asp">
        <input type="hidden" name="MerchantCode" value={MerchantCode}/>
        <input type="hidden" name="PaymentId" value=""/>
        <input type="hidden" name="RefNo" value={RefNo}/>
        <input type="hidden" name="Amount" value={Amount}/>
        <input type="hidden" name="Currency" value={Currency}/>
        <input type="hidden" name="ProdDesc" value={ProdDesc}/>
        <input type="hidden" name="UserName" value={UserName}/>
        <input type="hidden" name="UserEmail" value={UserEmail}/>
        <input type="hidden" name="UserContact" value={UserContact}/>
        <input type="hidden" name="Remark" value={Remark}/>
        <input type="hidden" name="Lang" value="ISO-8859-1"/>
        <input type="hidden" name="SignatureType" value="SHA256"/>
        <input type="hidden" name="Signature" value={Signature}/>
        <input type="hidden" name="ResponseURL" value={ResponseURL}/>
        <input type="hidden" name="BackendURL" value={BackendURL}/>
    </form>)
}

export async function getServerSideProps(context) {
	const {uuid} = context.params;

	const body = await (await fetch(`${process.env.APP_URL}/api/ipay88/pay`,{
		method:"POST",
		body:JSON.stringify({ref_id:uuid}),
		headers:{
			'Content-Type':"application/json;charset=UTF-8"
		}
	})).json();
	
    return {
      props: body, // will be passed to the page component as props
    }
}