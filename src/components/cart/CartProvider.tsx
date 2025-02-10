"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, Discount } from "@/types";
import { Product } from "@prisma/client";

// Define the cart state type
interface CartState {
  items: CartItem[];
  sum: number;
  discount?: Discount | null;
}

// Define action types
type CartAction =
  | { type: "ADD_ITEM"; payload: Product & { duration: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "UPDATE_CART";
      payload: Product;
    }
  | { type: "APPLY_DISCOUNT"; payload: Discount }
  | { type: "CLEAR_CART" }
  | { type: "INIT_CART" /* ; payload: CartState  */ };

// Initial cart state
const initialState: CartState = {
  items: [],
  sum: 0,
  discount: null,
};

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
        };
      }
      const sum = state.sum + action.payload.price;
      const result = {
        ...state,
        sum,
        items: [
          ...state.items,
          { product: action.payload, duration: action.payload.duration },
        ],
      };
      localStorage.setItem("cart", JSON.stringify(result));
      return result;
    }

    case "REMOVE_ITEM": {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      const result = {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
        sum: state.sum - (item ? item.product.price : 0),
      };
      localStorage.setItem("cart", JSON.stringify(result));

      return result;
    }

    case "APPLY_DISCOUNT": {
      return { ...state, discount: action.payload };
    }

    case "CLEAR_CART": {
      localStorage.removeItem("cart");
      return { items: [], sum: 0, discount: null };
    }

    case "INIT_CART": {
      const result = JSON.parse(localStorage.getItem("cart") ?? "{}");

      return { items: [], sum: 0, discount: null, ...result };
    }

    default:
      return state;
  }
};

// Create Cart Context
const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);

// CartProvider Component
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const temp = localStorage.getItem("cart");
    dispatch({ type: "INIT_CART" });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
