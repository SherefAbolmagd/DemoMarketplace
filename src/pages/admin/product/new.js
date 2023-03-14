import { Container, Row, Col, Navbar } from 'react-bootstrap';

import ProductForm from '../../../components/admin/product';

import Api from '../../../api/Admin';
import { toast } from 'react-toastify';

import { navigate } from '../../../components/basepath';

export default function NewProduct(){
    const onSubmit = async (product)=>{
        try{
            
            let req_images = [...product.images];
            let req = {...product};
            delete req.images;

            let form = new FormData();
    
            form.append("json",JSON.stringify(req));

            for(let image of req_images){
                if(image.data_url){
                    form.append("image_file", image);
                }
            }
            
            const res = await Api.createProduct(form);
            
            toast.success("Product Successfully Added", {
                autoClose: 1000,
                onClose: navigate.push(`/admin/product/${res.product.id}`)
            });
        }catch(ex){
            toast.warning(ex.message)
        }
    }

    return <Container>
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>Add new Item</Navbar.Brand>
            </Container>
        </Navbar>

        <ProductForm onSubmit={onSubmit} />
    </Container>;
}