import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import ContentManagement from './components/content';
import PhotoManagement from './components/photo';
import ProductDetails from './components/product';
import VariantManagement from './components/variant_service';

export default function VoucherProduct(){
    return <>
        <ProductDetails />
        <br/>
        <VariantManagement />
        <br/>
        <PhotoManagement />
        <br/>
        <ContentManagement />
    </>
}