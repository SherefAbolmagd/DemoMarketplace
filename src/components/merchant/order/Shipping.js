import Api from '../../../api/Merchant';
import { Row, Col, Modal, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Shipping({isShow, setIsShow, order_id, setOrder = ()=>{}}) {
    const [tracking, setTracking] = useState({ tracking_id:"", tracking_uri:"" });
    
    const trackingChangeHandler = (event)=>{
        let nam = event.target.name;
        let val = event.target.value;
        const s = { ...tracking };
        s[nam] = val;
        setTracking(s)
    }

    const onTrackingSubmit = async () => {
        try{
            const { order } = await Api.updateOrderDelivery({ order_id, ...tracking });
            setIsShow(false);
            setOrder(order);
        }catch(ex){
            toast.warning(ex.message);
        }
    }

    return <Modal show={isShow} onHide={() => setIsShow(false)} aria-labelledby="contained-modal-title-vcenter"
        centered>        
          <Modal.Header closeButton onClick={() => setIsShow(false)}>
              <Modal.Title>Arrange Shipment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="mb-3">
                  <label htmlFor="tracking_id" className="form-label">Tracking Number</label>
                  <input className="form-control" name="tracking_id" required
                      value={tracking.tracking_id} onChange={trackingChangeHandler} />
              </div>
              <div className="mb-3">
                  <label htmlFor="tracking_uri" className="form-label">Tracking URL</label>
                  <input className="form-control" name="tracking_uri" required
                      value={tracking.tracking_uri} onChange={trackingChangeHandler} />
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsShow(false)}>Close</Button>
              <Button variant="primary" classsName="btn btn-primary btn-sm me-md-2"
                 onClick={onTrackingSubmit} >Submit</Button>
          </Modal.Footer>
      </Modal>
}