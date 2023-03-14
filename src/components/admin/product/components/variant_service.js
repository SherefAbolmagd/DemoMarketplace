import { useContext, useState } from 'react';
import { Card, Form, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProductContext from '../context';

export default function VariantManagement() {
    const [product, setProduct, errors] = useContext(ProductContext);
    const [tab, setTab] = useState(0);

    // content update
    const addVariant = ()=>{
        const variants = product.variants;
        variants.push({ name:"", shipping:{ width:0, height:0, length:0, weight:0 }});
        setProduct({...product, variants });
        return variants.length - 1;
    }

    const removeVariant = async (index)=>{
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if(isConfirmed){
            let variants = product.variants;
            variants.splice(index, 1);
            setProduct({...product, variants });
            setTab(index - 1);
        }
    }

    const setVariantField = (ev, index)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        product.variants[index][name] = value;
        
        setProduct({...product});
    }

    const onSelectTab = (key)=>{
        if(key== "add")
            setTab(addVariant());
        else
            setTab(key);
    }

    const { variants } = product;

    return <Card>
        <Card.Body as={Form}>
            <Card.Title>Variant</Card.Title>
            
            <Tabs className="mb-3" onSelect={onSelectTab} activeKey={tab} >
                {variants.map(({ name }, index)=>
                    <Tab key={index} eventKey={index} title={`Variant ${index+1}`}>
                        <Row>
                            <Form.Group as={Col}>
                                <Row >
                                    <Col sm={6}>
                                        <Form.Label>Variant Name *</Form.Label>
                                        <Form.Control isInvalid={!!errors[`variants.${index}.name`]} onChange={(ev)=>setVariantField(ev, index)} name="name" value={name}/>
                                        <Form.Control.Feedback type="invalid">{errors[`variants.${index}.name`]}</Form.Control.Feedback>
                                    </Col>
                                    <Col>
                                        <Row>
                                        { index != 0 && <Col><Button variant="danger" style={{float:"right"}} onClick={()=>removeVariant(index)}>Delete Variant</Button></Col> }
                                        </Row>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                    </Tab>
                )}
                <Tab eventKey="add" title="Add Variant"/>
            </Tabs>
        </Card.Body>
    </Card>
}