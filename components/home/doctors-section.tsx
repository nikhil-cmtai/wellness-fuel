"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRight,
  Award,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define interface for Doctor
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  patients: string;
  location: string;
  imageUrl: string;
  fallbackInitials: string;
  availability: string;
  languages: string[];
  education: string;
  consultationFee: string;
  about: string;
}

const DoctorsSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (doctorId: number): void => {
    setImageErrors((prev) => ({ ...prev, [doctorId]: true }));
  };

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      patients: "2,500+",
      location: "New York, NY",
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "SJ",
      availability: "Available Today",
      languages: ["English", "Spanish"],
      education: "Harvard Medical School",
      consultationFee: "$200",
      about:
        "Specializes in preventive cardiology and heart disease management with advanced interventional procedures.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.8,
      patients: "1,800+",
      location: "Los Angeles, CA",
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "MC",
      availability: "Available Tomorrow",
      languages: ["English", "Mandarin"],
      education: "Stanford Medical School",
      consultationFee: "$250",
      about:
        "Expert in treating neurological disorders including epilepsy, stroke, and neurodegenerative diseases.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10 years",
      rating: 4.9,
      patients: "3,200+",
      location: "Miami, FL",
      imageUrl:
        "https://images.unsplash.com/photo-1594824883303-aef7c5324f7c?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "ER",
      availability: "Available Today",
      languages: ["English", "Spanish", "Portuguese"],
      education: "Johns Hopkins Medical School",
      consultationFee: "$180",
      about:
        "Dedicated to providing comprehensive healthcare for children from infancy through adolescence.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.7,
      patients: "2,100+",
      location: "Chicago, IL",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "JW",
      availability: "Available Next Week",
      languages: ["English"],
      education: "Mayo Clinic Medical School",
      consultationFee: "$300",
      about:
        "Specialized in joint replacement surgery and sports medicine with minimally invasive techniques.",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Dermatologist",
      experience: "14 years",
      rating: 4.8,
      patients: "2,800+",
      location: "Seattle, WA",
      imageUrl:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "LT",
      availability: "Available Today",
      languages: ["English", "French"],
      education: "UCLA Medical School",
      consultationFee: "$220",
      about:
        "Expert in medical and cosmetic dermatology with focus on skin cancer prevention and treatment.",
    },
    {
      id: 6,
      name: "Dr. Amanda Foster",
      specialty: "Psychiatrist",
      experience: "11 years",
      rating: 4.9,
      patients: "1,900+",
      location: "Boston, MA",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      fallbackInitials: "AF",
      availability: "Available Tomorrow",
      languages: ["English", "German"],
      education: "Yale Medical School",
      consultationFee: "$275",
      about:
        "Specializes in anxiety disorders, depression, and cognitive behavioral therapy for adults.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-[#ea8f39] fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getAvailabilityStyle = (availability: string) => {
    if (availability.includes("Today")) {
      return "bg-green-100 text-green-800 border border-green-200";
    } else if (availability.includes("Tomorrow")) {
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    } else {
      return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Meet Our</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">
              Expert Doctors
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our team of board-certified medical professionals is dedicated to
            providing you with the highest quality healthcare services and
            personalized treatment plans.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {doctors.map((doctor: Doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-slate-200 dark:border-slate-700"
            >
              {/* Doctor Image & Availability */}
              <div className="relative p-6 pb-4">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  {!imageErrors[doctor.id] ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={`Portrait of ${doctor.name}`}
                      fill
                      className="object-cover rounded-full border-4 border-white dark:border-slate-700 shadow-lg"
                      sizes="128px"
                      onError={() => handleImageError(doctor.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-slate-700 shadow-lg">
                      {doctor.fallbackInitials}
                    </div>
                  )}

                  {/* Availability Badge */}
                  <div
                    className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${getAvailabilityStyle(doctor.availability)}`}
                  >
                    {doctor.availability}
                  </div>
                </div>

                {/* Doctor Basic Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-[#ea8f39] font-semibold text-lg mb-2">
                    {doctor.specialty}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {doctor.education}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({doctor.patients} patients)
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="px-6 pb-2">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Award className="w-4 h-4 text-[#bed16b]" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Users className="w-4 h-4 text-[#bed16b]" />
                    <span>{doctor.patients}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                  <MapPin className="w-4 h-4 text-[#bed16b]" />
                  <span>{doctor.location}</span>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full border"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Consultation Fee:
                  </span>
                  <span className="text-lg font-bold text-[#ea8f39]">
                    {doctor.consultationFee}
                  </span>
                </div>

                {/* About */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {doctor.about}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 py-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all duration-300"
                    title="Send Message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA with Navigation */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Can&apos;t Find the Right Doctor?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team can help you find the perfect specialist for your needs.
              We have access to thousands of qualified doctors across all
              specialties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Navigate to Our Doctors page */}
              <Link href="/our-doctors">
                <Button className="px-8 py-3 bg-white text-[#ea8f39] font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
                  Find a Doctor
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              {/* Navigate to Our Doctors page with specialty filter */}
              <Link href="/our-doctors">
                <Button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#ea8f39] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  View All Specialties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
