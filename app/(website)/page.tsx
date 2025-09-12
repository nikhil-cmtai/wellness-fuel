import HeroSection from '@/components/home/hero-section'
import AboutSection from '@/components/home/about-section'
import StatsSection from '@/components/home/stats-section'
import TestimonialSection from '@/components/home/testimonial-section'
import ProductSection from '@/components/home/product-section'
import DoctorsSection from '@/components/home/doctors-section'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductSection />
      <DoctorsSection />
      <TestimonialSection />
    </div>
  )
}

export default HomePage