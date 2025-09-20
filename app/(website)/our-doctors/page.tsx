import Doctors from './our-doctors'
import { Metadata } from 'next'
import HeroSection from "@/components/home/hero-section";
export const metadata: Metadata = {
  title: "Doctors | Wellness Fuel",
  description: "Doctors | Wellness Fuel",
};

export default function DoctorsPage() {
  return (
    <>
      <HeroSection />
      <Doctors />
    </>
  );
}