import { createContext } from "react";

const InventoryModel =     {
    inventory_id:null,
    variant_id:null,

    sku:"",

    price:"0.00",
    display_price:"0.00",

    voucher_value:"0.00",
    
    has_stock:false,
    stock:0,

    has_minimum_order_quantity:false,
    minimum_order_quantity:0,

    has_bulk_pricing:false,
    bulk_pricing:[
        {
            minimum_quantity:0,
            price:0
        }
    ]
};

// context object
const InventoryContext = createContext([
    InventoryModel, // inventory modal
    ()=>{}, // setInventory
    {} // validation error
]);

export default InventoryContext;
export { InventoryModel }