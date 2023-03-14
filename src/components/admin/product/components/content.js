import { useContext, useState } from 'react';
import { Card, Form, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import Editor from "rich-markdown-editor";
import Swal from 'sweetalert2';
import ProductContext from '../context';

import { BiUpArrow, BiDownArrow, BiTrash } from 'react-icons/bi';

export default function ContentManagement() {
    const [product, setProduct] = useContext(ProductContext);
    const [locale, setLocale] = useState("en");

    // content update
    const addContent = ()=>{
        const lan = product.contents[locale];
        lan.push({label:"", text:""});
        contents[locale] = lan;
        setProduct({...product, contents });
    }

    const removeContent = async (index)=>{
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
            let lan = product.contents[locale];
            lan.splice(index, 1);
            contents[locale] = lan;
            setProduct({...product, contents});
        }
    }

    const reorderContent = async (index, up = true)=>{
        if(up){
            const temp = product.contents[locale][index - 1];
            product.contents[locale][index - 1] = product.contents[locale][index];
            product.contents[locale][index] = temp; 
        }else{
            const temp = product.contents[locale][index + 1];
            product.contents[locale][index + 1] = product.contents[locale][index];
            product.contents[locale][index] = temp; 
        }

        setProduct({...product});
    }

    const setLabelField = (ev, index)=>{
        const value = ev.target.value;
        product.contents[locale][index].label = value;
        
        setProduct({...product});
    }

    const setTextField = (val, index)=>{
        const value = val();
        product.contents[locale][index].text = value;
        
        setProduct({...product});
    }
    
    const { contents } = product;

    const localizations = ["en", "in", "bm"];

    return <Card>
        <Card.Body>
            <Card.Title>Product Content</Card.Title>
            
            <Tabs className="mb-3" onSelect={setLocale} activeKey={locale}>
                {localizations.map((key)=>
                    <Tab eventKey={key} title={key}>
                        {(contents[key] || []).map(({label, text}, index)=><>
                            <Row>
                                <div className='col'>
                                    <div className='row' >
                                        <div className='col col-6'>
                                            <Form.Control placeholder="Label" onChange={(ev)=>setLabelField(ev, index)} value={label}/>
                                        </div>
                                        <div className='col col-2'/>
                                        <div className='col'>
                                            <div className='row'>
                                                {(index != 0 && index != product.contents[locale].length == 1) && <div className='col col-4'>
                                                    <button className='btn btn-outline-primary' onClick={()=>reorderContent(index)}><BiUpArrow size={16}/></button>
                                                </div>}

                                                {(index != 0 && index != product.contents[locale].length - 1) && <div className='col col-4'>
                                                    <button className='btn btn-outline-primary' onClick={()=>reorderContent(index, false)}><BiDownArrow size={16}/></button>
                                                </div>}

                                                { index != 0 && 
                                                <div className='col'>
                                                    <button className="btn btn-danger float-end"
                                                        onClick={()=>removeContent(index)} style={{float:"right"}}>
                                                            <BiTrash size={16}/>
                                                    </button>
                                                </div> }
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="p-2 ps-4 border" style={{minHeight:140}}>
                                        <Editor
                                            placeholder="Describe your product.."
                                            defaultValue={text}
                                            onChange={(val)=>setTextField(val, index)}
                                        />
                                    </div>
                                </div>
                            </Row>
                            <br/>
                        </>)}
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={addContent} style={{float:"right"}}>Add</Button>
                            </Col>
                        </Row>
                    </Tab>
                )}
            </Tabs>
            

        </Card.Body>
    </Card>
}