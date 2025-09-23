"use client"
import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommonHero from "@/components/common/common-hero";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@wellnessfuel.com", "support@wellnessfuel.com"],
      description: "Send us an email anytime"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Health Street", "Wellness City, WC 12345", "United States"],
      description: "Visit our main office"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat: 9:00 AM - 6:00 PM", "Sun: 10:00 AM - 4:00 PM"],
      description: "We're here to help you"
    }
  ]

  const subjects = [
    "General Inquiry",
    "Appointment Booking",
    "Technical Support",
    "Billing Question",
    "Emergency Care",
    "Pharmacy Services",
    "Feedback",
    "Other"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <CommonHero
        title="Contact Us"
        description="Get in touch with our team. We're here to help you with all your healthcare needs."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=800&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Contact Us", href: "/contact" },
        ]}
      />
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get in touch with our team. We&apos;re here to help you with all your healthcare needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1 mb-2">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-slate-600 dark:text-slate-400">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Emergency Contact
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                For medical emergencies, please call 911 or visit your nearest emergency room.
              </p>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="text-red-800 dark:text-red-200 font-semibold">
                  Emergency Hotline: +1 (555) 911-HELP
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#ea8f39] focus:border-transparent dark:bg-slate-800 dark:text-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#ea8f39] focus:border-transparent dark:bg-slate-800 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#ea8f39] focus:border-transparent dark:bg-slate-800 dark:text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#ea8f39] focus:border-transparent dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#ea8f39] focus:border-transparent dark:bg-slate-800 dark:text-white"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Send className="mr-2 w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Find Us
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#ea8f39] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Wellness Fuel Headquarters
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  123 Health Street, Wellness City, WC 12345
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Google Maps integration would be implemented here
                </p>
                <Button className="mt-4 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white">
                  <MapPin className="mr-2 w-4 h-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <MessageCircle className="w-12 h-12 text-[#ea8f39] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Chat with our support team in real-time
            </p>
            <Button variant="outline" className="border-[#ea8f39] text-[#ea8f39] hover:bg-[#ea8f39] hover:text-white">
              Start Chat
            </Button>
          </div>

          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <Phone className="w-12 h-12 text-[#ea8f39] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Call Center
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Speak directly with our healthcare professionals
            </p>
            <Button variant="outline" className="border-[#ea8f39] text-[#ea8f39] hover:bg-[#ea8f39] hover:text-white">
              Call Now
            </Button>
          </div>

          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <Mail className="w-12 h-12 text-[#ea8f39] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Get detailed responses within 24 hours
            </p>
            <Button variant="outline" className="border-[#ea8f39] text-[#ea8f39] hover:bg-[#ea8f39] hover:text-white">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact