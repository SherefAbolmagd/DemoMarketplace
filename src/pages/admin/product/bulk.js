import Head from 'next/head';
import { useState, useCallback } from "react";

import { Card, Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Select from 'react-select';
import {useDropzone} from 'react-dropzone'
import Api from "../../../api/Admin";

import basepath, { navigate } from '../../../components/basepath';

import { toast } from 'react-toastify';

import ExcelJS from 'exceljs'

export default function BulkUpload () {
    const [columns, setColumns] = useState([]);
    const [maps, setMaps] = useState([]);
    const [file, setFile] = useState(null);

    const fields = [
        "product.id", "product.data.name", "product.data.short_name",
        
        "product.data.brand",
        "product.data.tags",
        "product.data.product_type",
        
        "product.data.poison.category","product.data.poison.manufacturer",
        "product.data.poison.ingredients","product.data.poison.mal_no",
        
        "product.data.service.category","product.data.service.gender",
        
        "product.data.l_cat.l1","product.data.l_cat.l2",
        "product.data.l_cat.l3","product.data.l_cat.l4",
        
        "variant.id","variant.data.name",
        
        "variant.data.shipping.width","variant.data.shipping.height",
        "variant.data.shipping.length","variant.data.shipping.weight",
    ];

    for(var i = 0; i < 10; i++){
        fields.push(`product.data.contents.en.${i}.title`);
        fields.push(`product.data.contents.in.${i}.title`);
        fields.push(`product.data.contents.bm.${i}.title`);
        fields.push(`product.data.contents.ch.${i}.title`);

        fields.push(`product.data.contents.en.${i}.text`);
        fields.push(`product.data.contents.in.${i}.text`);
        fields.push(`product.data.contents.bm.${i}.text`);
        fields.push(`product.data.contents.ch.${i}.text`);
    }

    const options = fields.map((col)=>({value:col,  label:col}));

    const onSubmit = async ()=>{
        try{
            const mapping = maps.filter(({ignored})=>!ignored).map(({index, field})=>({ field:field.value, index }));
            
            const form = new FormData();
            form.append("images",file)
            form.append("mapping",JSON.stringify(mapping));

            await Api.importProduct(form);
        }catch(ex){
            toast.warn(ex.message);
        }
    }

    const onSelect = (value, i)=>{
        const map = maps.find(({ index })=>index == i);
        if(map){
            map.field = value;
        }else{
            maps.push({ field:value, index:i });
        }

        setMaps([...maps]);
    }

    const onIgnore = (ev, index)=>{
        const checked = ev.target.checked;
        
        let map = maps.find(({index:i})=>i == index);
        if(!map){
            maps.push({ index, ignored:checked });
        }else
            map.ignored = checked;
        
        setMaps([...maps]);
    }

    const toArrayBuffer = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onDrop = async (acceptedFiles) => {
        const columns = [];

        const file = toArrayBuffer(acceptedFiles[0]);
        
        let workbook = new ExcelJS.Workbook();
        // Load file
        await workbook.xlsx.load(file)

        const sheet = workbook.worksheets[1];
        const row = sheet.getRow(1);

        for (let index = 1; index <= row.cellCount; index++) {
            columns.push(row.getCell(index).value);
        }

        setColumns(columns);
        setFile(acceptedFiles[0]);
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return <>
        <Head>
            <title>Import Catalogue | DoctorOnCall</title>
            <meta name="description" content="" />
        </Head>

        <Container fluid>
            <Card>
                <Card.Body>
                    <Card.Title>Bulk Import Mapping</Card.Title>
                    <br/>
                    <Row>
                        <Col>
                            <input {...getInputProps()} hidden />
                            <Button variant="primary" style={{float:"right"}} >Download</Button>
                            {' '}
                            <Button variant="success" style={{float:"right"}} onClick={onSubmit} >Upload</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Table className="w-100" responsive>
                        <thead>
                            <th>Fields</th>
                            <th>Mapped Fields</th>
                            <th>Ignored</th>
                        </thead>
                        <tbody>
                            {columns.map((col, index)=>{
                                const map = maps.find(({index:i})=>i == index); 

                                return <tr key={index}>
                                    <Form.Group as="td">
                                        <Form.Control readOnly value={col}/>
                                    </Form.Group>
                                    <td>
                                        <Select placeholder="Search for Attributes to Map" options={options} value={map?.value} onChange={(value)=>onSelect(value, index)}  />
                                    </td>
                                    <td>
                                        <Form.Group>
                                            <Form.Check type="checkbox" label="Ignore" checked={!!map?.ignored} onChange={(ev)=>onIgnore(ev, index)} />
                                        </Form.Group>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
            <br/>
            <Card>
                <Card.Body>
                    <Row {...getRootProps()} >
                        <Col  style={{minHeight:200, borderStyle:"dotted", borderRadius:"20px" }}>
                            <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center"}}>
                                <div>
                                    <p>Drag and Drop Excel File here!</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </>
}