"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle, Heart } from "lucide-react";

// Define interface for Testimonial
interface Testimonial {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  fallbackInitials: string;
  rating: number;
  text: string;
  location: string;
  verified: boolean;
}

const TestimonialSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (testimonialId: number): void => {
    setImageErrors((prev) => ({ ...prev, [testimonialId]: true }));
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1c7?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "SJ",
      rating: 5,
      text: "Wellness Fuel transformed my healthcare experience. The doctors are incredibly knowledgeable and the platform is so easy to use. I can get medical advice anytime, anywhere.",
      location: "New York, NY",
      verified: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "MC",
      rating: 5,
      text: "As a healthcare provider, I love how this platform streamlines patient care. The telemedicine features are excellent and help me reach more patients effectively.",
      location: "Los Angeles, CA",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Patient",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "ER",
      rating: 5,
      text: "The personalized wellness programs have been life-changing. I've never felt more supported in my health journey. Highly recommend to anyone looking for quality healthcare.",
      location: "Miami, FL",
      verified: true,
    },
    {
      id: 4,
      name: "Dr. Lisa Thompson",
      role: "Family Medicine",
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "LT",
      rating: 5,
      text: "This platform has revolutionized how I practice medicine. The patient management tools are intuitive and the 24/7 support system is outstanding.",
      location: "Seattle, WA",
      verified: true,
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Patient",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "JW",
      rating: 5,
      text: "The emergency care coordination saved my life. The response time was incredible and the follow-up care was comprehensive. I'm forever grateful.",
      location: "Chicago, IL",
      verified: true,
    },
    {
      id: 6,
      name: "Dr. Amanda Foster",
      role: "Mental Health Specialist",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "AF",
      rating: 5,
      text: "The mental health resources and support system are exceptional. It's wonderful to see technology being used to make mental healthcare more accessible.",
      location: "Boston, MA",
      verified: true,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-[#ea8f39] fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">What Our</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">
              Patients Say
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what patients and
            healthcare professionals are saying about their experience with
            Wellness Fuel.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ea8f39]">4.9/5</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ea8f39]">10,000+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Happy Patients
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ea8f39]">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Expert Doctors
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative border border-slate-200 dark:border-slate-700"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 mt-2">
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white dark:border-slate-700 shadow-lg">
                    {!imageErrors[testimonial.id] ? (
                      <Image
                        src={testimonial.imageUrl}
                        alt={`Portrait of ${testimonial.name}`}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                        onError={() => handleImageError(testimonial.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] flex items-center justify-center text-white font-semibold text-lg">
                        {testimonial.fallbackInitials}
                      </div>
                    )}
                  </div>

                  {/* Verification Badge */}
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    {testimonial.role.includes("Dr.") && (
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    )}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-8 right-8">
                <Star className="w-6 h-6 text-white fill-current" />
              </div>
              <div className="absolute bottom-4 left-8">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="absolute bottom-6 right-4">
                <Quote className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience Better Healthcare?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied patients who have transformed their
                health journey with Wellness Fuel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-[#ea8f39] font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Started Today
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#ea8f39] transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
