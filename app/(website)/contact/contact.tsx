"use client"
import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonHero from "@/components/common/common-hero";

// Redux Imports
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { createLead, selectLeadsLoading } from "@/lib/redux/features/leadSlice";

const Contact = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLeadsLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data object matching your Lead interface
    const newLeadData = {
      ...formData,
      status: "New", // Default status for web inquiries
      priority: "Medium", // Default priority
      source: "Website Contact Form",
      estimatedValue: 0,
    };

    try {
      // Dispatch the createLead action
      const success = await dispatch(createLead(newLeadData));

      if (success) {
        alert("Message sent successfully! Our team will contact you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred.");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@wellnessfuel.com", "support@wellnessfuel.com"],
      description: "Send us an email anytime",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "123 Health Street",
        "Wellness City, WC 12345",
        "United States",
      ],
      description: "Visit our main office",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Mon - Fri: 8:00 AM - 8:00 PM",
        "Sat: 9:00 AM - 6:00 PM",
        "Sun: 10:00 AM - 4:00 PM",
      ],
      description: "We're here to help you",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Appointment Booking",
    "Technical Support",
    "Billing Question",
    "Emergency Care",
    "Pharmacy Services",
    "Feedback",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950">
      {/* Header */}
      <CommonHero
        title="Contact Us"
        description="Get in touch with our team. We're here to help you with all your healthcare needs."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=800&auto=format&fit=crop"
        breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
      />

      {/* Intro Text */}
      <div className="pt-12 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          We'd Love to Hear From You
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Whether you have a question about features, pricing, need a demo, or
          anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-8">
              Get in Touch
            </h2>

            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/40">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1 mb-2">
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-slate-600 dark:text-slate-400"
                        >
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
                For medical emergencies, please call 911 or visit your nearest
                emergency room.
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-8">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white disabled:opacity-50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white disabled:opacity-50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white disabled:opacity-50"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#ea8f39] focus:border-transparent dark:bg-slate-800 dark:text-white disabled:opacity-50"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 text-white py-3 text-lg font-semibold rounded-full shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/60 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-8 text-center">
            Find Us
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Wellness Fuel Headquarters
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  123 Health Street, Wellness City, WC 12345
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Google Maps integration would be implemented here
                </p>
                <Button className="mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 text-white rounded-full shadow-xl shadow-blue-500/50">
                  <MapPin className="mr-2 w-4 h-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-200/50 dark:border-blue-700/30">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Chat with our support team in real-time
            </p>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
            >
              Start Chat
            </Button>
          </div>

          <div className="text-center p-6 bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-200/50 dark:border-blue-700/30">
            <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Call Center
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Speak directly with our healthcare professionals
            </p>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
            >
              Call Now
            </Button>
          </div>

          <div className="text-center p-6 bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-200/50 dark:border-blue-700/30">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Get detailed responses within 24 hours
            </p>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact