import { useContext } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import ContentManagement from './components/content';
import PhotoManagement from './components/photo';
import ProductDetails from './components/product';
import VariantManagement from './components/variant';

import ProductContext from './context';

export default function PoisonProduct(){
    const [product, setProduct, errors] = useContext(ProductContext);

    const setPoisonField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product.poison[name] = value;
        
        setProduct({...product});
    }

    const setLCatField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product.l_cat[name] = value;
        
        setProduct({...product});
    }

    const { poison:{ category, manufacturer, ingredients, mal_no }, l_cat:{ l1, l2, l3, l4 } } = product;

    return <>
        <ProductDetails />
        <br/>
        <Card>
            <Card.Body as={Form}>
                <Card.Title>Poison Ingredients/Dosage/Manufacture</Card.Title>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Category *</Form.Label>
                        <Form.Control isInvalid={!!errors[`poison.category`]} name="category" onChange={setPoisonField} value={category} />
                        <Form.Control.Feedback type="invalid">{errors[`poison.category`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Manufacturer *</Form.Label>
                        <Form.Control isInvalid={!!errors[`poison.manufacturer`]} name="manufacturer" onChange={setPoisonField} value={manufacturer} />
                        <Form.Control.Feedback type="invalid">{errors[`poison.manufacturer`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Ingredients *</Form.Label>
                        <Form.Control isInvalid={!!errors[`poison.ingredients`]} name="ingredients" onChange={setPoisonField} value={ingredients} />
                        <Form.Control.Feedback type="invalid">{errors[`poison.ingredients`]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>MAL No *</Form.Label>
                        <Form.Control isInvalid={!!errors[`poison.mal_no`]} name="mal_no" onChange={setPoisonField} value={mal_no} />
                        <Form.Control.Feedback type="invalid">{errors[`poison.mal_no`]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
        <br/>
        <VariantManagement />
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
        <PhotoManagement />
        <br/>
        <ContentManagement />
    </>
}