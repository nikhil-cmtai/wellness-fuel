"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal,
  Grid3X3,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/wishlistContext";
import CommonHero from "@/components/common/common-hero";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge: string | null;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  tags: string[];
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Organic Ashwagandha Root",
    category: "Stress Relief",
    price: 24.99,
    originalPrice: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Premium organic ashwagandha root powder for stress relief and better sleep.",
    tags: ["organic", "stress-relief", "sleep", "anxiety"]
  },
  {
    id: 2,
    name: "Vegan Protein Powder",
    category: "Fitness & Nutrition",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.6,
    reviews: 89,
    inStock: true,
    description: "Plant-based protein powder with 25g protein per serving.",
    tags: ["vegan", "protein", "fitness", "plant-based"]
  },
  {
    id: 3,
    name: "Probiotic Blend 50 Billion CFU",
    category: "Digestive Health",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=400&auto=format&fit=crop",
    badge: "New Arrival",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    description: "High-potency probiotic blend for digestive health and immune support.",
    tags: ["probiotics", "digestive", "immune", "gut-health"]
  },
  {
    id: 4,
    name: "Vitamin D3 + K2 Drops",
    category: "Vitamins & Minerals",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.7,
    reviews: 156,
    inStock: true,
    description: "Liquid vitamin D3 and K2 for bone health and immune function.",
    tags: ["vitamin-d", "vitamin-k", "bone-health", "immune"]
  },
  {
    id: 5,
    name: "Herbal Immunity Tea",
    category: "Immune Support",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.5,
    reviews: 43,
    inStock: false,
    description: "Blend of immune-boosting herbs including echinacea and elderberry.",
    tags: ["tea", "immune", "herbal", "elderberry"]
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil",
    category: "Heart Health",
    price: 22.99,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    description: "High-quality fish oil with 1000mg EPA and DHA per serving.",
    tags: ["omega-3", "heart-health", "fish-oil", "epa-dha"]
  },
  {
    id: 7,
    name: "Turmeric Curcumin Complex",
    category: "Anti-Inflammatory",
    price: 27.99,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop",
    badge: "Sale",
    rating: 4.7,
    reviews: 91,
    inStock: true,
    description: "Potent turmeric extract with black pepper for enhanced absorption.",
    tags: ["turmeric", "curcumin", "anti-inflammatory", "joint-health"]
  },
  {
    id: 8,
    name: "Magnesium Glycinate",
    category: "Sleep & Relaxation",
    price: 18.99,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.6,
    reviews: 78,
    inStock: true,
    description: "Highly absorbable magnesium for better sleep and muscle relaxation.",
    tags: ["magnesium", "sleep", "relaxation", "muscle-health"]
  },
  {
    id: 9,
    name: "Green Tea Extract",
    category: "Antioxidants",
    price: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.4,
    reviews: 52,
    inStock: true,
    description: "Concentrated green tea extract with EGCG for antioxidant support.",
    tags: ["green-tea", "antioxidants", "egcg", "metabolism"]
  },
  {
    id: 10,
    name: "Collagen Peptides",
    category: "Beauty & Skin",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=400&auto=format&fit=crop",
    badge: "Popular",
    rating: 4.8,
    reviews: 167,
    inStock: true,
    description: "Hydrolyzed collagen peptides for skin, hair, and joint health.",
    tags: ["collagen", "beauty", "skin", "joint-health"]
  },
  {
    id: 11,
    name: "B-Complex Vitamins",
    category: "Vitamins & Minerals",
    price: 21.99,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.5,
    reviews: 89,
    inStock: true,
    description: "Complete B-vitamin complex for energy and nervous system support.",
    tags: ["b-vitamins", "energy", "nervous-system", "metabolism"]
  },
  {
    id: 12,
    name: "Zinc Picolinate",
    category: "Immune Support",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
    badge: null,
    rating: 4.6,
    reviews: 45,
    inStock: true,
    description: "Highly bioavailable zinc for immune function and skin health.",
    tags: ["zinc", "immune", "skin-health", "bioavailable"]
  }
];

const categories = [
  "All Categories",
  "Stress Relief",
  "Fitness & Nutrition", 
  "Digestive Health",
  "Vitamins & Minerals",
  "Immune Support",
  "Heart Health",
  "Anti-Inflammatory",
  "Sleep & Relaxation",
  "Antioxidants",
  "Beauty & Skin"
];

const sortOptions = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "newest", label: "Newest First" }
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("name-asc");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        viewMode === "list" ? "flex-row" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "aspect-square w-full"}`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={viewMode === "list" ? "192px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
        {product.badge && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white border-0">
            {product.badge}
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className={`p-6 flex flex-col flex-grow ${viewMode === "list" ? "flex-1" : ""}`}>
        <p className="text-sm text-slate-600 mb-1">{product.category}</p>
        <h3 className="text-lg font-bold text-slate-900 mb-2 flex-grow">{product.name}</h3>
        
        {viewMode === "grid" && (
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-slate-600">({product.reviews})</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-[#ea8f39]">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-slate-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>
        
        <div className="mt-auto flex items-center gap-3">
          <Button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:opacity-90 text-white font-semibold rounded-xl shadow-md transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button
            onClick={() => toggleWishlistItem(product)}
            variant="outline"
            size="icon"
            className="rounded-xl border-2 hover:border-red-500 hover:text-red-500"
            title="Add to Wishlist"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isInWishlist(product.id) ? "text-red-500 fill-current" : "text-slate-600"
              }`}
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-green-100 min-h-screen">
      <CommonHero
        title="Our Products"
        description="Discover our premium collection of wellness products designed to support your health journey."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=800&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Products" }
        ]}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border-2 focus:border-[#ea8f39]"
              />
            </div>
            
            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#ea8f39] focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-xl"
                >
                  <Grid3X3 className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-xl"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 rounded-xl"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              className="lg:hidden mt-6 pt-6 border-t border-slate-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#ea8f39] focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                  setPriceRange([0, 50]);
                  setSortBy("name-asc");
                }}
                className="w-full rounded-xl"
              >
                Clear All Filters
              </Button>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
              </p>
            </div>
            
            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* No Results */}
            {currentProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setPriceRange([0, 50]);
                  }}
                  className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white rounded-xl"
                >
                  Clear Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={`rounded-xl ${
                      currentPage === page 
                        ? "bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white border-0" 
                        : ""
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
