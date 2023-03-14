import { createContext } from "react";

const ProductModel =     {
    product_id:null,
    name:"",
    short_name:"",
    brand:"",
    product_type:0,
    product_category:"",
    tags:"",
    contents:{
        en:[
            {
                label:"Description",
                text:""
            }
        ],
        in:[
            {
                label:"Description",
                text:""
            }
        ],
        bm:[
            {
                label:"Description",
                text:""
            }
        ]
    },
    poison:{
        category:"",
        manufacture:"",
        ingredients:"",
        mal_no:""
    },
    service:{
        category:"",
        gender:""
    },
    l_cat:{
        l1:"",
        l2:"",
        l3:"",
        l4:""
    },
    variants:[
        {
            name:"",
            sku:"",
            shipping:{
                width:0,
                height:0,
                length:0,
                weight:0,
            }
        }
    ],
    images:[]
};

// context object
const ProductContext = createContext([
    ProductModel, // product modal
    ()=>{}, // setProduct
    {} // validation error
]);

export default ProductContext;
export { ProductModel }