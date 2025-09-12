import React from 'react'
import { ArrowRight, CheckCircle, Pill, Heart, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProductSection = () => {
  const products = [
    {
      title: "Prescription Medications",
      description: "Get your prescribed medications delivered directly to your doorstep with our secure pharmacy service.",
      features: [
        "FDA approved medications",
        "Free home delivery",
        "Prescription verification",
        "Insurance coverage support"
      ],
      price: "From $15",
      popular: false,
      icon: Pill,
      image: "/api/placeholder/200/200"
    },
    {
      title: "Wellness Supplements",
      description: "Premium quality vitamins, minerals, and health supplements to support your wellness journey.",
      features: [
        "Natural ingredients",
        "Third-party tested",
        "Customized recommendations",
        "30-day money back"
      ],
      price: "From $25",
      popular: true,
      icon: Heart,
      image: "/api/placeholder/200/200"
    },
    {
      title: "First Aid Kits",
      description: "Comprehensive first aid supplies for home, office, and travel emergency situations.",
      features: [
        "Complete medical supplies",
        "Portable design",
        "Emergency guide included",
        "Refillable components"
      ],
      price: "From $35",
      popular: false,
      icon: Shield,
      image: "/api/placeholder/200/200"
    },
    {
      title: "Health Monitors",
      description: "Advanced health monitoring devices to track your vital signs and wellness metrics.",
      features: [
        "Real-time monitoring",
        "Mobile app integration",
        "Data export capabilities",
        "Professional grade accuracy"
      ],
      price: "From $89",
      popular: false,
      icon: Zap,
      image: "/api/placeholder/200/200"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Our</span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent ml-4">Products</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover our premium pharmacy products and health essentials designed to support 
            your wellness journey with quality and convenience.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <div key={index} className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${product.popular ? 'ring-2 ring-[#ea8f39]' : ''}`}>
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Product Image */}
              <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl mb-4 flex items-center justify-center">
                <product.icon className="w-16 h-16 text-[#ea8f39]" />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {product.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ea8f39] flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 text-xs">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {product.price}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-xs">
                  starting price
                </div>
              </div>

              {/* CTA Button */}
              <Button className={`w-full py-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                product.popular 
                  ? 'bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}>
                Add to Cart
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Need a Custom Product?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Our pharmacy team can help you find specialized medications and health products. 
              Contact us for personalized recommendations and bulk orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contact Pharmacy
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 px-8 py-3 font-semibold rounded-full transition-all duration-300">
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
