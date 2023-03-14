import { useContext, useCallback } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import basepath from '../../../basepath';
import {useDropzone} from 'react-dropzone'

import ProductContext from '../context';

import Api from '../../../../api/Admin';

export default function PhotoManagement(){
    const [product, setProduct] = useContext(ProductContext);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onDrop = async (files) => {
        // Do something with the files
        let { images:images_list } = product;
        for(let file of files){
            file.data_url = await toBase64(file);
        }
        images_list = [...images_list, ...files];
        setProduct({...product, images:images_list})
    }

    const onDelete = (index)=>{
        let { images:images_list } = product;

        images_list.splice(index, 1);
        
        setProduct({...product, images:images_list})
    }
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const { images } = product;

    return <Card>
        <Card.Body as={Form}>
            <Card.Title>Upload Product Photos</Card.Title>
                <div style={{display:"flex", flexDirection:"row",overflowX: "auto"}} >
                    <Button {...getRootProps()} variant="outline-dark" style={{marginRight:20}}>
                        <Row style={{ width:200}}>
                            <img src={basepath("/img/camera.png")} alt="..." style={{width:"100%"}} />
                        </Row>
                        <Button style={{width:"100%"}}>Add Photo</Button>
                        <input {...getInputProps()} />
                    </Button>

                    {images.map((image, index)=>
                        <Button variant="outline-dark" style={{marginRight:20}}>
                            <Row style={{ width:200}}>
                                <img src={ image?.data_url || Api.getImage(image)} alt="..." style={{width:"100%"}} />
                            </Row>
                            <Button variant="danger" onClick={()=>onDelete(index)}>Remove</Button>
                        </Button>)}
                </div>
        </Card.Body>
    </Card>
}