import Head from 'next/head';
import { useState,useEffect } from 'react';

import { Container, Row, Col, Navbar } from 'react-bootstrap';

import Form from '../../../../components/admin/inventory';
import Api from '../../../../api/Merchant';

import { toast } from 'react-toastify';
import { navigate } from '../../../../components/basepath';

export default function InventoryForm({inventory_id}){
    const [default_inventory,setInventory] = useState(null);
    const [not_found, setNotFound] = useState(false);
    
    useEffect(()=>{
        getInventory();
    },[])

    const getInventory = async ()=>{
        try{
            const { inventory } = await Api.getInventory(inventory_id);
            const { product_name, variant_name, product_type,
                price, display_price, voucher_value,
                has_stock, stock, 
                has_minimum_order_quantity, minimum_order_quantity,
                has_bulk_pricing, bulk_pricing } = inventory;

            setInventory({ inventory_id, product_name, variant_name, product_type,
                price, display_price, voucher_value,
                has_stock, stock, 
                has_minimum_order_quantity, minimum_order_quantity,
                has_bulk_pricing, bulk_pricing });
        }catch(ex){
            toast.warning(ex.message)
            if (ex.status == 404) {
                setNotFound(true)
            }
        }
    }

    const onSubmit = async (inventory)=>{
        try{
            const res = await Api.updateInventory(inventory)
            
            toast.success("Inventory Successfully Updated", {
                autoClose: 1000,
                onClose: navigate.push(`/merchant/product/inventory`)
            });
        }catch(ex){
            toast.warning(ex.message)
        }
    }

    if (not_found)
        return <Error statusCode="404" title="The product did not exist" />

    return <Container>
        <Head>
            <title>Update Inventory | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>Update Inventory</Navbar.Brand>
            </Container>
        </Navbar>

        {default_inventory &&
            <Form {...{onSubmit, default_inventory}} />}
    </Container>;
}

export async function getServerSideProps(context) {
    const { inventory_id } = context.params;

    return {
        props: { inventory_id }, // will be passed to the page component as props
    }
}