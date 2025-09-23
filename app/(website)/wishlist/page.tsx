"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, HeartCrack } from "lucide-react";
import { useWishlist, WishlistItem } from "@/lib/context/wishlistContext"; // <-- WishlistItem ko yahan import karein
import { useCart } from "@/lib/context/CartContext";

const WishlistPage = () => {
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const { addToCart } = useCart();

  // Ab 'item' ka type sahi se define hai
  const handleMoveToCart = (item: WishlistItem) => {
    addToCart(item);
    toggleWishlistItem(item); // Wishlist se item hata dega
  };

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {wishlistItems.length > 0 ? (
          <div>
            <ul className="divide-y divide-border">
              {wishlistItems.map((item) => (
                <li key={item.id} className="flex items-center gap-6 py-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold text-[#ea8f39] mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white font-semibold rounded-full py-2 px-4 hover:opacity-90 transition-opacity"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Move to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleWishlistItem(item)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <HeartCrack className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground">
              Your Wishlist is Empty
            </h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Looks like you haven&apos;t added anything yet. Let&apos;s change that!
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white font-bold rounded-full py-3 px-8"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
