import React from 'react'
import { Heart, Users, Award, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Tailored health solutions designed specifically for your unique needs and lifestyle."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Board-certified doctors and wellness professionals dedicated to your health journey."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Evidence-based treatments and wellness programs with measurable outcomes."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "HIPAA-compliant platform ensuring your health data is always protected."
    }
  ]

  const stats = [
    { number: "10K+", label: "Happy Patients" },
    { number: "500+", label: "Expert Doctors" },
    { number: "50+", label: "Specialties" },
    { number: "99.9%", label: "Success Rate" }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">About</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">Wellness Fuel</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We&apos;re revolutionizing healthcare by combining cutting-edge technology with compassionate care, 
            making wellness accessible to everyone, everywhere.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Transforming Healthcare Through Innovation
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              At Wellness Fuel, we believe that everyone deserves access to high-quality healthcare. 
              Our platform connects patients with world-class doctors, provides personalized wellness 
              programs, and offers 24/7 support to ensure your health journey is smooth and successful.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Comprehensive health assessments",
                "Personalized treatment plans",
                "24/7 telemedicine support",
                "Mental health and wellness programs",
                "Emergency care coordination"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ea8f39] flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Learn More About Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection