import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';

import ProductForm from '../../../components/admin/product';

import Api from '../../../api/Merchant';
import { toast } from 'react-toastify';

import { navigate } from '../../../components/basepath';

export default function UpdateProduct({ product_id }){
    const [default_product,setProduct] = useState(null);
    const [not_found, setNotFound] = useState(false);
    
    useEffect(()=>{
        getProduct();
    },[])

    const getProduct = async ()=>{
        try{
            const { product } = await Api.getProduct(product_id);
            const { id, 
                details:{ 
                    name, brand, short_name, tags, 
                    product_type, product_category, 
                    contents, poison, service, l_cat
                }, 
                variants } = product;

            const default_variants = variants.map(({id, details:{name, sku, shipping}})=>({ variant_id:id, name, sku, shipping }));

            setProduct({ 
                product_id:id, name, brand, short_name, 
                tags, product_type, product_category, 
                contents:contents||{}, poison:poison||{}, service:service||{}, l_cat:l_cat||{},
                variants:default_variants })
        }catch(ex){
            toast.warning(ex.message)
            if (ex.status == 404) {
                setNotFound(true)
            }
        }
    }

    const onSubmit = async (product)=>{
        try{
            const res = await Api.updateProduct(product)
            
            toast.success("Product Successfully Updated", {
                autoClose: 1000,
                onClose: navigate.push(`/admin/product/${res.product.id}`)
            });
        }catch(ex){
            toast.warning(ex.message)
        }
    }

    if (not_found)
        return <Error statusCode="404" title="The product did not exist" />

    return <Container>
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>Update Item</Navbar.Brand>
            </Container>
        </Navbar>
        {default_product && 
            <ProductForm onSubmit={onSubmit} default_product={default_product} />
        }
    </Container>;
}

export async function getServerSideProps(context) {
    const { product_id } = context.params;

    return {
        props: { product_id }, // will be passed to the page component as props
    }
}