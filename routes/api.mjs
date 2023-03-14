import express from 'express';

import AuthController from '../controllers/Auth.mjs';

import CustomerAddressController from '../controllers/Customer/Address.mjs';
import CustomerProfileController from '../controllers/Customer/Profile.mjs';
import CustomerStoreController from '../controllers/Customer/Store.mjs';

import Ipay88Controller from '../controllers/Payment/IPay88.mjs';
import OzoPayController from '../controllers/Payment/OzoPay.mjs';
import StripeController from '../controllers/Payment/Stripe.mjs';

import EnumController from '../controllers/Enum.mjs';

import Passport from '../configs/passport.mjs';


const router = express.Router();

/** Authentication Routes */
router.post('/auth/login',  AuthController.login);
router.post('/auth/login/:provider', AuthController.socialLogin);
router.post('/auth/register', AuthController.register);
router.post('/auth/refresh', Passport.bearerAuthenticate(), Passport.restrict, AuthController.refresh);
router.post('/auth/forgot', AuthController.forgot);
router.post('/auth/password', Passport.bearerAuthenticate(), Passport.restrict, AuthController.changePassword);
router.post('/auth/password/profile', Passport.bearerAuthenticate(),Passport.restrict, AuthController.changePasswordProfile);
router.post('/auth/verify', Passport.bearerAuthenticate(),Passport.restrict, AuthController.verifyEmail);
router.post('/auth/reverify', Passport.bearerAuthenticate(),Passport.restrict, AuthController.reverifyEmail);
router.post('/auth/inviteverify', AuthController.verifyInvite);

/** Customer Routes */
router.get('/customer/profile', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerProfileController.getProfile);
router.post('/customer/profile', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerProfileController.updateProfile);

router.get('/customer/address', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerAddressController.getCustomerAddress);
router.post('/customer/address/update', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerAddressController.updateAddress);
router.get('/customer/addresses', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerAddressController.listAddresses);
router.post('/customer/address', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerAddressController.createAddress);
//router.get('/customer/address/:id', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerAddressController.getAddress);

router.get('/customer/store', Passport.bearerAuthenticate(), Passport.customerAuthenticate, CustomerStoreController.getStore);
router.post('/customer/store', Passport.bearerAuthenticate(),Passport.restrict, Passport.customerAuthenticate, CustomerStoreController.onboardStore);

/** Ipay88 Routes */
router.post('/ipay88/pay', Ipay88Controller.pay);
router.post('/ipay88/callback', Ipay88Controller.callback);

/** OzoPay Routes */
router.post('/ozopay/pay', OzoPayController.pay);
router.post('/ozopay/pay/b2b', OzoPayController.payb2b);
router.post('/payment/ozopay/callback', OzoPayController.callback);
router.post('/ozopay/callback', OzoPayController.callback);

/** Stripe Routes */
router.post('/stripe/pay', StripeController.pay);
router.post('/stripe/callback', StripeController.callback);
router.get('/stripe/:intent_id', StripeController.getIntent);

/** Enum Routes */
router.get('/enum/banklist', EnumController.bankList);
router.get('/enum/storetype', EnumController.storeType);
router.get('/enum/webhookevent', EnumController.webhookEvent);
router.get('/enum/producttype', EnumController.productType);

export default router;
