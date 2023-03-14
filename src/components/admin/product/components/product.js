import { useContext } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

import ProductContext from '../context';

export default function ProductDetails () {
    const [product, setProduct, errors] = useContext(ProductContext);

    const setProductField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product[name] = value;
        
        setProduct({...product});
    }

    const { product_id, product_category, brand, name, short_name, tags } = product;

    return <>
        
        <Card>
            <Card.Body as={Form}>
                <Card.Title>Product Details</Card.Title>

                <Row>
                    {product_id && 
                        <Form.Group as={Col}>
                            <Form.Label>Item No.</Form.Label>
                            <Form.Control readOnly value={product_id} />
                        </Form.Group>
                    }
                    <Form.Group as={Col}>
                        <Form.Label>Item Name *</Form.Label>
                        <Form.Control isInvalid={!!errors["name"]} onChange={setProductField} name="name" value={name} />
                        <Form.Control.Feedback type="invalid">{errors["name"]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Item Abbr.</Form.Label>
                        <Form.Control isInvalid={!!errors["short_name"]} onChange={setProductField} name="short_name" value={short_name}/>
                        <Form.Control.Feedback type="invalid">{errors["short_name"]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control placeholder="Enter Keywords divided by comma ',' : headache, stomach ache, dizziness " onChange={setProductField} name="tags" value={tags}/>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
    </>
}