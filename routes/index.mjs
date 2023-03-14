import express from 'express';

import MarketTransactionController from '../controllers/Market/Transaction.mjs';
import OzoPayController from '../controllers/Payment/OzoPay.mjs';

import Passport from '../configs/passport.mjs';

const router = express.Router();

router.get('/invoice/:uuid', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, MarketTransactionController.getInvoice);
router.get('/receipt/:uuid', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, MarketTransactionController.getReceipt);

// for debugging payment gateway
router.post(`/marketplace/payment/ozopay`, OzoPayController.redirect);


export default router;
