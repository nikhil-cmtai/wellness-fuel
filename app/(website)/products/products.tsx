"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/wishlistContext";
import HeroSection from "@/components/home/hero-section";

const productsData = [
  {
    id: 1,
    name: "Organic Ashwagandha Root",
    category: "Stress Relief",
    price: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Vegan Protein Powder",
    category: "Fitness & Nutrition",
    price: 39.99,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Probiotic Blend 50 Billion CFU",
    category: "Digestive Health",
    price: 29.99,
    imageUrl:
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=400&auto=format&fit=crop",
    badge: "New Arrival",
  },
  {
    id: 4,
    name: "Vitamin D3 + K2 Drops",
    category: "Vitamins & Minerals",
    price: 19.99,
    imageUrl:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=400&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 5,
    name: "Herbal Immunity Tea",
    category: "Immune Support",
    price: 14.99,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil",
    category: "Heart Health",
    price: 22.99,
    imageUrl:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
    badge: "Bestseller",
  },
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <HeroSection />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl shadow-lg border border-border overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-bold text-card-foreground mb-4 flex-grow">
                  {product.name}
                </h3>
                <p className="text-2xl font-extrabold text-[#ea8f39] mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="mt-auto flex items-center gap-3">
                  <Button
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:opacity-90 text-white font-semibold rounded-full shadow-md transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>
                  <Button
                    onClick={() => toggleWishlistItem(product)}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    title="Add to Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${isInWishlist(product.id) ? "text-red-500 fill-current" : "text-muted-foreground"}`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
