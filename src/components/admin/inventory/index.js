import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import InventoryContext, { InventoryModel } from './context';

import Toggle from 'react-toggle'

import Validator from 'validatorjs';
import Swal from 'sweetalert2';

export default function ProductForm({ default_inventory, onSubmit }){
    const [inventory, setInventory] = useState(default_inventory || InventoryModel);
    const [errors, setErrors] = useState({});

    const submit = (ev) => {
        ev.preventDefault();

        const validation = new Validator(inventory,
        {            
            'price':"required|numeric",
            'display_price':"required|numeric",

            'has_stock' : "boolean",
            'stock' : "required_if:has_stock,true|integer",
            
            'has_minimum_order_quantity' : "boolean",
            'minimum_order_quantity' : "required_if:has_minimum_order_quantity,true|numeric",
            
            'has_bulk_pricing' : "boolean",
            'bulk_pricing' : "required_if:has_bulk_pricing,true|array",
            'bulk_pricing.*.minimum_quantity' : "integer",
            'bulk_pricing.*.price' : "numeric",
        });

        if(validation.fails()){
            console.log(validation.errors.errors);
            setErrors(validation.errors.errors);
        } else
            onSubmit(inventory);
    }

    const setInventoryField = (ev)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        inventory[name] = value;
        
        setInventory({...inventory});
    }

    const setInventoryToggle = (ev)=>{
        const value = ev.target.checked;
        const name = ev.target.name;
        inventory[name] = value;
        
        setInventory({...inventory});
    }

    const setBulkPricingField = (ev, index)=>{
        const value = ev.target.value;
        const name = ev.target.name;
        inventory.bulk_pricing[index][name] = value;
        
        setInventory({...inventory});
    }

    const addBulkPricing = ()=>{
        inventory.bulk_pricing.push({ minimum_quantity:0, price:0 });
        setInventory({...inventory});
    }

    const removeBulkPricing = async (index)=>{
        let { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if(isConfirmed){
            inventory.bulk_pricing.splice(index, 1);
            setInventory({...inventory});
        }   
    }

    const { product_id, product_name, variant_name,
        product_type, 
        price, display_price, 
        voucher_value,
        has_stock, stock, 
        has_minimum_order_quantity, minimum_order_quantity, 
        has_bulk_pricing, bulk_pricing } = inventory;

    return <InventoryContext.Provider value={[inventory, setInventory, errors]}>
        <Card>
            <Card.Body>
                <Card.Title>Product Details</Card.Title>

                <Row>
                    {product_id && 
                        <Form.Group as={Col}>
                            <Form.Label>Item No.</Form.Label>
                            <Form.Control readOnly value={product_id} />
                        </Form.Group>
                    }
                    <Form.Group as={Col}>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control readOnly value={product_name} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Variant Name</Form.Label>
                        <Form.Control readOnly value={variant_name} />
                    </Form.Group>                
                </Row>
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <Card.Body>
                <Card.Title>Pricing</Card.Title>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Price *</Form.Label>
                        <Form.Control isInvalid={!!errors["price"]} onChange={setInventoryField} name="price" value={price} type="number" />
                        <Form.Control.Feedback type="invalid">{errors["price"]}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Display Price *</Form.Label>
                        <Form.Control isInvalid={!!errors["display_price"]} onChange={setInventoryField} name="display_price" value={display_price} type="number" />
                        <Form.Control.Feedback type="invalid">{errors["display_price"]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <Card.Body>
                <Card.Title>Stock Management</Card.Title>

                <Row>
                    <Form.Group as={Col} sm={6}>
                        <Row>
                            <Col sm={2}>
                                <Toggle onChange={setInventoryToggle} name="has_stock" value={has_stock} />
                            </Col>
                            <Col>
                                <p>Use Stock</p>
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} sm={6}>
                        <Form.Label>Stock Quantity</Form.Label>
                        <Form.Control isInvalid={!!errors["stock"]} onChange={setInventoryField} name="stock" value={stock} />
                        <Form.Control.Feedback type="invalid">{errors["stock"]}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
        <br/>
        { product_type == 3 && <>
            <Card>
                <Card.Body>
                    <Card.Title>Voucher</Card.Title>
                    <Row>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Voucher Value</Form.Label>
                            <Form.Control isInvalid={!!errors["voucher_value"]} onChange={setInventoryField} name="voucher_value" value={voucher_value} />
                            <Form.Control.Feedback type="invalid">{errors["voucher_value"]}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Card.Body>
            </Card>
            <br/>
        </>}
        <Card as={Form}>
            <Card.Body>
                <Card.Title>Wholesale</Card.Title>

                <Row>
                    <Form.Group as={Col} sm={6}>
                        <Row>
                            <Col sm={2}>
                                <Toggle onChange={setInventoryToggle} name="has_minimum_order_quantity" value={has_minimum_order_quantity} />
                            </Col>
                            <Col>
                                <p>Minimum Order Quantity</p>
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>
                {has_minimum_order_quantity && 
                    <Row>
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>Amount *</Form.Label>
                            <Form.Control isInvalid={!!errors["minimum_order_quantity"]} onChange={setInventoryField} name="minimum_order_quantity" value={minimum_order_quantity} />
                            <Form.Control.Feedback type="invalid">{errors["minimum_order_quantity"]}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                }
                <br/>
                {/* Bulk Pricing */}
                <Row>
                    <Form.Group as={Col} sm={6}>
                        <Row>
                            <Col sm={2}>
                                <Toggle onChange={setInventoryToggle} name="has_bulk_pricing" value={has_bulk_pricing} />
                            </Col>
                            <Col>
                                <p>Bulk Pricing</p>
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>
                {has_bulk_pricing && <>
                    {bulk_pricing.map(({ minimum_quantity, price }, index)=><Row>
                        <Form.Group as={Col} sm={5}>
                            <Form.Label>Minimum Quantity *</Form.Label>
                            <Form.Control onChange={(ev)=>setBulkPricingField(ev, index)}  name="minimum_quantity" value={minimum_quantity} />
                        </Form.Group>
                        <Form.Group as={Col} sm={5}>
                            <Form.Label>Price *</Form.Label>
                            <Form.Control onChange={(ev)=>setBulkPricingField(ev, index)} name="price" value={price} />
                        </Form.Group>
                        {index > 0 &&
                            <Col sm={2}>
                                <br/>
                                <br/>
                                <Button variant="danger" style={{float:"right"}} onClick={()=>removeBulkPricing(index)}>Remove</Button>
                            </Col>
                        }
                    </Row>)}
                    <br/>
                    <Row>
                        <Col>
                            <Button style={{float:"right"}} onClick={addBulkPricing}>Add Tier</Button>
                        </Col>
                    </Row>
                </>}
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <Card.Body as={Form}>
                <Row>
                    <Col><Button style={{float:"right"}} variant="primary" onClick={submit}>Submit</Button></Col>
                </Row>
            </Card.Body>
        </Card>
        <br/>
    </InventoryContext.Provider>;
}