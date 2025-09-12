import React from 'react'
import { Users, Award, Clock, Heart } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Patients",
      description: "Trusted by thousands of patients worldwide"
    },
    {
      icon: Award,
      number: "500+",
      label: "Expert Doctors",
      description: "Board-certified medical professionals"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available",
      description: "Round-the-clock medical assistance"
    },
    {
      icon: Heart,
      number: "99.9%",
      label: "Patient Satisfaction",
      description: "Consistently high satisfaction ratings"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Our platform has transformed healthcare delivery, connecting patients with world-class 
            medical professionals and delivering exceptional outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="w-20 h-20 bg-white/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/40 transition-all duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-white mb-3">
                  {stat.label}
                </div>
                <div className="text-white/80 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
            <Heart className="w-5 h-5" />
            <span>Join thousands of satisfied patients</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection