import React, {useContext} from "react";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import {Meal} from "./Meals";
import {currencyFormatter} from "../util/formatting";
import useHttp from "../hooks/useHttp";
import MyError from "./MyError";


const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout(): React.JSX.Element {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const {
        fetchedData,
        isFetching,
        errorState,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotalPrice = cartContext.items.reduce((cartTotalPrice: number, item: Meal) => {
        return cartTotalPrice + (item.quantity * Number(item.price))
    }, 0);

    function handleCloseButton() {
        userProgressContext.hideCheckout();
    }

    function handleFinishOrder() {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }

    function handleOnSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: customerData
            }
        }));

    }

    let actions: React.JSX.Element = (
        <>
            <Button textOnly={true} type="button" onClick={handleCloseButton}>close</Button>
            <Button textOnly={false}>Submit Order</Button>
        </>
    );

    if (isFetching) {
        actions = <span>Sending order data...</span>
    }

    if (fetchedData && !errorState) {
        return (
            <Modal open={userProgressContext.progress === "checkout"} onClose={handleFinishOrder}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the new few minutes.</p>
                <p className="modal-actions">
                    <Button textOnly={false} onClick={handleFinishOrder}>
                        Okay
                    </Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressContext.progress === "checkout"} onClose={handleCloseButton}>
            <form onSubmit={handleOnSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotalPrice)}</p>
                <Input id="name" type="text" label="Full Name"/>
                <Input id="email" type="email" label="E-Mail Address"/>
                <Input id="street" type="text" label="Street"/>
                <div className="control-row">
                    <Input id="postal-code" type="text" label="Postal Code"/>
                    <Input id="city" type="text" label="City"/>
                </div>

                {errorState && <MyError title="Failed to submit order" errorMsg={errorState}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}