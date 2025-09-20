"use client";

import React from "react";
import { Users, Award, Clock, Heart } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Patients",
      description: "Trusted by a thriving community worldwide.",
    },
    {
      icon: Award,
      number: "500+",
      label: "Expert Doctors",
      description: "Board-certified and experienced professionals.",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available",
      description: "Round-the-clock assistance for all your needs.",
    },
    {
      icon: Heart,
      number: "99.9%",
      label: "Patient Satisfaction",
      description: "Consistently high ratings from our patients.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white rounded-full animate-pulse delay-200"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Our platform has transformed healthcare delivery, connecting
            patients with world-class medical professionals and delivering
            exceptional outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              {/* --- CARD MEIN BADLAV KIYA GAYA HAI --- */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 hover:bg-white/20 shadow-2xl border border-white/20">
                {/* --- ICON CONTAINER MEIN BADLAV KIYA GAYA HAI --- */}
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  {/* --- ICON MEIN BADLAV KIYA GAYA HAI --- */}
                  <stat.icon className="w-10 h-10 text-white" />
                </div>

                {/* --- NUMBER MEIN BADLAV KIYA GAYA HAI --- */}
                <div className="text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                  {stat.number}
                </div>

                {/* --- LABEL MEIN BADLAV KIYA GAYA HAI --- */}
                <div className="text-xl font-bold text-white/90 mb-3">
                  {stat.label}
                </div>

                <div className="text-white/70 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- ADDITIONAL INFO MEIN BADLAV KIYA GAYA HAI --- */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold border border-white/20">
            <Heart className="w-5 h-5 text-red-400 fill-current" />
            <span>Join thousands of satisfied patients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
