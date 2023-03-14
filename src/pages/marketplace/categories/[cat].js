import Head from "next/head";

import React from "react";
import Catalogue from '../../../layouts/catalogue';

export default function categories({ cat, search, brand, page }) {
    return (
        <>
            <Head>
                <title>{cat} | DoctorOnCall</title>
                <meta name="description" content="" />
            </Head>

            <Catalogue category={cat} {...{search, brand, page}} />
        </>
    );
}

export function getServerSideProps(context) {
    const { cat } = context.params;
    const { search, brand, page } = context.query;
    return {
        props: { cat, search:search || null, brand: brand || null, page: page || null }, // will be passed to the page component as props
    }
}