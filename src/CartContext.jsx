import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    // to persist data to local storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // add items to cart
    const addItem = (Item) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === Item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === Item.id ? { ...p, qty: p.qty + 1 } : p
                );
            }
            return [...prev, { ...Item, qty: 1 }];
        });
    };

    // to increase value in cart
    const increment = (id) => {
        setCart((prev) =>
            prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
        );
    };

    // to decrease the value
    const decrement = (id) => {
        setCart((prev) =>
            prev
                .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
                .filter((p) => p.qty > 0)
        );
    };

    // to remove item
    const removeItem = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    // to clear cart
    const clearCart = () => setCart([]);

    // helper: robust price parser
    const parsePrice = (price) => {
        if (typeof price === "number" && isFinite(price)) return price;
        if (!price) return 0;
        let s = String(price).trim();
        s = s.replace(/[^0-9.\-]/g, "");
        const parts = s.split(".");
        if (parts.length > 2) {
            const first = parts.shift();
            s = first + "." + parts.join("");
        }
        const n = parseFloat(s);
        return Number.isFinite(n) ? n : 0;
    };

    // totals
    const totalItems = cart.reduce((sum, p) => sum + (p.qty || 0), 0);
    const totalPrice = cart.reduce(
        (sum, p) => sum + (p.qty || 0) * parsePrice(p.price), 0
    );

    return (
        <CartContext.Provider value={{
            cart,
            addItem,
            increment,
            decrement,
            removeItem,
            clearCart,
            totalItems,
            totalPrice,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);