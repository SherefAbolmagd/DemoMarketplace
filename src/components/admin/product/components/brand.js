import { useContext } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

import ProductContext from '../context';

export default function BrandDetails () {
    const [product, setProduct, errors] = useContext(ProductContext);

    const setProductField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product[name] = value;
        
        setProduct({...product});
    }

    const { product_category, brand } = product;

    return <Card>
            <Card.Body as={Form}>
                <Card.Title>Category/Brand</Card.Title>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Category *</Form.Label>
                        <Form.Control isInvalid={!!errors[`product_category`]} name="product_category" onChange={setProductField} value={product_category} />
                        <Form.Control.Feedback type="invalid">{errors[`product_category`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Brand *</Form.Label>
                        <Form.Control isInvalid={!!errors[`brand`]} name="brand" onChange={setProductField} value={brand} />
                        <Form.Control.Feedback type="invalid">{errors[`brand`]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
}