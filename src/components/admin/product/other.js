import { useContext } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import ContentManagement from './components/content';
import ProductDetails from './components/product';
import VariantManagement from './components/variant';
import PhotoManagement from './components/photo';
import BrandDetails from './components/brand';

import ProductContext from './context';

export default function OtherProduct(){
    const [product, setProduct] = useContext(ProductContext);

    return <>
        <ProductDetails />
        <br/>
        <BrandDetails />
        <br/>
        <VariantManagement />
        <br/>
        <PhotoManagement />
        <br/>
        <ContentManagement />
    </>
}