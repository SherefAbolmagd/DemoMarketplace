import { Container, Row, Col, Navbar } from 'react-bootstrap';

import ProductForm from '../../../components/admin/product';

import Api from '../../../api/Merchant';
import { toast } from 'react-toastify';

import { navigate } from '../../../components/basepath';

export default function NewProduct(){
    const onSubmit = async (product)=>{
        try{
            let form = new FormData();
            product.store_id = Api.store_id;

            form.append("json",JSON.stringify(product));
            const res = await Api.createProduct(form);
            
            toast.success("Product Successfully Added", {
                autoClose: 1000,
                onClose: navigate.push(`/merchant/product/${res.product.id}`)
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