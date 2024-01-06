import React, {useContext} from "react";

import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import {Meal} from "./Meals";
import UserProgressContext from "../store/UserProgressContext";

export default function Header(): React.JSX.Element {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const totalCartItems = cartContext.items.reduce((totalNumberOfItems: number, item: Meal) => {
        return totalNumberOfItems + item.quantity
    }, 0);

    function handleShowCart() {
        userProgressContext.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="logo of web app"/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}