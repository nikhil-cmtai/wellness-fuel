import React from 'react'
import { Star, Quote } from 'lucide-react'

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "Wellness Fuel transformed my healthcare experience. The doctors are incredibly knowledgeable and the platform is so easy to use. I can get medical advice anytime, anywhere."
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "As a healthcare provider, I love how this platform streamlines patient care. The telemedicine features are excellent and help me reach more patients effectively."
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "The personalized wellness programs have been life-changing. I've never felt more supported in my health journey. Highly recommend to anyone looking for quality healthcare."
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Family Medicine",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "This platform has revolutionized how I practice medicine. The patient management tools are intuitive and the 24/7 support system is outstanding."
    },
    {
      name: "James Wilson",
      role: "Patient",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "The emergency care coordination saved my life. The response time was incredible and the follow-up care was comprehensive. I'm forever grateful."
    },
    {
      name: "Dr. Amanda Foster",
      role: "Mental Health Specialist",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "The mental health resources and support system are exceptional. It's wonderful to see technology being used to make mental healthcare more accessible."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">What Our</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">Patients Say</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what patients and healthcare professionals 
            are saying about their experience with Wellness Fuel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ea8f39] fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience Better Healthcare?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied patients who have transformed their health journey with Wellness Fuel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-[#ea8f39] font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                Get Started Today
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#ea8f39] transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
