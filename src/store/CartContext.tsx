import React, {createContext, useReducer} from "react";
import {Meal} from "../components/Meals";

const CartContext: React.Context<any> = createContext({
    items: Array<Meal>,
    addItem: (item: Meal) => {},
    removeItem: (item: Meal) => {},
    clearCart: () => {}
});

interface CartContextProps {
    children: React.ReactNode
}

interface CartState {
    items: Array<Meal>
}

interface Action {
    type: string,
    item: Meal
}


const INITIAL_CART: CartState = {
    items: []
};

function cartReducer(state: CartState, action: Action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updateItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updateItem;
        } else {
            updatedItems.push({
                ...action.item,
                quantity: 1
            })
        }
        return {
            ...state,
            items: updatedItems
        }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updateItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updateItem;
        }
        return {
            ...state,
            items: updatedItems
        }
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: []
        }
    }

    return state;
}

export function CartContextProvider({children}: CartContextProps) {
    const [cartState, dispatchCartAction]: [CartState, React.Dispatch<Action>]
        = useReducer(cartReducer, INITIAL_CART);

    function addItem(item: Meal) {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        });
    }

    function removeItem(item: Meal) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            item: item
        })
    }

    function clearCart() {
        dispatchCartAction({
            type: 'CLEAR_CART',
            item: null as unknown as Meal
        })
    }

    const cartContextValue = {
        items: cartState.items,
        addItem,
        removeItem,
        clearCart
    };

    console.log(cartContextValue)

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>);
}

export default CartContext;