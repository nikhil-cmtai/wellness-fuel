import React from 'react'
import { Star, MapPin, Calendar, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DoctorsSection = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      patients: "2,500+",
      location: "New York, NY",
      image: "/api/placeholder/200/200",
      availability: "Available Today",
      languages: ["English", "Spanish"],
      education: "Harvard Medical School"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.8,
      patients: "1,800+",
      location: "Los Angeles, CA",
      image: "/api/placeholder/200/200",
      availability: "Available Tomorrow",
      languages: ["English", "Mandarin"],
      education: "Stanford Medical School"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10 years",
      rating: 4.9,
      patients: "3,200+",
      location: "Miami, FL",
      image: "/api/placeholder/200/200",
      availability: "Available Today",
      languages: ["English", "Spanish", "Portuguese"],
      education: "Johns Hopkins Medical School"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.7,
      patients: "2,100+",
      location: "Chicago, IL",
      image: "/api/placeholder/200/200",
      availability: "Available Next Week",
      languages: ["English"],
      education: "Mayo Clinic Medical School"
    },
    {
      name: "Dr. Lisa Thompson",
      specialty: "Dermatologist",
      experience: "14 years",
      rating: 4.8,
      patients: "2,800+",
      location: "Seattle, WA",
      image: "/api/placeholder/200/200",
      availability: "Available Today",
      languages: ["English", "French"],
      education: "UCLA Medical School"
    },
    {
      name: "Dr. Amanda Foster",
      specialty: "Psychiatrist",
      experience: "11 years",
      rating: 4.9,
      patients: "1,900+",
      location: "Boston, MA",
      image: "/api/placeholder/200/200",
      availability: "Available Tomorrow",
      languages: ["English", "German"],
      education: "Yale Medical School"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Meet Our</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">Expert Doctors</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our team of board-certified medical professionals is dedicated to providing you with 
            the highest quality healthcare services and personalized treatment plans.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {/* Doctor Image & Availability */}
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center mx-auto text-white text-4xl font-bold">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  doctor.availability.includes('Today') 
                    ? 'bg-green-100 text-green-800' 
                    : doctor.availability.includes('Tomorrow')
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {doctor.availability}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {doctor.name}
                </h3>
                <p className="text-[#ea8f39] font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{doctor.education}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-[#ea8f39] fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {doctor.rating} ({doctor.patients} patients)
                  </span>
                </div>

                {/* Location & Experience */}
                <div className="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{doctor.experience}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Languages: {doctor.languages.join(', ')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white py-2 text-sm font-semibold rounded-full transition-all duration-300">
                  Book Appointment
                </Button>
                <Button variant="outline" className="px-4 py-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all duration-300">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Can&apos;t Find the Right Doctor?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team can help you find the perfect specialist for your needs. 
              We have access to thousands of qualified doctors across all specialties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-3 bg-white text-[#ea8f39] font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                Find a Doctor
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#ea8f39] transition-all duration-300 transform hover:scale-105">
                View All Specialties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorsSection
