import React, {createContext, SetStateAction, useState} from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {
    },
    hideCart: () => {
    },
    showCheckout: () => {
    },
    hideCheckout: () => {
    }
});


interface UserProgressProps {
    children: React.ReactNode
}

export function UserProgressContextProvider({children}: UserProgressProps) {
    const [userProgress, setUserProgress]: [string, React.Dispatch<SetStateAction<string>>]
        = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const userProgressContextValue = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }


    return (
        <UserProgressContext.Provider value={userProgressContextValue}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;