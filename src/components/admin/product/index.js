import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import ProductContext, { ProductModel } from './context';

import PoisonProduct from "./poison";
import OtherProduct from "./other";
import ServiceProduct from "./service";
import VoucherProduct from "./voucher";

import Validator from 'validatorjs';
import { toast } from 'react-toastify';

export default function ProductForm({ default_product, onSubmit }){
    const [product, setProduct] = useState(default_product || ProductModel);
    const [errors, setErrors] = useState({});

    const changeProductType = (ev) => {
        const value = parseInt(ev.target.value||0);
        setProduct({...product, product_type:value});
    }

    const submit = (ev) => {
        ev.preventDefault();

        const validation = new Validator(product,
        {
            'name': "required|string",
            'short_name': "string",
            'brand': "string",
            'product_type': 'required|integer|in:0,1,2,3,4',
            //'product_category': 'string',
            'tags': 'string',

            'contents.en': 'required|array',
            'contents.in': 'array',
            'contents.bm': 'array',

            'poison':"required_if:product_type,1",
            'poison.category':"required_if:product_type,1|string",
            'poison.manufacturer':"required_if:product_type,1|string",
            'poison.ingredients':"required_if:product_type,1|string",
            'poison.mal_no':"required_if:product_type,1|string",
            
            'service':"required_if:product_type,2",
            'service.category':"required_if:product_type,2|string",
            'service.gender':"required_if:product_type,2|string|in:male,female",
            
            'l_cat':"required_if:product_type,1|required_if:product_type,2",
            'l_cat.l1':"string",
            'l_cat.l2':"string",
            'l_cat.l3':"string",
            'l_cat.l4':"string",

            'variants': "array|required",
            'variants.*.name': "required|string",
            'variants.*.sku': "string",
            'variants.*.shipping.width': "numeric",
            'variants.*.shipping.height': "numeric",
            'variants.*.shipping.length': "numeric",
            'variants.*.shipping.weight': "numeric"
        });

        if(validation.fails()){
            let errors = validation.errors.errors;

            setErrors(errors);

            if(errors){
				var key = Object.keys(errors)[0];
                toast.error(errors[key][0])
			}
        } else
            onSubmit(product);
    }

    const { product_type } = product;

    return <>
        <Card>
            <Card.Body>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Type *</Form.Label>
                        <Form.Control as="select" onChange={changeProductType} value={product_type}>
                            <option value={0}>Poisons</option>
                            <option value={1}>Goods</option>
                            <option value={2}>Services</option>
                            <option value={3}>Vouchers</option>
                            <option value={4}>Packages</option>
                        </Form.Control>
                    </Form.Group>
                    <Col />
                </Row>
            </Card.Body>
        </Card>
        <br/>
        <ProductContext.Provider value={[product, setProduct, errors]}>
            {
                {
                    0:<PoisonProduct/>,
                    1:<OtherProduct/>,
                    2:<ServiceProduct/>,
                    3:<VoucherProduct/>,
                    4:null
                }[product_type]
            }
        </ProductContext.Provider>
        <br/>

        <Card>
            <Card.Body>
                <Row>
                    <Col><Button style={{float:"right"}} variant="primary" onClick={submit}>Submit</Button></Col>
                </Row>
            </Card.Body>
        </Card>
        <br/>
    </>;
}