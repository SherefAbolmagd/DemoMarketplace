import Head from "next/head";

import React from "react";
import Catalogue from '../../layouts/catalogue';

export default function marketplace({ search, brand, page }) {
    return (
        <>
            <Head>
                <title>Marketplace | DoctorOnCall</title>
                <meta name="description" content="" />
            </Head>

            <Catalogue {...{search, brand, page}} />
        </>
    );
}

export function getServerSideProps(context) {
    const { search, brand, page } = context.query;
    return {
            props: { search:search || null, brand: brand || null, page: page || null }, // will be passed to the page component as props
    }
}