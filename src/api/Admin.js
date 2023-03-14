import { GET, POST, POSTFORM, DELETE } from './Fetch';

import API from './index';

class AdminApi extends API{
    constructor() {
        super();

        this.prefix = "admin"
        //this.checkAuth();
    }

    // File
    getFile(file_id) {
        return GET(`${this.url}/api/admin/file/${file_id}`,
        {},
        { "Authorization": `Bearer ${this.token}` })
    }

    getFileData(file_id) {
        return GET(`${this.url}/api/admin/file/data/${file_id}`,
        {},
        { "Authorization": `Bearer ${this.token}` })
    }

    // Admin Store Management
    getStoreList({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/store`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getStoreListByType(store_type, { _page, _pagesize }) {
        return GET(`${this.url}/api/admin/store`,
            { _page, _pagesize, store_type },
            { "Authorization": `Bearer ${this.token}` });
    }

    getDeletedStoreList({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/store/deleted`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getPendingStoreList({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/store/pending`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteStore(store_id, undelete) {
        return POST(`${this.url}/api/admin/store/delete`,
            { store_id, undelete },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateStoreType(store_id, store_type) {
        return POST(`${this.url}/api/admin/store/update_store_type`,
            { store_id, store_type },
            { "Authorization": `Bearer ${this.token}` });
    }

    getStoreAdmin(store_id) {
        return GET(`${this.url}/api/admin/store/${store_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    getStoreMerchantsAdmin(store_id) {
        return GET(`${this.url}/api/admin/store/${store_id}/merchant`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    approveStore(store_id) {
        return POST(`${this.url}/api/admin/store/approve`,
            { store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    disapproveStore(store_id) {
        return POST(`${this.url}/api/admin/store/disapprove`,
            { store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    getStoreProductsAdmin(store_id) {
        return GET(`${this.url}/api/admin/store/${store_id}/product`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    // ADmin Webhook
    getAdminWebhookList({ _page, _pagesize}) {
        return GET(`${this.url}/api/admin/developer/webhook`, { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getAdminWebhook(webhook_id) {
        return GET(`${this.url}/api/admin/developer/webhook/${webhook_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    createAdminWebhook({ webhook_event, webhook_uri }) {
        return POST(`${this.url}/api/admin/developer/webhook`, { webhook_event, webhook_uri },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateAdminWebhook({ webhook_id, webhook_uri }) {
        return POST(`${this.url}/api/admin/developer/webhook/${webhook_id}`, { webhook_uri },
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteAdminWebhook(webhook_id) {
        return DELETE(`${this.url}/api/admin/developer/webhook/${webhook_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    listUsers({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/user`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    addUser({ full_name, username, email, phone, password, password_confirmation }) {
        return POST(`${this.url}/api/admin/user`,
            { full_name, username, email, phone, password, password_confirmation },
            { "Authorization": `Bearer ${this.token}` });
    }

    getUser(user_id) {
        return GET(`${this.url}/api/admin/user/${user_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    updateUser(user_id, { full_name, username, email, phone, email_verified_at, phone_verified_at }) {
        return POST(`${this.url}/api/admin/user/update`,
            { user_id, full_name, username, email, phone, email_verified_at, phone_verified_at },
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteUser(user_id) {
        return POST(`${this.url}/api/admin/user/delete`,
            { user_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Customer
    listCustomers({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/customer`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    listPendingCustomers({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/customer/pending`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    listApprovedCustomers({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/customer/approved`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getCustomer(customer_id) {
        return GET(`${this.url}/api/admin/customer/${customer_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    approveCustomerStore(customer_id) {
        return POST(`${this.url}/api/admin/customer/approve`,
            { customer_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    disapproveCustomerStore(customer_id) {
        return POST(`${this.url}/api/admin/customer/disapprove`,
            { customer_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Report Settlement
    getSettlementReport({ start, end }) {
        return GET(`${this.url}/api/admin/report/settlement`, { start, end },
            { "Authorization": `Bearer ${this.token}` });
    }

    getOrderCount() {
        return GET(`${this.url}/api/admin/report/order`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    uploadSettlementReport(formData) {
        return POSTFORM(`${this.url}/api/admin/report/settlement/upload`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    // Report Refund
    getRefundReport({ start, end }) {
        return GET(`${this.url}/api/admin/report/refund`, { start, end },
            { "Authorization": `Bearer ${this.token}` });
    }

    uploadRefundReport(formData) {
        return POSTFORM(`${this.url}/api/admin/report/refund/upload`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    // Orders Management
    listOrderByStatus({ order_status = 0, _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/admin/order/status/${order_status}`, { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getOrder(order_id) {
        return GET(`${this.url}/api/admin/order/${order_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    updateOrderStatus({ order_id, order_status }) {
        return POST(`${this.url}/api/admin/order/${order_id}`, { order_status },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateOrderDelivery({ order_id, tracking_id, tracking_uri }) {
        return POST(`${this.url}/api/admin/order/delivery/${order_id}`, { tracking_id, tracking_uri },
            { "Authorization": `Bearer ${this.token}` });
    }

    uploadPacking(formData) {
        return POSTFORM(`${this.url}/api/admin/order/shipping/upload`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    // Store Product Management
    listProducts(product_status, { _page, _pagesize }, _search = null) {
        return GET(`${this.url}/api/admin/product`,
            { _page, _pagesize, product_status, _search },
            { "Authorization": `Bearer ${this.token}` });
    }

    listPendingProducts(product_status, { _page, _pagesize }, _search = null) {
        return GET(`${this.url}/api/admin/product/pending`,
            { _page, _pagesize, product_status, _search },
            { "Authorization": `Bearer ${this.token}` });
    }

    listApprovedProducts(product_status, { _page, _pagesize }, _search = null) {
        return GET(`${this.url}/api/admin/product/approved`,
            { _page, _pagesize, product_status, _search },
            { "Authorization": `Bearer ${this.token}` });
    }

    listRejectedProducts(product_status, { _page, _pagesize }, _search = null) {
        return GET(`${this.url}/api/admin/product/rejected`,
            { _page, _pagesize, product_status, _search },
            { "Authorization": `Bearer ${this.token}` });
    }

    createProduct(formData) {
        return POSTFORM(`${this.url}/api/admin/product`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    updateProduct(formData) {
        return POSTFORM(`${this.url}/api/admin/product/update`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteProduct(product_id) {
        return POST(`${this.url}/api/admin/product/delete`,
            { product_ids:[product_id] },
            { "Authorization": `Bearer ${this.token}` });
    }

    bulkDeleteProduct(product_ids) {
        return POST(`${this.url}/api/admin/product/delete`,
            { product_ids },
            { "Authorization": `Bearer ${this.token}` });
    }

    getProduct(product_id) {
        return GET(`${this.url}/api/admin/product/${product_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    publishProduct(product_id) {
        return POST(`${this.url}/api/admin/product/publish`,
            { product_ids:[product_id] },
            { "Authorization": `Bearer ${this.token}` });
    }

    draftProduct(product_id) {
        return POST(`${this.url}/api/admin/product/draft`,
            { product_ids:[product_id] },
            { "Authorization": `Bearer ${this.token}` });
    }

    bulkPublishProduct(product_ids) {
        return POST(`${this.url}/api/admin/product/publish`,
            { product_ids },
            { "Authorization": `Bearer ${this.token}` });
    }

    bulkDraftProduct(product_ids) {
        return POST(`${this.url}/api/admin/product/draft`,
            { product_ids },
            { "Authorization": `Bearer ${this.token}` });
    }

    approveProduct(product_id) {
        return POST(`${this.url}/api/admin/product/approve`,
            { product_ids:[product_id] },
            { "Authorization": `Bearer ${this.token}` });
    }

    rejectProduct(product_id, reason = "") {
        return POST(`${this.url}/api/admin/product/reject`,
            { product_ids:[product_id], reason },
            { "Authorization": `Bearer ${this.token}` });
    }

    bulkApproveProduct(product_ids) {
        return POST(`${this.url}/api/admin/product/approve`,
            { product_ids },
            { "Authorization": `Bearer ${this.token}` });
    }

    bulkRejectProduct(product_ids, reason = "") {
        return POST(`${this.url}/api/admin/product/reject`,
            { product_ids, reason },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Coupon
    listCoupons({ _page, _pagesize }) {
        return GET(`${this.url}/api/admin/coupon`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getCoupon(coupon_id) {
        return GET(`${this.url}/api/admin/coupon/${coupon_id}`,
            { },
            { "Authorization": `Bearer ${this.token}` });
    }

    createCoupon(coupon) {
        return POST(`${this.url}/api/admin/coupon`,
            { ...coupon },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateCoupon(coupon) {
        return POST(`${this.url}/api/admin/coupon/update`,
            { ...coupon },
            { "Authorization": `Bearer ${this.token}` });
    }
    
    deleteCoupon(coupon_id) {
        return DELETE(`${this.url}/api/admin/coupon`,
            { coupon_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    // excel
    importProduct(formData) {
        return POSTFORM(`${this.url}/api/admin/product/import`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    exportProductTemplate() {
        return `${this.url}/api/admin/product/export?access_token=${this.token}`;
    }
}



let Api = new AdminApi();
export default Api;