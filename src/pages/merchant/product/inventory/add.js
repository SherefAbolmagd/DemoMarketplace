import Head from 'next/head';
import { useState, useCallback } from "react";

import { Card, Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import {useDropzone} from 'react-dropzone'
import Api from "../../../../api/Merchant";

import basepath, { navigate } from '../../../../components/basepath';

import { toast } from 'react-toastify';

export default function AddInventory () {
    const [matches, setMatches] = useState([])

    const onSubmit = async ()=>{
        try{
            const variant_ids = matches.filter(({selected})=>!!selected).map(({variant_id})=>variant_id);

            await Api.addInventory({ variant_ids });
            
            toast.success("Inventory Successfully Updated", {
                autoClose: 1000,
                onClose: navigate.push(`/merchant/product/inventory`)
            });
        }catch(ex){
            toast.warning(ex.message)
        }
    }

    // search options
    const loadOptions = useCallback(async ( inputValue, callback ) => {
        try{
            const { results } = await Api.searchMaster({ _search:inputValue, _page:1, _pagesize:20 });
            let suggestions = [];
            for(let product of results){
                const{ variants, data:{ name:product_name } } = product;
                for(let variant of variants){
                    const{ id:variant_id, data:{ name:variant_name } } = variant;

                    suggestions.push({ value:JSON.stringify({ search_term: inputValue, variant_id, variant_name, product_name, selected:true  }), label:`${product_name} : ${variant_name}` });
                }
            }

            callback(suggestions);
        }catch(ex){
            toast.warning(ex.message)
        }
    },[]);

    const onSelect = useCallback(({ value:json }) => {
        const match = JSON.parse(json);
        matches.push(match);
        setMatches([...matches])
    },[matches]);

    const onSelected = (index)=>{
        matches[index].selected = !matches[index].selected;
        setMatches([...matches]);
    }

    const onDrop = (acceptedFiles) => {
        // Do something with the files
    }

    //
    const onCheckbox = (index)=>{
        matches[index].checked = !matches[index].checked;
        setMatches([...matches]);
    }

    const onCheckAll = (ev)=>{
        for (let match of matches){
            match.checked = ev.target.checked;
        }
        setMatches([...matches]);
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return <>
        <Head>
            <title>Import Inventory | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <Container fluid>
            <Card>
                <Card.Body>
                    <Card.Title>New Inventory</Card.Title>
                    <br/>
                    <Row>
                        <Col>
                            <input {...getInputProps()} hidden />
                            <Button variant="primary" style={{float:"right"}} >Download Template</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <AsyncSelect placeholder="Search for Product from Master Catalogue..." cacheOptions defaultOptions loadOptions={loadOptions} onChange={onSelect}  />
                        </Col>
                    </Row>
                    <br/>
                    <Table className="w-100" striped hover responsive>
                        <thead>
                            <th>
                                <Form.Group>
                                    <Form.Check type="checkbox" checked={matches.length > 0 && !matches.find(({ checked }) => !checked )} onChange={onCheckAll} />
                                </Form.Group>
                            </th>
                            <th>Search Term</th>
                            <th>Match Product</th>
                            <th>Match Variant</th>
                            <th>Status</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                matches.map(({ search_term, variant_name, product_name, checked, selected }, index)=>
                                <tr>
                                    <td>
                                        <Form.Group>
                                            <Form.Check type="checkbox" onChange={()=>onCheckbox(index)} checked={checked} />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <p>{search_term}</p>
                                    </td>
                                    <td>
                                        <p>{product_name}</p>
                                    </td>
                                    <td>
                                        <p>{variant_name}</p>
                                    </td>
                                    <td>
                                        <p>{ { true:"Will be added to Inventory", false:"Will not be added to Inventory" }[!!selected] }</p>
                                    </td>
                                    <td>
                                        {!selected ? 
                                            <Button variant="success" onClick={()=>onSelected(index)}>Add</Button>
                                            :
                                            <Button variant="danger" onClick={()=>onSelected(index)}>Remove</Button>
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                    {matches.length == 0 && <Row {...getRootProps()} >
                        <Col  style={{minHeight:200, borderStyle:"dotted", borderRadius:"20px" }}>
                            <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center"}}>
                                <div>
                                    <p>Search for Product from Master Catalogue!</p>
                                    <p>Drag and Drop Excel File here!</p>
                                </div>
                            </div>
                        </Col>
                    </Row>}

                    <br/>
                    <Row>
                        <Col>
                            <input {...getInputProps()} hidden />
                            <Button variant="primary" style={{float:"right"}} onClick={onSubmit} >Upload to Inventory</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </>
}