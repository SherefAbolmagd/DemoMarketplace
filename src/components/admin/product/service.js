import { useContext } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import ContentManagement from './components/content';
import PhotoManagement from './components/photo';
import ProductDetails from './components/product';
import VariantManagement from './components/variant_service';

import ProductContext from './context';

export default function ServiceProduct(){
    const [product, setProduct, errors] = useContext(ProductContext);

    const setServiceField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product.service[name] = value;
        
        setProduct({...product});
    }

    const setLCatField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product.l_cat[name] = value;
        
        setProduct({...product});
    }

    const { service:{ category, gender }, l_cat:{ l1, l2, l3, l4 } } = product;

    return <>
        <ProductDetails />
        <br/>
        <Card>
            <Card.Body as={Form}>
                <Card.Title>Category & Gender</Card.Title>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Category *</Form.Label>
                        <Form.Control isInvalid={!!errors[`service.category`]} name="category" onChange={setServiceField} value={category} />
                        <Form.Control.Feedback type="invalid">{errors[`service.category`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Gender *</Form.Label>
                        <Form.Control isInvalid={!!errors[`service.gender`]} as="select" name="gender" onChange={setServiceField} value={gender}>
                            <option value="male">Male</option>
                            <option value="female" >Female</option>
                            <option value="neutral" >Neutral</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors[`service.gender`]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <Card.Body as={Form}>
                <Card.Title>L Category</Card.Title>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>L1</Form.Label>
                        <Form.Control isInvalid={!!errors[`l_cat.l1`]} name="l1" onChange={setLCatField} value={l1} />
                        <Form.Control.Feedback type="invalid">{errors[`l_cat.l1`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>L2</Form.Label>
                        <Form.Control isInvalid={!!errors[`l_cat.l2`]} name="l2" onChange={setLCatField} value={l2} />
                        <Form.Control.Feedback type="invalid">{errors[`l_cat.l2`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>L3</Form.Label>
                        <Form.Control isInvalid={!!errors[`l_cat.l3`]} name="l3" onChange={setLCatField} value={l3} />
                        <Form.Control.Feedback type="invalid">{errors[`l_cat.l3`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>L4</Form.Label>
                        <Form.Control isInvalid={!!errors[`l_cat.l4`]} name="l4" onChange={setLCatField} value={l4}/>
                        <Form.Control.Feedback type="invalid">{errors[`l_cat.l4`]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
        <br/>
        <VariantManagement/>
        <br/>
        <PhotoManagement />
        <br/>
        <ContentManagement />
    </>
}