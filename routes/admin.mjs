import express from 'express';

import FileController from '../controllers/Admin/File.mjs';

import AdminController from '../controllers/Admin/index.mjs';
import AdminStoreController from '../controllers/Admin/Store/index.mjs';
import AdminMerchantController from '../controllers/Admin/Store/Merchant.mjs';
import AdminUserController from '../controllers/Admin/User.mjs';
import AdminReportController from '../controllers/Admin/Report.mjs';
import AdminWebhookController from '../controllers/Admin/Developer/Webhook.mjs';
import AdminCustomerController from '../controllers/Admin/Customer.mjs';
import AdminOrderController from '../controllers/Admin/Order.mjs';
import AdminCouponController from '../controllers/Admin/Coupon.mjs';

import AdminProductController from '../controllers/Admin/Product/index.mjs';

import Passport from '../configs/passport.mjs';


const router = express.Router();

/** File Routes */
router.get('/file/data/:file_id', Passport.bearerAuthenticate(),Passport.restrict, FileController.getFileData);
router.get('/file/:file_id', Passport.bearerAuthenticate(), Passport.restrict, FileController.getFile);

/** Admin Routes */
router.get('/user', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminUserController.listUsers);
router.post('/user', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminUserController.createUser);
router.get('/customer', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCustomerController.listCustomers);
router.get('/customer/pending', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCustomerController.listPendingCustomers);
router.get('/customer/approved', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCustomerController.listApprovedCustomers);
router.post('/customer/approve', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCustomerController.approveStore);
router.post('/customer/disapprove', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCustomerController.disapproveStore);
router.post('/user/update', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminUserController.updateUser);
router.post('/user/delete', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminUserController.deleteUser);
router.get('/user/deleted', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminUserController.listDeletedUsers);
router.post('/user/assign', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminUserController.assignStore);
router.get('/customer/:id', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCustomerController.getCustomer);
router.get('/user/:id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminUserController.getUser);

router.get('/store', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminStoreController.listStores);
router.post('/store', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.createStore);
router.post('/store/update', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.updateStore);
router.post('/store/update_store_type', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.updateStoreType);
router.post('/store/delete', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.deleteStore);
router.get('/store/deleted', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.listDeletedStores);
router.get('/store/pending', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.listPendingStores);
router.post('/store/approve', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.approveStore);
router.post('/store/disapprove', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.disapproveStore);
router.get('/store/:store_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminStoreController.getStore);

router.get('/store/:store_id/merchant', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminMerchantController.listStoreMerchants);
router.get('/store/:store_id/product', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminProductController.listProducts);
router.get('/store/merchant/:id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminMerchantController.getMerchant);
router.post('/store/:store_id/assign', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminMerchantController.assignMerchant);
router.delete('/store/merchant', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminMerchantController.deleteMerchant);

router.post('/assign', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminController.assignAdmin);

router.get('/developer/webhook', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminWebhookController.listWebhooks);
router.get('/developer/webhook/:webhook_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminWebhookController.getWebhook);
router.post('/developer/webhook', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminWebhookController.createWebhook);
router.post('/developer/webhook/:webhook_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminWebhookController.updateWebhooks);
router.delete('/developer/webhook/:webhook_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminWebhookController.deleteWebhook);

router.get('/report/order', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.countOrder);
router.get('/report/settlement', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.generateSettlementReport);
router.get('/report/settlement/download',Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.downloadSettlementReport);
router.post('/report/settlement/upload',Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.uploadSettlementReport);

router.get('/report/refund', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.generateRefundReport);
router.get('/report/refund/download',Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.downloadRefundReport);
router.post('/report/refund/upload',Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminReportController.uploadRefundReport);

router.get('/order/shipping/download',Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminOrderController.downloadPacking);
router.post('/order/shipping/upload',Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminOrderController.uploadPacking);
router.get('/order/status/:order_status', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminOrderController.listOrders);
router.get('/order/:order_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminOrderController.getOrder);
router.post('/order/delivery/:order_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminOrderController.updateDelivery);
router.post('/order/:order_id', Passport.bearerAuthenticate(),Passport.restrict, Passport.adminAuthenticate, AdminOrderController.updateStatus);


router.get('/product', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.listProducts);
router.get('/product/pending', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.listPendingProducts);
router.get('/product/approved', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.listApprovedProducts);
router.get('/product/rejected', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.listRejectedProducts);

router.post('/product', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.createProduct);
router.post('/product/update', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.updateProduct);

router.post('/product/delete', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.deleteProduct);
router.post('/product/publish', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.publishProduct);
router.post('/product/draft', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.draftProduct);
router.post('/product/approve', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.approveProduct);
router.post('/product/reject', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.rejectProduct);

router.get('/product/export', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.exportProductTemplate);
router.post('/product/import', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.importProduct);
router.get('/product/:product_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminProductController.getProduct);

router.get('/coupon', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCouponController.listCoupons);
router.post('/coupon', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCouponController.createCoupon);
router.delete('/coupon', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCouponController.deleteCoupon);
router.post('/coupon/update', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCouponController.updateCoupon);
router.get('/coupon/:coupon_id', Passport.bearerAuthenticate(), Passport.restrict, Passport.adminAuthenticate, AdminCouponController.getCoupon);

export default router;
