import Head from 'next/head'

import { loadStripe } from '@stripe/stripe-js/pure';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import config from 'next/config';

export default function Stripe({ intent, public_key, redirect_uri }){
    const [state, setState] = useState({});

    useEffect(()=>{
        pay();
    },[])

    const pay = async () => {
        try{
            loadStripe.setLoadParameters({ advancedFraudSignals: false })
            const stripe = await loadStripe(public_key);
    
            var style = {
                base: {
                    // Add your base input styles here. For example:
                    padding: '10px 12px',
                    color: '#32325d',
                    fontSize: '16px',
                },
            };
    
            var fpxBank = stripe.elements().create(
                'fpxBank',
                {
                    style: style,
                    accountHolderType: 'individual',
                }
            );
                
            setState({ stripe, fpxBank });
            fpxBank.mount('#fpx-bank-element');
        }catch(ex){
            
        }
    }

    const onSubmit = async (event) => {
        const { stripe, fpxBank } = state;
        event.preventDefault();

        var clientSecret = intent.client_secret;
        try {
            await stripe.confirmFpxPayment(clientSecret, {
                payment_method: {
                    fpx: fpxBank,
                },
                // Return URL where the customer should be redirected after the authorization
                return_url: redirect_uri,
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    return(<Container fluid>
        <Head>
            <title>FPX Payment</title>
        </Head>

        <Row>
            <Col/>
            <Col md={6} sm={12}>
                <form onSubmit={onSubmit}>
                    <div style={{ width: 100 }}>
                        <img src={`${process.env.NEXT_PUBLIC_BASEPATH||""}/img/fpx.png`} className="img-fluid" />
                    </div>
                    <div id="fpx-bank-element" />
                    <div className="my-3 text-center">
                        <button className="btn btn-outline-primary" style={{ width: 150 }} disabled={!state.stripe}>Pay</button>
                    </div>
                    <div className="text-center">
                        <p className="text-muted">By clicking on the Pay button, you agree to FPX’s <a className="text-primary" href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp" target="_blank">Terms and Conditions</a>.</p>
                    </div>
                </form>
            </Col>
            <Col/>
        </Row>
    </Container>)
}

export async function getServerSideProps(context) {
	const {uuid} = context.params;
    try{
        const body = await (await fetch(`${process.env.APP_URL}/api/stripe/pay`,{
            method:"POST",
            body:JSON.stringify({ref_id:uuid, redirect_uri:`${process.env.APP_URL}/payment/stripe`}),
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