import Products from './products'
import { Metadata } from 'next'
import HeroSection from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "Products | Wellness Fuel",
  description: "Products | Wellness Fuel",
};

export default function ProductsPage() {
  return (
    <>
      <HeroSection />
      <Products />
    </>
  );
}