import SyncStorage from './SyncStorage';
import { GET, POST, POSTFORM, DELETE, GETUNTRACKED } from './Fetch';

import API from './index';

class MerchantApi extends API {
    constructor() {
        super();

        this.prefix = "merchant";
        //this.checkAuth();
    }

    async storeStoreId(store_id) {
        var prefix = this.prefix;

        this.store_id = store_id;

        if (this.store_id)
            SyncStorage.setItem(`${prefix}@store_id`, this.store_id);
    }

    // File
    getFile(file_id) {
        return GET(`${this.url}/api/store/file/${file_id}`,
            { "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            })
    }

    getFileData(file_id) {
        return GET(`${this.url}/api/store/file/data/${file_id}`,
            { "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            })
    }

    // Store Management
    isStoreRegistered() {
        var prefix = this.prefix;

        var res = SyncStorage.getItem(`${prefix}@user`);
        var { merchant } = JSON.parse(res)

        if (merchant.store_id) {
            return true
        } else {
            return false
        }
    }

    registerStore(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/register`,
            formData,
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    addStore(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/add`,
            formData,
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    getStore() {
        return GET(`${this.url}/api/store`, { "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    getStoreList() {
        return GET(`${this.url}/api/store/list`, { "store_id": this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateFile(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/updateFile`,
            formData,
            { "Authorization": `Bearer ${this.token}`});
    }

    uploadFile(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/uploadFile`,
            formData,
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    removeFile(file_id) {
        return POST(`${this.url}/api/store/removeFile`,
            { file_id, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateStoreAddress({ id, latitude, longitude, address_1, address_2, country, state, city, postcode }) {
        return POST(`${this.url}/api/store/updateAddress`,
            {
                address_id: id,
                latitude,
                longitude,
                address_1,
                address_2,
                country,
                state,
                city,
                postcode,
                "store_id": this.store_id
            },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateStore(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/update`,
            formData,
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateDeliveryProvider(delivery_provider) {
        return POST(`${this.url}/api/store/delivery/parcel`,
            { delivery_provider, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateExpressDeliveryProvider(delivery_provider) {
        return POST(`${this.url}/api/store/delivery/express`,
            { delivery_provider, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateDeliverySetting({ free_delivery }) {
        return POST(`${this.url}/api/store/delivery/setting`,
            { free_delivery, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    // Store Orders Management
    listOrderByStatus({ order_status = 0, _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/store/order/status/${order_status}`,
            { _page, _pagesize, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    getOrder(order_id) {
        return GET(`${this.url}/api/store/order/${order_id}`, {
            "store_id": this.store_id
        },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateOrderStatus({ order_id, order_status }) {
        return POST(`${this.url}/api/store/order/${order_id}`,
            { order_status, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    updateOrderDelivery({ order_id, tracking_id, tracking_uri }) {
        return POST(`${this.url}/api/store/order/delivery/${order_id}`,
            { tracking_id, tracking_uri, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    uploadPacking(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/order/shipping/upload`,
            formData,
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    listOrderSettlement({ settlement_status = 0, _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/store/order/settlement/${settlement_status}`,
            { _page, _pagesize, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    // Store Report
    getIncomeReport() {
        return GET(`${this.url}/api/store/report/income`,
            { "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    getReport({ start, end }) {
        return GET(`${this.url}/api/store/report`,
            { start, end, "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    getOrderCount() {
        return GET(`${this.url}/api/store/report/order`,
            { "store_id": this.store_id },
            {
                "Authorization": `Bearer ${this.token}`,
                "store_id": this.store_id
            });
    }

    // Store Product Management
    listProducts(product_status, { _page, _pagesize }, _search = null) {
        return GET(`${this.url}/api/store/product`,
            { _page, _pagesize, product_status, _search, "store_id": this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    createProduct(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/product`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    updateProduct({ product, variants }) {
        return POST(`${this.url}/api/store/product/update`,
            { product, variants, "store_id": this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteProduct(product_id) {
        return POST(`${this.url}/api/store/product/delete`,
            { product_id, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    getProduct(product_id) {
        return GET(`${this.url}/api/store/product/${product_id}`,
            { store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    addProductImage(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/product/addImage`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    updateProductImage(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/product/updateImage`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    removeProductImage(product_id, image_id) {
        return POST(`${this.url}/api/store/product/removeImage`,
            { product_id, image_id, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    publishProduct(product_id) {
        return POST(`${this.url}/api/store/product/publish`,
            { product_id, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    draftProduct(product_id) {
        return POST(`${this.url}/api/store/product/draft`,
            { product_id, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    importProduct(formData) {
        formData.append("store_id", this.store_id);

        return POSTFORM(`${this.url}/api/store/product/import`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    exportProductTemplate() {
        return `${this.url}/api/store/product/export?access_token=${this.token}&store_id=${this.store_id}`;
    }

    // Store Inventory
    searchMaster({ _page, _pagesize, _search = null }) {
        return GETUNTRACKED(`${this.url}/api/store/product/master`,
            { _page, _pagesize, _search },
            { "Authorization": `Bearer ${this.token}` });
    }

    listInventories({ _page, _pagesize }) {
        return GET(`${this.url}/api/store/product/inventory`,
            { _page, _pagesize, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    getInventory(inventory_id) {
        return GET(`${this.url}/api/store/product/inventory/${inventory_id}`,
            { store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    addInventory({ variant_ids }) {
        return POST(`${this.url}/api/store/product/inventory`,
            { variant_ids, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateInventory(inventory) {
        return POST(`${this.url}/api/store/product/inventory/${inventory.inventory_id}`,
            { ...inventory, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateInventoryStatus({ inventory_ids, status }) {
        return POST(`${this.url}/api/store/product/inventory/status`,
            { inventory_ids, status, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteInventory({ inventory_ids }) {
        return DELETE(`${this.url}/api/store/product/inventory`,
            { inventory_ids, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }
    // Store Webhook Management
    getStoreWebhookList({ _page, _pagesize }) {
        return GET(`${this.url}/api/store/developer/webhook`,
            { _page, _pagesize, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    getStoreWebhook(webhook_id) {
        return GET(`${this.url}/api/store/developer/webhook/${webhook_id}`,
            { store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    createStoreWebhook({ webhook_event, webhook_uri }) {
        return POST(`${this.url}/api/store/developer/webhook`,
            { webhook_event, webhook_uri, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateStoreWebhook({ webhook_id, webhook_uri }) {
        return POST(`${this.url}/api/store/developer/webhook/${webhook_id}`,
            { webhook_uri, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    deleteStoreWebhook(webhook_id) {
        return DELETE(`${this.url}/api/store/developer/webhook/${webhook_id}`,
            { store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Merchant Management
    listMerchant({ _page, _pagesize }) {
        return GET(`${this.url}/api/store/merchant`,
            { _page, _pagesize, "store_id": this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    inviteMerchant(email) {
        return POST(`${this.url}/api/store/merchant/invite`,
            { email, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Store Coupon
    listCoupons({ _page, _pagesize }) {
        return GET(`${this.url}/api/store/coupon`,
            { _page, _pagesize, "store_id": this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    getCoupon(coupon_id) {
        return GET(`${this.url}/api/store/coupon/${coupon_id}`,
            { store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    createCoupon(coupon) {
        return POST(`${this.url}/api/store/coupon`,
            { ...coupon, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateCoupon(coupon) {
        return POST(`${this.url}/api/store/coupon/update`,
            { ...coupon, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }
    
    deleteCoupon(coupon_id) {
        return DELETE(`${this.url}/api/store/coupon`,
            { coupon_id, store_id: this.store_id },
            { "Authorization": `Bearer ${this.token}` });
    }
}



let Api = new MerchantApi();
export default Api;