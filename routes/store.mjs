import express from 'express';

import StoreController from '../controllers/Store/index.mjs';
import MerchantController from '../controllers/Store/Merchant.mjs';
import StoreAddressController from '../controllers/Store/Address.mjs';
import ProductController from '../controllers/Store/Product/index.mjs';
import InventoryController from '../controllers/Store/Product/Inventory.mjs';
import OrderController from '../controllers/Store/Order.mjs';
import VoucherController from '../controllers/Store/Voucher.mjs';
import ReportController from '../controllers/Store/Report.mjs';
import WebhookController from '../controllers/Store/Developer/Webhook.mjs';
import StoreFileController from '../controllers/Store/File.mjs';
import CouponController from '../controllers/Store/Coupon.mjs';

import Passport from '../configs/passport.mjs';

const router = express.Router();

/** Merchant Store Routes */
router.get('', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.getStore);

router.get('/list', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.getStoreList);
router.post('/add', Passport.bearerAuthenticate(), Passport.restrict, StoreController.addStore);

router.post('/register', Passport.bearerAuthenticate(), Passport.restrict, StoreController.registerStore);
router.post('/uploadFile', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.uploadFile);
router.post('/updateFile', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.updateFile);
router.post('/removeFile', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.removeFile);
router.post('/updateAddress', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.updateAddress);
router.post('/update', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.updateStore);

router.post('/delivery/parcel', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.updateDeliveryProvider);
router.post('/delivery/express', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.updateExpressDeliveryProvider);
router.post('/delivery/setting', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreController.updateDeliverySetting);

router.get('/address', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreAddressController.listAddresses);
router.post('/address', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreAddressController.createAddress);
router.get('/address/:id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreAddressController.getAddress);

router.get('/merchant', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, MerchantController.listMerchants);
router.post('/merchant/invite', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, MerchantController.inviteMerchant);
router.get('/merchant/:id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, MerchantController.getMerchant);

router.get('/product/inventory', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, InventoryController.listInventories);
router.get('/product/inventory/:inventory_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, InventoryController.getInventory);
router.post('/product/inventory', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, InventoryController.addInventory);
router.post('/product/inventory/status', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, InventoryController.updateInventoryStatus);
router.post('/product/inventory/:inventory_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, InventoryController.updateInventory);
router.delete('/product/inventory', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, InventoryController.deleteInventory);

router.get('/product/master', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.searchMaster);

/** DEPRECATED: Merchant cannot Manage their own product */
// router.post('/product', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.createProduct);
// router.post('/product/addImage', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.addProductImage);
// router.post('/product/removeImage', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.removeProductImage);
// router.post('/product/update', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.updateProduct);
// router.post('/product/delete', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.deleteProduct);
// router.post('/product/publish', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.publishProduct);
// router.post('/product/draft', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.draftProduct);
// router.get('/product/export', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.exportProductTemplate);
// router.post('/product/import', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.importProduct);
// router.get('/product/:product_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ProductController.getProduct);
/** END DEPREACTED */

router.get('/order/shipping/download',Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.downloadPacking);
router.post('/order/shipping/upload',Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.uploadPacking);
router.get('/order/status/:order_status', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.listOrders);
router.get('/order/:order_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.getOrder);
router.post('/order/delivery/:order_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.updateDelivery);
router.post('/order/:order_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.updateStatus);
router.get('/order/settlement/:settlement_status', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.listOrders);
router.get('/order/waybill/:order_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, OrderController.getWaybill);

router.get('/report', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ReportController.generateReport);
router.get('/report/order', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ReportController.countOrder);
router.get('/report/download',Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ReportController.downloadReport);
router.get('/report/income',Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, ReportController.generateIncomeReport);

router.get('/developer/webhook', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, WebhookController.listWebhooks);
router.get('/developer/webhook/:webhook_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, WebhookController.getWebhook);
router.post('/developer/webhook', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, WebhookController.createWebhook);
router.post('/developer/webhook/:webhook_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, WebhookController.updateWebhooks);
router.delete('/developer/webhook/:webhook_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, WebhookController.deleteWebhook);

router.get('/voucher', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, VoucherController.listVouchers);
router.post('/voucher/redeem/:code', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, VoucherController.getVoucher);
router.post('/voucher/:code', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, VoucherController.redeemVoucher);

router.get('/coupon', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, CouponController.listCoupons);
router.post('/coupon', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, CouponController.createCoupon);
router.delete('/coupon', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, CouponController.deleteCoupon);
router.post('/coupon/update', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, CouponController.updateCoupon);
router.get('/coupon/:coupon_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, CouponController.getCoupon);

router.get('/file/data/:file_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreFileController.getFileData);
router.get('/file/:file_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.merchantAuthenticate, StoreFileController.getFile);

export default router;
