import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
// CartContext is like a shared space where your cart data (state + functions) will live.
// Think of this like a storage room where components can put in or take out data (products).

export const useCart = () => useContext(CartContext);
//Instead of writing useContext(CartContext) every time, we wrap it in useCart() for convenience.
// Now you can just do:
// const { addToCart, cartItems } = useCart();

// This is a React component that stores the actual cart data and provides functions to manipulate it.
// children means whatever is wrapped inside this provider—like your whole app.
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product.product_id === product.product_id);
            if(existing) {
                return prev.map(item =>
                    item.product.product_id === product.product_id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
                );                  
            }
            return [...prev, { product, quantity }];
        })
    }

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.product.product_id !== productId));
      };
    
    const clearCart = () => setCartItems([]);

    return(
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}