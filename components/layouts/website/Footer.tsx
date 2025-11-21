"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Shield,
  Award,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Redux Imports
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  createNewsletter,
  selectNewslettersLoading,
} from "@/lib/redux/features/newsletterSlice";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectNewslettersLoading);

  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = (await dispatch(
      createNewsletter(email)
    )) as unknown as boolean;
    if (success) {
      setEmail("");
      alert("Successfully subscribed to our newsletter!");
    } else {
      alert("Subscription failed. Please try again.");
    }
  };

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    services: [
      { label: "Health Checkup", href: "/services/checkup" },
      { label: "Telemedicine", href: "/services/telemedicine" },
      { label: "Emergency Care", href: "/services/emergency" },
      { label: "Mental Health", href: "/services/mental-health" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Live Chat", href: "/chat" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "HIPAA Compliance", href: "/hipaa" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 border border-primary/20">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Join Our Wellness Community
              </h3>
              <p className="text-slate-300">
                Subscribe to our newsletter for expert health tips, wellness
                guides, and exclusive offers delivered straight to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder-slate-400 min-w-[280px]"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-xs text-slate-500 mt-3 text-center lg:text-left">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info & Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <Image
                src="/logo.jpeg"
                alt="Wellness Fuel"
                width={140}
                height={45}
                className="object-contain transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
            </Link>

            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Transform your health journey with personalized wellness
              solutions, expert medical care, and a community dedicated to your
              wellbeing.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@wellnessfuel.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Health Street, Wellness City, WC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">HIPAA Compliant</h4>
                <p className="text-sm text-slate-400">Your data is secure</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Certified Doctors</h4>
                <p className="text-sm text-slate-400">Licensed professionals</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">24/7 Support</h4>
                <p className="text-sm text-slate-400">Always here for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>
                &copy; {currentYear} Wellness Fuel. All rights reserved.
                Developed by{" "}
                <a
                  href="https://github.com/cmtai"
                  className="text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  CMTAI
                </a>
              </span>
              <Heart className="w-4 h-4 text-primary fill-current" />
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
