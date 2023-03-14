import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../../api/Market";
import Event from "../../api/Event";
import { toast } from "react-toastify";

export default function cart({ product, setProduct }) {
    const [isShow, setIsShow] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState({});

    useEffect(() => {
        if (product) {
            setIsShow(true);
            setVariant(product.variants[0]);
            setQuantity(1);
            if (product.variants[0].data.MOQ) {
                setQuantity(parseInt(product.variants[0].data.MOQ))
            } else {
                setQuantity(1)
            }
        }
    }, [product]);

    const addCart = async (variant_details) => {
        try {
            // MOQ Validation
            // if (variant_details.data.MOQ) {
            //     if (variant_details.data.MOQ != -1 && quantity < variant_details.data.MOQ) {
            //         toast.warning("Quantity must be higher than Minimum Order Quantity", {
            //             autoClose: 1000,
            //         });
            //         setIsShow(false)
            //         return
            //     }
            // }

            // Stock Validation
            // if (variant_details.stock) {
            //     if (variant_details.stock != -1 && quantity > variant_details.stock) {
            //         toast.warning("Quantity must be lower than items left", {
            //             autoClose: 1000,
            //         });
            //         setIsShow(false)
            //         return
            //     }
            // }

            await api.addCart({ inventory_id: variant_details.id, quantity, operation: 1 });

            toast.success("Item Added to Cart", {
                autoClose: 1000,
            });

            onHide();

            Event.emit("update_cart");
        } catch (ex) {
            toast.warning(ex.message)
        }
    };

    const onHide = () => {
        setIsShow(false)
        setProduct(null);
    }

    return <Modal show={isShow} onHide={onHide} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header onClick={onHide}>
            {product?.variants?.length > 1 ?
                <Modal.Title>Select Variant and Quantity</Modal.Title>
                :
                <Modal.Title>Select Quantity</Modal.Title>
            }
        </Modal.Header>
        <Modal.Body>
            {product?.variants?.length > 1 && product?.variants?.map((x, index) => (
                <div className="row mb-2">
                    <div className="col-9 mb-2" key={index}>
                        <div className="align-items-center">
                            <button
                                className={`btn variant-box me-2 word_break
                                    ${x.stock == 0 ? `btn-outline-secondary` : `btn-outline-primary`}
                                    ${variant.id == x.id ? "active" : "" }`}

                                disabled={x.inventories?.length == 0}
                                onClick={() => {
                                    setVariant(x)
                                    // if (x.data.MOQ) {
                                    //     setQuantity(parseInt(x.data.MOQ))
                                    // } else {
                                    //     setQuantity(1)
                                    // }
                                }}
                            > <p className="mb-0">
                                    {
                                        x.data.name
                                    }
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className="col-3 mb-2" key={index}>
                        <div className="align-items-center">
                            <p className="mb-0 word_break">
                                { x.inventories?.length > 0 ? `RM ${x.inventories[0].price}` : "Not Available"}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <span className="">
                                Quantity
                            </span>
                        </div>
                        <div className="d-flex">
                            <button
                                className="bg-white border rounded-start border-end-0 p-2 px-3 fw-bold"
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    if (variant.data.MOQ) {
                                        if (quantity > variant.data.MOQ) {
                                            setQuantity(
                                                quantity - 1
                                            );
                                        }
                                    } else {
                                        if (quantity > 1) {
                                            setQuantity(
                                                quantity - 1
                                            );
                                        }
                                    }
                                }}
                            >
                                -
                            </button>
                            <input type="number" value={quantity}
                                className="form-control border text-center no-arrow" style={{ height: 42, width: 86 }}
                                onChange={(e) => setQuantity(e.target.valueAsNumber)} />
                            <button
                                className="bg-white border rounded-end border-start-0 p-2 px-3 fw-bold"
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setQuantity(quantity + 1);
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center my-3">
                <button
                    onClick={() =>{
                        if(variant.inventories)
                            addCart(variant.inventories[0])
                    }}
                    className={`btn ${variant.inventories?.length == 0 ? `btn-secondary` : `btn-primary`}`}
                    disabled={variant.inventories?.length == 0}
                >
                    Add to Cart
                </button>
                <button className="btn btn-secondary ms-2" onClick={onHide}>
                    Cancel
                </button>
            </div>
        </Modal.Body>
    </Modal>

}