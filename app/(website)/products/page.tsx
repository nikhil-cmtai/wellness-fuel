import Products from './products'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Products | Wellness Fuel",
  description: "Products | Wellness Fuel",
};

export default function ProductsPage() {
  return (
    <>
      <Products />
    </>
  );
}