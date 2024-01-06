import React, {useContext} from "react";

import {Meal} from "./Meals";
import {currencyFormatter} from "../util/formatting";
import CartContext from "../store/CartContext";

interface CartItemProps {
    item: Meal
}

export default function CartItem({item}: CartItemProps): React.JSX.Element {
    const cartContext = useContext(CartContext);

    function handleDecreaseButton() {
        cartContext.removeItem(item);
    }

    function handleIncreaseButton() {
        cartContext.addItem(item);
    }

    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} x {currencyFormatter.format(+item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={handleDecreaseButton}>-</button>
                <span>{item.quantity}</span>
                <button onClick={handleIncreaseButton}>+</button>
            </p>
        </li>
    );
}