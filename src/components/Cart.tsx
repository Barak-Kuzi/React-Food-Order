import React, {useContext} from "react";

import Modal from "./Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import {Meal} from "./Meals";
import CartContext from "../store/CartContext";
import {currencyFormatter} from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart(): React.JSX.Element {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotalPrice = cartContext.items.reduce((cartTotalPrice: number, item: Meal) => {
        return cartTotalPrice + (item.quantity * Number(item.price))
    }, 0);

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleCheckout() {
        userProgressContext.hideCart();
        userProgressContext.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressContext.progress === 'cart'}
            onClose={userProgressContext.progress === 'cart' ? handleCloseCart : undefined}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartContext.items.map((item: Meal) => (
                    <CartItem key={item.id} item={item}/>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly={true} onClick={handleCloseCart}>Close</Button>
                {cartContext.items.length > 0 &&
                    (<Button textOnly={false} onClick={handleCheckout}>Go to Checkout</Button>)}
            </p>
        </Modal>
    );
}