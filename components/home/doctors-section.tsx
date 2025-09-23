"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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

  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Green Blob - Top Right */}
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-[#bed16b]/8 to-[#a8c55a]/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Orange Blob - Bottom Left */}
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-[#ea8f39]/8 to-[#d67d2a]/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Accent Green Blob - Top Left */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#a8c55a]/6 to-[#bed16b]/6 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Primary Orange Blob - Bottom Right */}
        <motion.div
          className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-[#d67d2a]/6 to-[#ea8f39]/6 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Center Accent Blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#bed16b]/4 to-[#ea8f39]/4 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Small Floating Particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#bed16b] rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#ea8f39] rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#a8c55a] rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-slate-900 dark:text-white">Meet Our</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">
              Expert Doctors
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our team of board-certified medical professionals is dedicated to
            providing you with the highest quality healthcare services and
            personalized treatment plans.
          </motion.p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {doctors.map((doctor: Doctor, index: number) => (
            <motion.div
              key={doctor.id}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              {/* Doctor Image & Availability */}
              <div className="relative p-4 pb-3">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  {!imageErrors[doctor.id] ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={`Portrait of ${doctor.name}`}
                      fill
                      className="object-cover rounded-full border-4 border-white dark:border-slate-700 shadow-lg"
                      sizes="96px"
                      onError={() => handleImageError(doctor.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-slate-700 shadow-lg">
                      {doctor.fallbackInitials}
                    </div>
                  )}
                </div>

                {/* Doctor Basic Info */}
                <div className="text-center">
                  <motion.h3 
                    className="text-lg font-bold text-slate-900 dark:text-white mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    {doctor.name}
                  </motion.h3>
                  <motion.p 
                    className="text-[#ea8f39] font-semibold text-base mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  >
                    {doctor.specialty}
                  </motion.p>
                  <motion.p 
                    className="text-xs text-slate-600 dark:text-slate-400 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    {doctor.education}
                  </motion.p>

                  {/* Rating */}
                  <motion.div 
                    className="flex items-center justify-center gap-2 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  >
                    <div className="flex gap-1">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({doctor.patients})
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="px-4 pb-3">
                {/* Stats Row */}
                <motion.div 
                  className="grid grid-cols-2 gap-3 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Award className="w-3 h-3 text-[#bed16b]" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Users className="w-3 h-3 text-[#bed16b]" />
                    <span>{doctor.patients}</span>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div 
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                >
                  <MapPin className="w-3 h-3 text-[#bed16b]" />
                  <span>{doctor.location}</span>
                </motion.div>

                {/* Languages */}
                <motion.div 
                  className="mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                >
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, langIndex) => (
                      <motion.span
                        key={langIndex}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full border"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 1.5 + index * 0.1 + langIndex * 0.05 }}
                      >
                        {lang}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* About */}
                <motion.p 
                  className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                >
                  {doctor.about}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="p-4 pt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + index * 0.1 }}
              >
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white py-2 text-md font-semibold rounded-full">
                    <Calendar className="w-4 h-4 mr-1" />
                    Book
                  </Button>
                  <Button
                    variant="outline"
                    className="px-3 py-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-full"
                    title="Send Message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;
