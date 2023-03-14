import { GET, POST, POSTFORM, DELETE } from './Fetch';

import API from './index';

class MarketApi extends API {
    constructor() {
        super();

        this.prefix = "marketplace";
        //this.checkAuth();
    }

    //
    onboardMetadata(formData) {
        return POSTFORM(`${this.url}/api/customer/store`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    getMetadata() {
        return GET(`${this.url}/api/customer/store`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    // B2B Marketplace - Product
    searchCatalogue({ _page = 1, _pagesize = 20, _search, filters }) {
        return GET(`${this.url}/api/market/business/catalogue`,
            { _page, _pagesize, _search, filters },
            { "Authorization": `Bearer ${this.token}` });
    }

    getCatalogueProduct(product_id) {
        return GET(`${this.url}/api/market/business/catalogue/${product_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    getStore(store_id) {
        return GET(`${this.url}/api/market/business/catalogue/store/${store_id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    getStoreProduct(uuid, { _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/market/business/catalogue/store/${uuid}/product`,
            { _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Cart
    addCart({ inventory_id, quantity, is_business = false, operation = 0 }) {
        return POST(`${this.url}/api/market/cart`,
            { inventory_id, quantity, is_business, operation },
            { "Authorization": `Bearer ${this.token}` }
        );
    }

    getCart({ is_business = true, _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/market/cart`,
            { is_business, _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` }
        );
    }

    getCartCount({ is_business = true }) {
        return GET(`${this.url}/api/market/cart/count`,
            { is_business },
            { "Authorization": `Bearer ${this.token}` }
        );
    }

    deleteCart(id) {
        return DELETE(`${this.url}/api/market/cart/${id}`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    createTransaction(formData) {
        return POSTFORM(`${this.url}/api/market/transaction`,
            formData,
            { "Authorization": `Bearer ${this.token}` });
    }

    getTransactions({ is_business = true, _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/market/transaction`,
            { is_business, _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    getTransaction({ uuid, is_business = true }) {
        return GET(`${this.url}/api/market/transaction/${uuid}`,
            { is_business },
            { "Authorization": `Bearer ${this.token}` });
    }

    updateTransactionAddress({ ref_id/*, address_id*/ }) {
        return POST(`${this.url}/api/market/transaction/address`,
            {
                ref_id,
                //address_id
            },
            { "Authorization": `Bearer ${this.token}` });
    }

    checkout({ ref_id, address_id }) {
        return POST(`${this.url}/api/market/transaction/checkout`,
            {
                ref_id,
                address_id
            },
            { "Authorization": `Bearer ${this.token}` });
    }

    getAddress() {
        return GET(`${this.url}/api/customer/address`, {},
            { "Authorization": `Bearer ${this.token}` });
    }

    updateAddress({ id, name, email, phone, address_1, address_2, country, state, city, postcode }) {
        return POST(`${this.url}/api/customer/address/update`,
            { address_id: id, name, email, phone, address_1, address_2, country, state, city, postcode },
            { "Authorization": `Bearer ${this.token}` });
    }

    getCoupon({ coupon_name }) {
        return GET(`${this.url}/api/market/coupon`,
            { coupon_name },
            { "Authorization": `Bearer ${this.token}` });
    }

    // Marketplace Orders
    listMarketOrderByStatus({ order_status = 0, is_business = true, _page = 1, _pagesize = 20 }) {
        return GET(`${this.url}/api/market/order/status/${order_status}`, { is_business, _page, _pagesize },
            { "Authorization": `Bearer ${this.token}` });
    }

    cancelOrder(order_id) {
        return POST(`${this.url}/api/market/order/cancel/${order_id}`,
            {},
            { "Authorization": `Bearer ${this.token}` });
    }

    receivedOrder(order_id) {
        return POST(`${this.url}/api/market/order/receive/${order_id}`,
            {},
            { "Authorization": `Bearer ${this.token}` });
    }

    archivedOrder(order_id) {
        return POST(`${this.url}/api/market/order/archive/${order_id}`,
            {},
            { "Authorization": `Bearer ${this.token}` });
    }
}



let Api = new MarketApi();
export default Api;