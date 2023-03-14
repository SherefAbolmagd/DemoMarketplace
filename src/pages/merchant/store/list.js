import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Api from '../../../api/Merchant';
import {Tabs } from 'react-tabs';

import basepath, {navigate} from '../../../components/basepath';

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {  
	const [storesList, setStore] = useState([]);


	useEffect(async () => {
		const { storesList } = await Api.getStoreList();
		setStore(storesList)
	}, []);

	const goToList = (store)=>{
		if(!store.store_approved_at){
			navigate.push(`/merchant/store/done`);
		} else {
			Api.storeStoreId(store.id)
			navigate.push(`/merchant/home`);
		}
	}

	return (
		<>
			<div className="container">
				<div className="row product-cart-inner">
					<h1>Select a Store</h1>
				</div>
				<div className="container">
					<div className="row  product-cart-inner">
						<Tabs style={{display: 'flex', flexWrap:'wrap'}}>                  
						{
							storesList.map((store)=> {
								return(
									<>
										<div className="col-4">
										<Card onClick={() => goToList(store)}style={{ width: '180px', padding:'0',marginBottom:'25px',borderRadius: 10,cursor: 'pointer'}}>
											<Card.Body style={{ padding:'0', borderRadius: 10}}>
												<Card.Img variant="top" style={{height: '100%',borderRadius: 10}} src="https://thumbs.dreamstime.com/b/mobile-ecommerce-shop-vector-symbol-illustration-you-can-use-business-websites-company-others-142737859.jpg"/>
												<Card.ImgOverlay>
												<Card.Title style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{store.store_name}</Card.Title>
												</Card.ImgOverlay>
											</Card.Body>
										</Card>
										</div>
									</>
								)}
							)
						}
						<div className="col-4">
							<Card  style={{ width: '180px', padding:'0',marginBottom:'25px',borderRadius: 10}}>
							<Card.Body style={{ padding:'0',borderRadius: 10}}>
								<Card.Link href={basepath("/merchant/store/add")}>
									<div style={{
										width: '180px',height: '180px', 
										borderWidth:1,
										borderStyle: 'dashed',
										borderColor:'#0071EB',
										borderWidth: 3,
										borderRadius: 10}}> </div>
									<Card.ImgOverlay >
										<Card.Title style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Add a Store</Card.Title>
										<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16" style={{marginLeft:'auto',marginRight:'auto',display:'block'}}>
										<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
										</svg>
									</Card.ImgOverlay>
								</Card.Link>
							</Card.Body>
							</Card>
						</div>
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
}