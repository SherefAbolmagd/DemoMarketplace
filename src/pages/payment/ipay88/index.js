import Head from 'next/head'
import config from 'next/config';

export default function Summary({ RefNo, Amount, Currency, Remark, Status, ErrDesc, TransId }) {
    return (<>
        <Head>
            <title>Payment Summary</title>
        </Head>

        <div className="mb-2">
            <div className="card d-flex flex-column justify-content-center align-items-center text-center">
                <div className="card-header d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div style={{ width: 100, marginRight: 20 }}>
                            <img src={`${process.env.NEXT_PUBLIC_BASEPATH||""}/img/fpx.png`} className="img-fluid" />
                        </div>
                    </div>
                    <h5 className="font-weight-bold">Payment Status</h5>
                </div>
                <div className="card-body w-100">
                    <div className="mb-2">
                        <b>Amount</b>
                        <p>{`RM ${(Amount||0).toFixed(2)}`}</p>
                    </div>
                    <div className="mb-2">
                        <b>Seller Order No.</b>
                        <p>{RefNo || ""}</p>
                    </div>
                    <div className="mb-2">
                        <b>FPX Transaction ID</b>
                        <p>{TransId || ""}</p>
                    </div>
                    <div className="mb-5">
                        <b>Transaction Status</b>
                        <p>{{ "1":"Success", "0":"Fail", "6":"Payment Pending" }[Status]}</p>
                    </div>
                    <div className="my-3 row">
                        <div className="col">
                            <button className="btn btn-primary mb-3" onClick={() => window.print()}>Print Summary</button>
                            <a href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/marketplace`} className="btn btn-outline-primary">Return to Merchant</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export async function getServerSideProps(context) {
    const params = context.params;

    return {
        props: params, // will be passed to the page component as props
    }

}