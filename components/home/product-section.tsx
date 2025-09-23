"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  ShoppingCart,
  Sparkles,
  Pill,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductSection = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Enhanced data with better images and fallback icons
  const products = [
    {
      title: "Wellness Supplements",
      description:
        "Premium quality vitamins, minerals, and health supplements to support your wellness journey.",
      features: [
        "Natural & Organic Ingredients",
        "Third-Party Lab Tested",
        "Customized Recommendations",
      ],
      price: "From $25",
      originalPrice: "$40",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center",
      icon: Heart,
      rating: 4.9,
      reviews: 456,
    },
    {
      title: "Prescription Medications",
      description:
        "Get your prescribed medications delivered directly to your doorstep with our secure pharmacy service.",
      features: [
        "FDA Approved Medications",
        "Free & Discreet Home Delivery",
        "Easy Prescription Upload",
      ],
      price: "From $15",
      originalPrice: "$25",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop&crop=center",
      icon: Pill,
      rating: 4.8,
      reviews: 234,
    },
    {
      title: "Health Monitors",
      description:
        "Advanced health monitoring devices to track your vital signs and wellness metrics.",
      features: [
        "Real-Time Vital Monitoring",
        "Seamless Mobile App Sync",
        "Professional Grade Accuracy",
      ],
      price: "From $89",
      originalPrice: "$120",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
      icon: Zap,
      rating: 4.6,
      reviews: 123,
    },
    {
      title: "First Aid & Care",
      description:
        "Comprehensive first aid supplies for home, office, and travel emergency situations.",
      features: [
        "Complete Medical Supplies",
        "Portable & Durable Design",
        "Emergency Guide Included",
      ],
      price: "From $35",
      originalPrice: "$50",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1603398938796-e867ee8b0b1d?w=600&h=400&fit=crop&crop=center",
      icon: Shield,
      rating: 4.7,
      reviews: 189,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#bed16b]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#ea8f39]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <Sparkles className="absolute top-32 left-1/4 w-6 h-6 text-[#bed16b]/20 animate-pulse" />
        <Sparkles className="absolute bottom-40 right-1/3 w-4 h-4 text-[#ea8f39]/20 animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-6 shadow-lg">
            <ShoppingCart className="w-4 h-4 text-[#ea8f39]" />
            <span>Premium Healthcare Products</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            <span className="text-slate-900 dark:text-white">Our Curated </span>
            <span className="bg-gradient-to-r from-[#bed16b] via-[#a8c55a] to-[#ea8f39] bg-clip-text text-transparent animate-pulse">
              Products
            </span>
          </h2>

          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full shadow-lg"></div>
          </div>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover our premium pharmacy products and health essentials
            designed to support your wellness journey with quality and
            convenience.
          </p>
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                product.popular
                  ? "ring-2 ring-[#ea8f39] shadow-[#ea8f39]/20"
                  : "hover:ring-2 hover:ring-[#bed16b]/30"
              }`}
            >
              {/* Enhanced Popular Badge */}
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20">
                Save{" "}
                {Math.round(
                  ((parseFloat(product.originalPrice.replace("$", "")) -
                    parseFloat(product.price.replace("From $", ""))) /
                    parseFloat(product.originalPrice.replace("$", ""))) *
                    100
                )}
                %
              </div>

              {/* Enhanced Product Image with Fallback */}
              <div className="relative w-full h-48 overflow-hidden">
                {!imageErrors[index] ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => handleImageError(index)}
                      loading="lazy"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                    <product.icon className="w-20 h-20 text-[#ea8f39]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg mb-2">
                    {product.title}
                  </h3>
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/90 font-medium">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Heart icon for favorites */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:scale-110">
                  <Heart className="w-5 h-5 text-red-500 hover:fill-current transition-colors duration-200" />
                </div>
              </div>

              <div className="p-4 flex flex-col">
                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* Enhanced Features */}
                <ul className="space-y-2 mb-4">
                  {product.features.slice(0, 2).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Enhanced Price Section */}
                <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-left">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Starting from
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-slate-900 dark:text-white">
                          {product.price}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          {product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button
                    className={`group/btn w-full py-3 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                      product.popular
                        ? "bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white shadow-lg hover:shadow-xl"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-[#bed16b] hover:to-[#ea8f39] hover:text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-700/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-slate-200 dark:border-slate-600 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#bed16b]/10 to-[#ea8f39]/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ea8f39]/10 to-[#bed16b]/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#bed16b]/20 to-[#ea8f39]/20 text-[#ea8f39] text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Explore Our Full Range</span>
              </div>

              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                Can&apos;t Find What You Need?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Visit our dedicated products page to discover all our wellness
                solutions and get personalized recommendations.
              </p>

              <Link href="/products">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    View All Products
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
