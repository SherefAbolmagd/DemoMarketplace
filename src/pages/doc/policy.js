import Head from "next/head";
import React, { useEffect, useState } from "react";

import ReactMarkdown from 'react-markdown'
import basepath from "../../components/basepath";

export default function returnDoc() {
    const [text, setText] = useState("");

    useEffect(async ()=>{
        const res = await fetch(basepath("/text/policy.txt"));
        const text = await res.text();
        setText(text);
    },[])

    return (
        <>
            <Head>
                <title>Privacy Policy | DoctorOnCall</title>
                <meta name="description" content="" />
            </Head>

            <div className="container-md container-fluid mt-5">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </>
    );
}
