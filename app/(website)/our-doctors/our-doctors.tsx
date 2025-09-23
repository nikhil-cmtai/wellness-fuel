"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Star,
  MapPin,
  Clock,
  Phone,
  Award,
} from "lucide-react";
import Link from "next/link";

// Define interface for Doctor
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  rating: number;
  location: string;
  imageUrl: string;
  fallbackInitials: string;
  availability: string;
  consultationFee: number;
  languages: string[];
  about: string;
}

// Doctors data with working image URLs
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Ayurvedic Medicine",
    qualification: "BAMS, MD (Ayurveda)",
    experience: 15,
    rating: 4.9,
    location: "Delhi, India",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    fallbackInitials: "RK",
    availability: "Mon-Fri, 9 AM - 6 PM",
    consultationFee: 800,
    languages: ["Hindi", "English"],
    about:
      "Specialist in traditional Ayurvedic treatments with focus on holistic wellness and natural healing.",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Nutritionist & Dietitian",
    qualification: "MSc Nutrition, RD",
    experience: 12,
    rating: 4.8,
    location: "Mumbai, India",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    fallbackInitials: "PS",
    availability: "Tue-Sat, 10 AM - 7 PM",
    consultationFee: 1200,
    languages: ["Hindi", "English", "Marathi"],
    about:
      "Expert in personalized nutrition plans and weight management with 12+ years of clinical experience.",
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    specialization: "Homeopathy",
    qualification: "BHMS, MD (Homeopathy)",
    experience: 18,
    rating: 4.7,
    location: "Ahmedabad, India",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop",
    fallbackInitials: "AP",
    availability: "Mon-Sat, 8 AM - 5 PM",
    consultationFee: 600,
    languages: ["Hindi", "English", "Gujarati"],
    about:
      "Senior homeopathic practitioner specializing in chronic diseases and constitutional treatment.",
  },
  {
    id: 4,
    name: "Dr. Meera Singh",
    specialization: "Yoga Therapy",
    qualification: "PhD Yoga Science, E-RYT 500",
    experience: 10,
    rating: 4.9,
    location: "Rishikesh, India",
    imageUrl:
      "https://images.unsplash.com/photo-1594824883303-aef7c5324f7c?q=80&w=400&auto=format&fit=crop",
    fallbackInitials: "MS",
    availability: "Daily, 6 AM - 8 PM",
    consultationFee: 1000,
    languages: ["Hindi", "English", "Sanskrit"],
    about:
      "Certified yoga therapist with expertise in therapeutic yoga for stress management and physical wellness.",
  },
  {
    id: 5,
    name: "Dr. Vikash Gupta",
    specialization: "Naturopathy",
    qualification: "BNYS, ND",
    experience: 8,
    rating: 4.6,
    location: "Pune, India",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    fallbackInitials: "VG",
    availability: "Mon-Fri, 9 AM - 6 PM",
    consultationFee: 900,
    languages: ["Hindi", "English", "Marathi"],
    about:
      "Natural healing expert focusing on detoxification, lifestyle modification and preventive healthcare.",
  },
  {
    id: 6,
    name: "Dr. Kavita Rao",
    specialization: "Fitness & Wellness Coach",
    qualification: "MSc Sports Science, ACE Certified",
    experience: 7,
    rating: 4.8,
    location: "Bangalore, India",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=400&auto=format&fit=crop",
    fallbackInitials: "KR",
    availability: "Mon-Sat, 6 AM - 9 PM",
    consultationFee: 1500,
    languages: ["Hindi", "English", "Kannada"],
    about:
      "Certified fitness expert specializing in holistic wellness programs and lifestyle transformation.",
  },
];

const OurDoctorsPage: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (doctorId: number): void => {
    setImageErrors((prev) => ({ ...prev, [doctorId]: true }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 text-center overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent">
              Meet Our Expert Doctors
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Connect with certified healthcare professionals who are passionate
            about your wellness journey. Our doctors specialize in holistic and
            natural healing approaches.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-[#ea8f39] mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-300">
                Expert Doctors
              </div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[#ea8f39] mb-2">
                10,000+
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Happy Patients
              </div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[#ea8f39] mb-2">15+</div>
              <div className="text-slate-600 dark:text-slate-300">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {doctorsData.map((doctor: Doctor) => (
            <div
              key={doctor.id}
              className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Doctor Image */}
              <div className="relative h-64 w-full">
                {!imageErrors[doctor.id] ? (
                  <Image
                    src={doctor.imageUrl}
                    alt={`Portrait of ${doctor.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => handleImageError(doctor.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#bed16b] to-[#ea8f39] flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl font-bold mb-2">
                        {doctor.fallbackInitials}
                      </div>
                      <p className="text-xl font-semibold">{doctor.name}</p>
                    </div>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-sm">{doctor.rating}</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-card-foreground mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-[#ea8f39] font-semibold">
                    {doctor.specialization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {doctor.qualification}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(doctor.rating)}</div>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.rating}/5.0)
                  </span>
                </div>

                {/* Experience & Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-[#bed16b]" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#bed16b]" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#bed16b]" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Languages:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {doctor.about}
                </p>

                {/* Consultation Fee */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Consultation Fee:</span>
                  <span className="text-lg font-bold text-[#ea8f39]">
                    ₹{doctor.consultationFee}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </button>
                  <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can&apos;t Find the Right Doctor?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our wellness experts can help you find the perfect healthcare
            professional for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white font-semibold rounded-full hover:from-[#a8c55a] hover:to-[#d67d2a] transition-all duration-300 transform hover:scale-105">
              Get Personalized Recommendations
            </button>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-[#bed16b] text-[#bed16b] font-semibold rounded-full hover:bg-[#bed16b] hover:text-white transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurDoctorsPage;
