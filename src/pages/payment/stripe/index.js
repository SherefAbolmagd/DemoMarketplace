import Head from 'next/head'

import moment from 'moment';
import config from 'next/config';
import basepath from '../../../components/basepath';

export default function Summary({ charge }) {
    return (<>
        <Head>
            <title>Payment Summary</title>
        </Head>

        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card d-flex flex-column justify-content-center align-items-center text-center my-3" style={{ minWidth: 300 }}>
                <div className="d-flex flex-column justify-content-center align-items-center border-bottom w-100 pb-3">
                    <div className="d-flex justify-content-center align-items-center">
                        <div style={{ width: 100, marginRight: 20 }}>
                            <img src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/fpx.png`} className="img-fluid" />
                        </div>
                    </div>
                    <h3 className="fw-bold">Payment Status</h3>
                </div>
                
                <div className="card-body">
                    <div className="mb-2">
                        <b>Transaction Date</b>
                        <p>{moment((charge?.created | 0) * 1000).format('DD/MM/YYYY hh:mm')}</p>
                    </div>
                    <div className="mb-2">
                        <b>Transaction Amount</b>
                        <p>{`RM ${((charge?.amount || 0) / 100.00).toFixed(2)}`}</p>
                    </div>
                    <div className="mb-2">
                        <b>Order Number</b>
                        <p>{charge?.statement_descriptor || "TEST100001"}</p>
                    </div>
                    <div className="mb-2">
                        <b>FPX Reference ID</b>
                        <p>{charge?.payment_method_details?.fpx?.transaction_id || "TEST100001"}</p>
                    </div>
                    <div className="mb-2">
                        <b>Bank Name</b>
                        <p>{charge?.payment_method_details?.fpx?.bank || "TESTBANK"}</p>
                    </div>
                    <div className="mb-5">
                        <b>Transaction Status</b>
                        <p>{charge?.status || "Cancelled"}</p>
                    </div>
                    <div className="my-3 d-flex flex-column justify-content-center align-items-center">
                        <button className="btn btn-lg btn-primary mb-3" onClick={() => window.print()}>Print Summary</button>
                        <a href={basepath(`/marketplace/order`)} className="btn btn-secondary">Return to Merchant</a>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export async function getServerSideProps(context) {
    const { payment_intent } = context.query;

    try {
        if (!payment_intent)
            return { props: {} };

        const { intent } = await (await fetch(`${process.env.APP_URL}/api/stripe/${payment_intent}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json;charset=UTF-8"
            }
        })).json();

        const charge = intent.charges.data[0];

        return {
            props: { charge }, // will be passed to the page component as props
        }
    } catch (ex) {
        return { props: {} };
    }
}