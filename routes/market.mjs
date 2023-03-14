import express from 'express';

import BusinessCatalogue from '../controllers/Market/Business/Catalogue.mjs';

import MarketCartController from '../controllers/Market/Cart.mjs';
import MarketOrderController from '../controllers/Market/Order.mjs';
import MarketTransactionController from '../controllers/Market/Transaction.mjs';
import MarketCouponController from '../controllers/Market/Coupon.mjs';

import CustomerCatalogue from '../controllers/Market/Customer/Catalogue.mjs';

import Passport from '../configs/passport.mjs';

import cors from 'cors';

const router = express.Router();

/** Market Routes */
router.get('/cart/count',  Passport.bearerAuthenticate(),Passport.restrict, MarketCartController.getCartCount);
router.get('/cart',  Passport.bearerAuthenticate(),Passport.restrict, MarketCartController.getCarts);
router.post('/cart',  Passport.bearerAuthenticate(),Passport.restrict, MarketCartController.createCart);
router.delete('/cart/:id',  Passport.bearerAuthenticate(),Passport.restrict, MarketCartController.deleteCart);

router.get('/coupon',  Passport.bearerAuthenticate(),Passport.restrict, MarketCouponController.getCoupon);

router.get('/order/status/:order_status',  Passport.bearerAuthenticate(),Passport.restrict, MarketOrderController.getOrders);
router.get('/order/:order_id',  Passport.bearerAuthenticate(),Passport.restrict, MarketOrderController.getOrder);
router.post('/order/cancel/:order_id',  Passport.bearerAuthenticate(),Passport.restrict, MarketOrderController.cancelOrder);
router.post('/order/receive/:order_id',  Passport.bearerAuthenticate(),Passport.restrict, MarketOrderController.receivedOrder);
router.post('/order/archive/:order_id',  Passport.bearerAuthenticate(),Passport.restrict, MarketOrderController.archivedOrder);

router.get('/transaction',  Passport.bearerAuthenticate(),Passport.restrict, MarketTransactionController.getTransactions);
router.get('/transaction/:uuid',  Passport.bearerAuthenticate(),Passport.restrict, MarketTransactionController.getTransaction);
router.post('/transaction',  Passport.bearerAuthenticate(),Passport.restrict, MarketTransactionController.createTransaction);
router.post('/transaction/address',  Passport.bearerAuthenticate(),Passport.restrict, MarketTransactionController.updateAddress);
router.post('/transaction/checkout',  Passport.bearerAuthenticate(),Passport.restrict, MarketTransactionController.checkout);

/** B2B Routes */
router.get('/business/catalogue',  Passport.bearerAuthenticate(),Passport.restrict, Passport.merchantAuthenticate, BusinessCatalogue.listProducts);
router.get('/business/catalogue/:uuid',  Passport.bearerAuthenticate(),Passport.restrict, Passport.merchantAuthenticate, BusinessCatalogue.getProduct);

router.get('/business/catalogue/store/:uuid',  Passport.bearerAuthenticate(),Passport.restrict, Passport.merchantAuthenticate, BusinessCatalogue.getStore);
router.get('/business/catalogue/store/:uuid/product',  Passport.bearerAuthenticate(),Passport.restrict, Passport.merchantAuthenticate, BusinessCatalogue.listStoreProducts);

/** B2C Routes */
router.get('/customer/catalogue',  CustomerCatalogue.listProducts);
router.get('/customer/catalogue/:uuid',  CustomerCatalogue.getProduct);

export default router;
