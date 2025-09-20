"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner"; // Import toast for notifications

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlistItem: (product: WishlistItem) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const toggleWishlistItem = (product: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        toast.error(`"${product.name}" removed from wishlist.`);
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        toast.success(`"${product.name}" added to wishlist!`);
        return [...prevItems, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlistItem, isInWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
