"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HeartPulse,
  Users,
  Lightbulb,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import CommonHero from "@/components/common/common-hero"; 

// Define interfaces for TypeScript
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  fallbackUrl: string;
}

interface CoreValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Team members data with working image URLs
const teamMembers: TeamMember[] = [
  {
    name: "Dr. Anya Sharma",
    role: "Founder & Chief Wellness Officer",
    bio: "With over 15 years in holistic medicine, Dr. Sharma founded Wellness Fuel to make personalized health accessible.",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop",
    fallbackUrl: "https://via.placeholder.com/400x400/bed16b/ffffff?text=AS",
  },
  {
    name: "Rohan Verma",
    role: "Head of Technology",
    bio: "Rohan is the architect behind our innovative platform, ensuring a seamless and secure experience for all our users.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    fallbackUrl: "https://via.placeholder.com/400x400/bed16b/ffffff?text=RV",
  },
  {
    name: "Priya Singh",
    role: "Lead Nutritionist",
    bio: "Priya leads our team of expert doctors, crafting personalized plans that deliver real results and sustainable habits.",
    imageUrl:
      "https://images.unsplash.com/photo-1594824883303-aef7c5324f7c?q=80&w=400&auto=format&fit=crop",
    fallbackUrl: "https://via.placeholder.com/400x400/bed16b/ffffff?text=PS",
  },
];

// Core values data
const coreValues: CoreValue[] = [
  {
    icon: <Target className="w-10 h-10 text-[#bed16b]" />,
    title: "Personalization First",
    description:
      "Every solution is tailored to your unique body and lifestyle because health is not one-size-fits-all.",
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-[#bed16b]" />,
    title: "Expert-Driven",
    description:
      "Our platform is backed by certified doctors, nutritionists, and wellness experts you can trust.",
  },
  {
    icon: <Users className="w-10 h-10 text-[#bed16b]" />,
    title: "Community & Support",
    description:
      "Join a vibrant community dedicated to supporting each other on the path to better health.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-[#bed16b]" />,
    title: "Constant Innovation",
    description:
      "We are always exploring new ways to make your wellness journey more effective and enjoyable.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#bed16b]" />,
    title: "Trust & Transparency",
    description:
      "Your health and data are sacred. We are committed to the highest standards of privacy and ethical practice.",
  },
];

const AboutPage: React.FC = () => {
  const [storyImageError, setStoryImageError] = useState<boolean>(false);
  const [teamImageErrors, setTeamImageErrors] = useState<
    Record<string, boolean>
  >({});

  const handleStoryImageError = (): void => {
    setStoryImageError(true);
  };

  const handleTeamImageError = (memberName: string): void => {
    setTeamImageErrors((prev) => ({ ...prev, [memberName]: true }));
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <CommonHero
        title="About Us"
        breadcrumbs={[
          { label: "About Us", href: "/about" },
        ]}
        description="We are a team of dedicated professionals who are passionate about helping people achieve their health goals."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=800&auto=format&fit=crop"
      />
      <section className="relative pt-24 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-900 opacity-60"></div>
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent">
              Fueling a Healthier Tomorrow
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            At Wellness Fuel, we are on a mission to revolutionize personal
            health. We connect you with expert guidance, personalized solutions,
            and a supportive community to help you transform your health
            journey.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-4">
                Our Story
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Wellness Fuel was born from a simple idea: everyone deserves
                access to personalized, credible, and holistic health guidance.
                In a world filled with conflicting information, we saw the need
                for a single, trustworthy platform that simplifies the path to
                well-being.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                We started by bringing together a diverse team of doctors,
                technologists, and wellness enthusiasts. Today, we are proud to
                have helped thousands of individuals build sustainable, healthy
                habits for life.
              </p>
            </div>
            <div className="order-1 md:order-2 h-80 md:h-full relative rounded-xl shadow-2xl overflow-hidden">
              {!storyImageError ? (
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=800&auto=format&fit=crop"
                  alt="Doctor working on a laptop, representing the tech and health fusion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={handleStoryImageError}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#bed16b] to-[#ea8f39] flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <HeartPulse className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Our Story</h3>
                    <p className="text-lg opacity-90">Health & Technology</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Our Core Values
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value: CoreValue, index: number) => (
              <div
                key={`${value.title}-${index}`}
                className="p-6 bg-card rounded-xl shadow-lg border border-border transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Meet The Team
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              The passionate minds behind Wellness Fuel.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {teamMembers.map((member: TeamMember, index: number) => (
              <div key={`${member.name}-${index}`} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  {!teamImageErrors[member.name] ? (
                    <Image
                      src={member.imageUrl}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      sizes="160px"
                      onError={() => handleTeamImageError(member.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#bed16b] to-[#ea8f39] flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {member.name}
                </h3>
                <p className="text-md font-semibold text-[#ea8f39] mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#bed16b]/80 to-[#ea8f39]/80 rounded-xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of others who are transforming their lives with
              Wellness Fuel. Get started today and discover a healthier, happier
              you.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-white text-slate-800 font-semibold rounded-full shadow-lg hover:bg-slate-100 transition-transform duration-300 transform hover:scale-105"
            >
              Explore Our Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
