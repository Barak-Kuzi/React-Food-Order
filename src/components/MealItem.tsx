import React, {useContext} from "react";

import {Meal} from "./Meals";
import {currencyFormatter} from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

interface MealItemProps {
    meal: Meal
}

export default function MealItem({meal}: MealItemProps): React.JSX.Element {
    const cartContext = useContext(CartContext);

    function handleClickAddToCart() {
        cartContext.addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(Number(meal.price))}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button textOnly={false} onClick={handleClickAddToCart}>
                        Add to Cart
                    </Button>
                </p>
            </article>
        </li>
    );
}