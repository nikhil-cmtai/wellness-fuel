'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List, 
  Edit, 
  Trash2, 
  Package,
  DollarSign,
  TrendingUp,
  Star,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'

// Dummy data
const dummyProducts = [
  {
    id: 1,
    name: "Premium Protein Powder",
    category: "Supplements",
    price: 49.99,
    originalPrice: 59.99,
    stock: 150,
    rating: 4.8,
    status: "active",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop",
    shortDescription: "High-quality protein powder for muscle building",
    longDescription: "Our premium protein powder is made from the finest whey protein isolate, providing 25g of protein per serving. Perfect for post-workout recovery and muscle building. Contains all essential amino acids and is easily digestible.",
    benefits: [
      "Builds lean muscle mass",
      "Supports post-workout recovery", 
      "Contains all essential amino acids",
      "Easy to digest and mix",
      "No artificial flavors or colors"
    ],
    ingredients: "Whey Protein Isolate, Natural Vanilla Flavor, Stevia, Xanthan Gum",
    dosage: "1 scoop (30g) mixed with water or milk, 1-2 times daily",
    weight: "2.2 lbs (1kg)",
    expiryDate: "2025-12-31",
    manufacturer: "Wellness Fuel Labs",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Organic Green Tea",
    category: "Beverages",
    price: 12.99,
    originalPrice: 15.99,
    stock: 75,
    rating: 4.6,
    status: "active",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    shortDescription: "Premium organic green tea for health benefits",
    longDescription: "Hand-picked organic green tea leaves from the finest gardens. Rich in antioxidants and natural compounds that support overall health and wellness. Delicate flavor with a smooth finish.",
    benefits: [
      "Rich in antioxidants",
      "Supports heart health",
      "Boosts metabolism",
      "Natural energy without jitters",
      "Supports immune system"
    ],
    ingredients: "100% Organic Green Tea Leaves",
    dosage: "1 tea bag per cup, steep for 2-3 minutes",
    weight: "50 tea bags (100g)",
    expiryDate: "2025-06-30",
    manufacturer: "Organic Wellness Co.",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Vitamin D3 Capsules",
    category: "Vitamins",
    price: 24.99,
    originalPrice: 29.99,
    stock: 0,
    rating: 4.7,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    shortDescription: "Essential vitamin D3 for bone health",
    longDescription: "High-potency Vitamin D3 supplement to support bone health, immune function, and overall wellness. Each capsule provides 2000 IU of Vitamin D3 in an easy-to-absorb form.",
    benefits: [
      "Supports bone and teeth health",
      "Boosts immune system",
      "Improves mood and energy",
      "Supports muscle function",
      "Easy to absorb form"
    ],
    ingredients: "Vitamin D3 (Cholecalciferol), Extra Virgin Olive Oil, Gelatin Capsule",
    dosage: "1 capsule daily with food",
    weight: "60 capsules",
    expiryDate: "2025-03-15",
    manufacturer: "Health Plus Supplements",
    createdAt: "2024-01-10"
  },
  {
    id: 4,
    name: "Omega-3 Fish Oil",
    category: "Supplements",
    price: 34.99,
    originalPrice: 39.99,
    stock: 200,
    rating: 4.9,
    status: "active",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop",
    shortDescription: "Pure fish oil for heart and brain health",
    longDescription: "Premium fish oil supplement sourced from wild-caught fish. High in EPA and DHA omega-3 fatty acids to support heart, brain, and joint health. Molecularly distilled for purity.",
    benefits: [
      "Supports heart health",
      "Promotes brain function",
      "Reduces inflammation",
      "Supports joint mobility",
      "Molecularly distilled for purity"
    ],
    ingredients: "Fish Oil, EPA, DHA, Natural Lemon Flavor, Vitamin E",
    dosage: "2 softgels daily with meals",
    weight: "120 softgels",
    expiryDate: "2025-08-20",
    manufacturer: "Pure Health Solutions",
    createdAt: "2024-01-25"
  },
  {
    id: 5,
    name: "Multivitamin Complex",
    category: "Vitamins",
    price: 19.99,
    originalPrice: 24.99,
    stock: 100,
    rating: 4.5,
    status: "active",
    image: "https://images.unsplash.com/photo-1584017911766-df565594c4e4?w=300&h=300&fit=crop",
    shortDescription: "Complete multivitamin for daily nutrition",
    longDescription: "Comprehensive multivitamin formula with 25 essential vitamins and minerals. Designed to fill nutritional gaps and support overall health and energy levels throughout the day.",
    benefits: [
      "25 essential vitamins and minerals",
      "Supports daily energy levels",
      "Fills nutritional gaps",
      "Supports immune function",
      "Easy-to-swallow tablets"
    ],
    ingredients: "Vitamin A, C, D, E, B-Complex, Iron, Zinc, Magnesium, and 18 other nutrients",
    dosage: "1 tablet daily with breakfast",
    weight: "90 tablets",
    expiryDate: "2025-05-10",
    manufacturer: "Complete Nutrition Inc.",
    createdAt: "2024-01-18"
  },
  {
    id: 6,
    name: "Herbal Sleep Aid",
    category: "Wellness",
    price: 16.99,
    originalPrice: 19.99,
    stock: 50,
    rating: 4.3,
    status: "active",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop",
    shortDescription: "Natural herbal blend for better sleep",
    longDescription: "Gentle herbal sleep aid combining chamomile, valerian root, and melatonin. Promotes relaxation and helps you fall asleep faster while supporting natural sleep cycles.",
    benefits: [
      "Promotes natural sleep",
      "Reduces time to fall asleep",
      "Non-habit forming",
      "Gentle herbal formula",
      "Supports sleep quality"
    ],
    ingredients: "Chamomile, Valerian Root, Melatonin, Passionflower, Lemon Balm",
    dosage: "2 capsules 30 minutes before bedtime",
    weight: "60 capsules",
    expiryDate: "2025-07-15",
    manufacturer: "Natural Sleep Solutions",
    createdAt: "2024-01-22"
  },
  {
    id: 7,
    name: "Vitamin C Complex",
    category: "Vitamins",
    price: 18.99,
    originalPrice: 22.99,
    stock: 120,
    rating: 4.6,
    status: "active",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop",
    shortDescription: "High-potency vitamin C for immune support",
    longDescription: "Premium vitamin C supplement with bioflavonoids for enhanced absorption. Supports immune system function and provides antioxidant protection.",
    benefits: [
      "Boosts immune system",
      "Antioxidant protection",
      "Enhanced absorption",
      "Supports collagen production",
      "Natural bioflavonoids"
    ],
    ingredients: "Vitamin C, Bioflavonoids, Rose Hips, Acerola Cherry",
    dosage: "1 tablet daily with food",
    weight: "90 tablets",
    expiryDate: "2025-09-20",
    manufacturer: "Immune Health Co.",
    createdAt: "2024-01-28"
  },
  {
    id: 8,
    name: "Probiotic Blend",
    category: "Supplements",
    price: 29.99,
    originalPrice: 34.99,
    stock: 80,
    rating: 4.7,
    status: "active",
    image: "https://images.unsplash.com/photo-1584017911766-df565594c4e4?w=300&h=300&fit=crop",
    shortDescription: "Multi-strain probiotic for digestive health",
    longDescription: "Advanced probiotic formula with 50 billion CFU of beneficial bacteria. Supports digestive health, immune function, and overall wellness.",
    benefits: [
      "50 billion CFU",
      "Multiple probiotic strains",
      "Supports digestive health",
      "Boosts immune function",
      "Shelf-stable formula"
    ],
    ingredients: "Lactobacillus, Bifidobacterium, Prebiotic Fiber, Vegetable Capsule",
    dosage: "1 capsule daily on empty stomach",
    weight: "60 capsules",
    expiryDate: "2025-11-15",
    manufacturer: "Gut Health Labs",
    createdAt: "2024-02-01"
  },
  {
    id: 9,
    name: "Magnesium Glycinate",
    category: "Supplements",
    price: 22.99,
    originalPrice: 26.99,
    stock: 0,
    rating: 4.8,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    shortDescription: "Highly absorbable magnesium for relaxation",
    longDescription: "Premium magnesium glycinate for optimal absorption. Supports muscle relaxation, sleep quality, and overall stress management.",
    benefits: [
      "Highly absorbable form",
      "Supports muscle relaxation",
      "Improves sleep quality",
      "Reduces stress and anxiety",
      "Gentle on stomach"
    ],
    ingredients: "Magnesium Glycinate, Vegetable Capsule",
    dosage: "2 capsules before bedtime",
    weight: "120 capsules",
    expiryDate: "2025-08-30",
    manufacturer: "Relaxation Wellness",
    createdAt: "2024-02-05"
  },
  {
    id: 10,
    name: "Turmeric Curcumin",
    category: "Supplements",
    price: 24.99,
    originalPrice: 29.99,
    stock: 90,
    rating: 4.5,
    status: "active",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    shortDescription: "Anti-inflammatory turmeric with black pepper",
    longDescription: "High-potency turmeric extract with curcumin and black pepper for enhanced absorption. Supports joint health and reduces inflammation.",
    benefits: [
      "High curcumin content",
      "Enhanced absorption",
      "Anti-inflammatory properties",
      "Supports joint health",
      "Natural black pepper extract"
    ],
    ingredients: "Turmeric Extract, Curcumin, Black Pepper Extract, Vegetable Capsule",
    dosage: "1 capsule twice daily with meals",
    weight: "90 capsules",
    expiryDate: "2025-10-12",
    manufacturer: "Natural Anti-Inflammatory Co.",
    createdAt: "2024-02-08"
  },
  {
    id: 11,
    name: "Green Tea Extract",
    category: "Beverages",
    price: 15.99,
    originalPrice: 18.99,
    stock: 60,
    rating: 4.4,
    status: "active",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    shortDescription: "Concentrated green tea for metabolism",
    longDescription: "Premium green tea extract standardized for EGCG content. Supports metabolism, provides antioxidants, and promotes overall wellness.",
    benefits: [
      "Standardized EGCG content",
      "Supports metabolism",
      "Rich in antioxidants",
      "Natural energy boost",
      "Supports weight management"
    ],
    ingredients: "Green Tea Extract, EGCG, Vegetable Capsule",
    dosage: "1 capsule twice daily with meals",
    weight: "60 capsules",
    expiryDate: "2025-06-25",
    manufacturer: "Metabolism Boost Inc.",
    createdAt: "2024-02-12"
  },
  {
    id: 12,
    name: "Zinc Picolinate",
    category: "Vitamins",
    price: 12.99,
    originalPrice: 15.99,
    stock: 100,
    rating: 4.6,
    status: "active",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    shortDescription: "Highly bioavailable zinc for immune support",
    longDescription: "Premium zinc picolinate for optimal absorption. Essential for immune function, wound healing, and overall health.",
    benefits: [
      "Highly bioavailable form",
      "Supports immune function",
      "Essential for wound healing",
      "Supports skin health",
      "Easy to absorb"
    ],
    ingredients: "Zinc Picolinate, Vegetable Capsule",
    dosage: "1 capsule daily with food",
    weight: "90 capsules",
    expiryDate: "2025-07-18",
    manufacturer: "Immune Support Labs",
    createdAt: "2024-02-15"
  },
  {
    id: 13,
    name: "Ashwagandha Root",
    category: "Wellness",
    price: 19.99,
    originalPrice: 23.99,
    stock: 70,
    rating: 4.7,
    status: "active",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop",
    shortDescription: "Adaptogenic herb for stress management",
    longDescription: "Premium ashwagandha root extract standardized for withanolides. Supports stress management, energy levels, and overall well-being.",
    benefits: [
      "Adaptogenic properties",
      "Supports stress management",
      "Boosts energy levels",
      "Supports adrenal health",
      "Standardized extract"
    ],
    ingredients: "Ashwagandha Root Extract, Withanolides, Vegetable Capsule",
    dosage: "1 capsule twice daily with meals",
    weight: "60 capsules",
    expiryDate: "2025-09-05",
    manufacturer: "Adaptogen Wellness",
    createdAt: "2024-02-18"
  },
  {
    id: 14,
    name: "CoQ10 Supplement",
    category: "Supplements",
    price: 34.99,
    originalPrice: 39.99,
    stock: 40,
    rating: 4.8,
    status: "active",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop",
    shortDescription: "Ubiquinol CoQ10 for heart health",
    longDescription: "Premium ubiquinol CoQ10 for enhanced absorption. Supports heart health, energy production, and cellular function.",
    benefits: [
      "Ubiquinol form for better absorption",
      "Supports heart health",
      "Boosts energy production",
      "Antioxidant protection",
      "Supports cellular function"
    ],
    ingredients: "Ubiquinol CoQ10, MCT Oil, Softgel Capsule",
    dosage: "1 softgel daily with fat-containing meal",
    weight: "60 softgels",
    expiryDate: "2025-12-10",
    manufacturer: "Heart Health Solutions",
    createdAt: "2024-02-22"
  },
  {
    id: 15,
    name: "B-Complex Vitamins",
    category: "Vitamins",
    price: 16.99,
    originalPrice: 19.99,
    stock: 110,
    rating: 4.5,
    status: "active",
    image: "https://images.unsplash.com/photo-1584017911766-df565594c4e4?w=300&h=300&fit=crop",
    shortDescription: "Complete B-vitamin complex for energy",
    longDescription: "Comprehensive B-complex formula with all essential B vitamins. Supports energy metabolism, nervous system function, and overall vitality.",
    benefits: [
      "All essential B vitamins",
      "Supports energy metabolism",
      "Nervous system support",
      "Stress management",
      "Easy to absorb"
    ],
    ingredients: "B1, B2, B3, B5, B6, B7, B9, B12, Vegetable Capsule",
    dosage: "1 capsule daily with breakfast",
    weight: "90 capsules",
    expiryDate: "2025-08-15",
    manufacturer: "Energy Boost Vitamins",
    createdAt: "2024-02-25"
  },
  {
    id: 16,
    name: "Collagen Peptides",
    category: "Supplements",
    price: 39.99,
    originalPrice: 44.99,
    stock: 95,
    rating: 4.7,
    status: "active",
    image: "https://images.unsplash.com/photo-1582719478173-df2d3d6a8d8c?w=300&h=300&fit=crop",
    shortDescription: "Collagen powder for skin, hair, and joints",
    longDescription: "Hydrolyzed collagen peptides sourced from grass-fed bovine. Supports skin elasticity, joint health, and strong hair & nails.",
    benefits: [
      "Supports skin elasticity",
      "Strengthens hair and nails",
      "Promotes joint health",
      "Easily dissolves in hot or cold drinks",
      "No added sugar"
    ],
    ingredients: "Hydrolyzed Collagen Peptides",
    dosage: "1-2 scoops daily in water, coffee, or smoothies",
    weight: "1 lb (454g)",
    expiryDate: "2025-12-01",
    manufacturer: "Beauty & Health Labs",
    createdAt: "2024-03-01"
  },
  {
    id: 17,
    name: "Electrolyte Hydration Mix",
    category: "Wellness",
    price: 21.99,
    originalPrice: 26.99,
    stock: 130,
    rating: 4.6,
    status: "active",
    image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b6d7b3?w=300&h=300&fit=crop",
    shortDescription: "Hydration powder with electrolytes and minerals",
    longDescription: "Electrolyte hydration mix with sodium, potassium, magnesium, and calcium. Perfect for athletes and daily hydration support.",
    benefits: [
      "Replenishes lost electrolytes",
      "Supports hydration",
      "Boosts endurance",
      "Reduces muscle cramps",
      "Refreshing natural flavors"
    ],
    ingredients: "Sodium, Potassium, Magnesium, Calcium, Natural Flavors",
    dosage: "1 packet mixed with 16oz of water as needed",
    weight: "30 packets (300g)",
    expiryDate: "2025-11-10",
    manufacturer: "HydraFuel Co.",
    createdAt: "2024-03-05"
  },
  {
    id: 18,
    name: "Plant-Based Protein",
    category: "Supplements",
    price: 44.99,
    originalPrice: 52.99,
    stock: 85,
    rating: 4.5,
    status: "active",
    image: "https://images.unsplash.com/photo-1609899597593-49f32a7b94b8?w=300&h=300&fit=crop",
    shortDescription: "Vegan protein from peas and brown rice",
    longDescription: "Plant-based protein powder made from peas and brown rice. Provides 22g of protein per serving with a complete amino acid profile.",
    benefits: [
      "100% vegan protein",
      "Complete amino acid profile",
      "Supports muscle growth",
      "Dairy-free & gluten-free",
      "Great taste and mixability"
    ],
    ingredients: "Pea Protein, Brown Rice Protein, Natural Cocoa, Stevia",
    dosage: "1 scoop (30g) mixed with water or almond milk",
    weight: "2 lbs (907g)",
    expiryDate: "2025-09-20",
    manufacturer: "Vegan Nutrition Labs",
    createdAt: "2024-03-08"
  },
  {
    id: 19,
    name: "Herbal Detox Tea",
    category: "Beverages",
    price: 14.99,
    originalPrice: 18.99,
    stock: 70,
    rating: 4.3,
    status: "active",
    image: "https://images.unsplash.com/photo-1518976024611-28bf5f4f9d9d?w=300&h=300&fit=crop",
    shortDescription: "Detoxifying herbal tea blend",
    longDescription: "Natural detox tea made with dandelion root, ginger, and lemongrass. Supports digestion, detoxification, and overall wellness.",
    benefits: [
      "Supports liver health",
      "Aids digestion",
      "Natural detoxification",
      "Caffeine-free",
      "Refreshing herbal flavor"
    ],
    ingredients: "Dandelion Root, Ginger, Lemongrass, Peppermint",
    dosage: "1 tea bag steeped in hot water for 5 minutes",
    weight: "30 tea bags (75g)",
    expiryDate: "2025-07-12",
    manufacturer: "Herbal Wellness Co.",
    createdAt: "2024-03-12"
  },
  {
    id: 20,
    name: "Pre-Workout Formula",
    category: "Supplements",
    price: 36.99,
    originalPrice: 42.99,
    stock: 150,
    rating: 4.4,
    status: "active",
    image: "https://images.unsplash.com/photo-1600180758895-f3be1b5a9e1a?w=300&h=300&fit=crop",
    shortDescription: "Energy and focus boost for workouts",
    longDescription: "Pre-workout supplement with caffeine, beta-alanine, and citrulline malate. Designed to boost energy, focus, and endurance during exercise.",
    benefits: [
      "Enhances workout performance",
      "Boosts energy and focus",
      "Supports endurance",
      "Reduces fatigue",
      "Delicious flavors"
    ],
    ingredients: "Caffeine, Beta-Alanine, Citrulline Malate, Natural Flavors",
    dosage: "1 scoop mixed with water 20-30 minutes before workout",
    weight: "300g",
    expiryDate: "2025-08-05",
    manufacturer: "Athlete Performance Labs",
    createdAt: "2024-03-15"
  },
  {
    id: 21,
    name: "Apple Cider Vinegar Gummies",
    category: "Wellness",
    price: 19.99,
    originalPrice: 24.99,
    stock: 140,
    rating: 4.5,
    status: "active",
    image: "https://images.unsplash.com/photo-1603398938378-447b2a3a6a6e?w=300&h=300&fit=crop",
    shortDescription: "Delicious gummies with apple cider vinegar",
    longDescription: "Apple cider vinegar gummies that support digestion, metabolism, and overall wellness without the harsh taste of liquid vinegar.",
    benefits: [
      "Supports digestion",
      "Boosts metabolism",
      "Promotes detoxification",
      "Delicious gummy form",
      "No artificial sweeteners"
    ],
    ingredients: "Apple Cider Vinegar, Pectin, Natural Flavors",
    dosage: "2 gummies daily with meals",
    weight: "60 gummies",
    expiryDate: "2025-10-18",
    manufacturer: "Wellness Gummies Co.",
    createdAt: "2024-03-18"
  },
  {
    id: 22,
    name: "Glucosamine Chondroitin",
    category: "Supplements",
    price: 29.99,
    originalPrice: 34.99,
    stock: 60,
    rating: 4.6,
    status: "active",
    image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=300&h=300&fit=crop",
    shortDescription: "Joint support supplement with glucosamine",
    longDescription: "Glucosamine and chondroitin supplement to support healthy joints, flexibility, and mobility. Ideal for active lifestyles and aging adults.",
    benefits: [
      "Supports joint health",
      "Improves mobility",
      "Reduces stiffness",
      "Promotes cartilage repair",
      "Trusted joint formula"
    ],
    ingredients: "Glucosamine Sulfate, Chondroitin Sulfate, MSM",
    dosage: "2 tablets daily with meals",
    weight: "120 tablets",
    expiryDate: "2025-11-25",
    manufacturer: "Joint Health Solutions",
    createdAt: "2024-03-21"
  },
  {
    id: 23,
    name: "Spirulina Superfood Powder",
    category: "Wellness",
    price: 27.99,
    originalPrice: 32.99,
    stock: 75,
    rating: 4.7,
    status: "active",
    image: "https://images.unsplash.com/photo-1598971639058-6b43f5e26d0e?w=300&h=300&fit=crop",
    shortDescription: "Nutrient-dense spirulina powder",
    longDescription: "Organic spirulina powder rich in protein, vitamins, and antioxidants. A natural superfood to boost energy and overall wellness.",
    benefits: [
      "Rich in protein and vitamins",
      "Supports immune system",
      "Boosts energy and vitality",
      "Powerful antioxidant",
      "Vegan superfood"
    ],
    ingredients: "100% Organic Spirulina Powder",
    dosage: "1-2 teaspoons daily in smoothies or juice",
    weight: "200g",
    expiryDate: "2025-09-30",
    manufacturer: "Superfood Nutrition Co.",
    createdAt: "2024-03-25"
  }
]

const categories = ["All", "Supplements", "Vitamins", "Beverages", "Wellness"]
const statuses = ["All", "active", "out_of_stock", "inactive"]

const ProductsPage = () => {
  const [products, setProducts] = useState(dummyProducts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof dummyProducts[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    stock: '',
    shortDescription: '',
    longDescription: '',
    benefits: '',
    ingredients: '',
    dosage: '',
    weight: '',
    expiryDate: '',
    manufacturer: ''
  })

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.longDescription.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, searchTerm, selectedCategory, selectedStatus])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedStatus])

  const handleAddProduct = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const product = {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.originalPrice),
        stock: parseInt(newProduct.stock),
        rating: 4.5,
        status: 'active',
        image: "https://images.unsplash.com/photo-1584017911766-df565594c4e4?w=300&h=300&fit=crop",
        shortDescription: newProduct.shortDescription,
        longDescription: newProduct.longDescription,
        benefits: newProduct.benefits.split('\n').filter(b => b.trim()),
        ingredients: newProduct.ingredients,
        dosage: newProduct.dosage,
        weight: newProduct.weight,
        expiryDate: newProduct.expiryDate,
        manufacturer: newProduct.manufacturer,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setProducts([...products, product])
      setNewProduct({ 
        name: '', category: '', price: '', originalPrice: '', stock: '', 
        shortDescription: '', longDescription: '', benefits: '', ingredients: '', 
        dosage: '', weight: '', expiryDate: '', manufacturer: '' 
      })
      setShowAddModal(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProduct = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(products.map(p => 
        p.id === selectedProduct!.id 
          ? { 
              ...p, 
              ...newProduct, 
              price: parseFloat(newProduct.price), 
              originalPrice: parseFloat(newProduct.originalPrice),
              stock: parseInt(newProduct.stock),
              benefits: newProduct.benefits.split('\n').filter(b => b.trim())
            }
          : p
      ))
      setShowEditModal(false)
      setSelectedProduct(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(products.filter(p => p.id !== selectedProduct!.id))
      setShowDeleteModal(false)
      setSelectedProduct(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (product: typeof dummyProducts[0]) => {
    setSelectedProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      stock: product.stock.toString(),
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      benefits: product.benefits.join('\n'),
      ingredients: product.ingredients,
      dosage: product.dosage,
      weight: product.weight,
      expiryDate: product.expiryDate,
      manufacturer: product.manufacturer
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (product: typeof dummyProducts[0]) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => setShowAddModal(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new product to inventory</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Products</p>
                <p className="text-2xl font-bold text-foreground">{products.filter(p => p.status === 'active').length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-foreground">{products.filter(p => p.status === 'out_of_stock').length}</p>
              </div>
              <Package className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">₹{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status.replace('_', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex border border-input rounded-lg overflow-hidden">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid view</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List view</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={
                      product.status === 'active' ? 'success' :
                      product.status === 'out_of_stock' ? 'warning' :
                      'secondary'
                    }
                  >
                    {product.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <CardDescription className="mb-2">{product.category}</CardDescription>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{product.shortDescription}</p>
                <p className="text-sm text-muted-foreground mb-4">Stock: {product.stock} • {product.weight}</p>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => openEditModal(product)}
                        className="flex-1 gap-2"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit product details</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => openDeleteModal(product)}
                        variant="outline"
                        className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete this product</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-lg" 
                      />
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">₹{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-foreground">{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        product.status === 'active' ? 'success' :
                        product.status === 'out_of_stock' ? 'warning' :
                        'secondary'
                      }
                    >
                      {product.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => openEditModal(product)}
                            variant="ghost"
                            size="icon"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit product</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => openDeleteModal(product)}
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete product</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Product Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product with all the necessary details.
            </DialogDescription>
          </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                <div>
                  <Label htmlFor="add-product-name" className="mb-2 block">Product Name</Label>
                  <Input
                    id="add-product-name"
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-category" className="mb-2 block">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-product-short-desc" className="mb-2 block">Short Description</Label>
                  <Input
                    id="add-product-short-desc"
                    type="text"
                    placeholder="Brief product description"
                    value={newProduct.shortDescription}
                    onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-long-desc" className="mb-2 block">Long Description</Label>
                  <Textarea
                    id="add-product-long-desc"
                    placeholder="Detailed product description"
                    value={newProduct.longDescription}
                    onChange={(e) => setNewProduct({...newProduct, longDescription: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Pricing & Inventory</h3>
                <div>
                  <Label htmlFor="add-product-price" className="mb-2 block">Price (₹)</Label>
                  <Input
                    id="add-product-price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-original-price" className="mb-2 block">Original Price (₹)</Label>
                  <Input
                    id="add-product-original-price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-stock" className="mb-2 block">Stock Quantity</Label>
                  <Input
                    id="add-product-stock"
                    type="number"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-weight" className="mb-2 block">Weight/Size</Label>
                  <Input
                    id="add-product-weight"
                    type="text"
                    placeholder="e.g., 2.2 lbs (1kg)"
                    value={newProduct.weight}
                    onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Product Details</h3>
                <div>
                  <Label htmlFor="add-product-ingredients" className="mb-2 block">Ingredients</Label>
                  <Textarea
                    id="add-product-ingredients"
                    placeholder="List all ingredients separated by commas"
                    value={newProduct.ingredients}
                    onChange={(e) => setNewProduct({...newProduct, ingredients: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-dosage" className="mb-2 block">Dosage Instructions</Label>
                  <Textarea
                    id="add-product-dosage"
                    placeholder="e.g., 1 capsule daily with food"
                    value={newProduct.dosage}
                    onChange={(e) => setNewProduct({...newProduct, dosage: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-benefits" className="mb-2 block">Benefits (one per line)</Label>
                  <Textarea
                    id="add-product-benefits"
                    placeholder="Builds lean muscle mass&#10;Supports post-workout recovery&#10;Contains all essential amino acids"
                    value={newProduct.benefits}
                    onChange={(e) => setNewProduct({...newProduct, benefits: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Additional Information</h3>
                <div>
                  <Label htmlFor="add-product-manufacturer" className="mb-2 block">Manufacturer</Label>
                  <Input
                    id="add-product-manufacturer"
                    type="text"
                    placeholder="Enter manufacturer name"
                    value={newProduct.manufacturer}
                    onChange={(e) => setNewProduct({...newProduct, manufacturer: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-product-expiry" className="mb-2 block">Expiry Date</Label>
                  <Input
                    id="add-product-expiry"
                    type="date"
                    value={newProduct.expiryDate}
                    onChange={(e) => setNewProduct({...newProduct, expiryDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below.
            </DialogDescription>
          </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                <div>
                  <Label htmlFor="edit-product-name" className="mb-2 block">Product Name</Label>
                  <Input
                    id="edit-product-name"
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-category" className="mb-2 block">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-product-short-desc" className="mb-2 block">Short Description</Label>
                  <Input
                    id="edit-product-short-desc"
                    type="text"
                    placeholder="Brief product description"
                    value={newProduct.shortDescription}
                    onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-long-desc" className="mb-2 block">Long Description</Label>
                  <Textarea
                    id="edit-product-long-desc"
                    placeholder="Detailed product description"
                    value={newProduct.longDescription}
                    onChange={(e) => setNewProduct({...newProduct, longDescription: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Pricing & Inventory</h3>
                <div>
                  <Label htmlFor="edit-product-price" className="mb-2 block">Price (₹)</Label>
                  <Input
                    id="edit-product-price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-original-price" className="mb-2 block">Original Price (₹)</Label>
                  <Input
                    id="edit-product-original-price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-stock" className="mb-2 block">Stock Quantity</Label>
                  <Input
                    id="edit-product-stock"
                    type="number"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-weight" className="mb-2 block">Weight/Size</Label>
                  <Input
                    id="edit-product-weight"
                    type="text"
                    placeholder="e.g., 2.2 lbs (1kg)"
                    value={newProduct.weight}
                    onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Product Details</h3>
                <div>
                  <Label htmlFor="edit-product-ingredients" className="mb-2 block">Ingredients</Label>
                  <Textarea
                    id="edit-product-ingredients"
                    placeholder="List all ingredients separated by commas"
                    value={newProduct.ingredients}
                    onChange={(e) => setNewProduct({...newProduct, ingredients: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-dosage" className="mb-2 block">Dosage Instructions</Label>
                  <Textarea
                    id="edit-product-dosage"
                    placeholder="e.g., 1 capsule daily with food"
                    value={newProduct.dosage}
                    onChange={(e) => setNewProduct({...newProduct, dosage: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-benefits" className="mb-2 block">Benefits (one per line)</Label>
                  <Textarea
                    id="edit-product-benefits"
                    placeholder="Builds lean muscle mass&#10;Supports post-workout recovery&#10;Contains all essential amino acids"
                    value={newProduct.benefits}
                    onChange={(e) => setNewProduct({...newProduct, benefits: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Additional Information</h3>
                <div>
                  <Label htmlFor="edit-product-manufacturer" className="mb-2 block">Manufacturer</Label>
                  <Input
                    id="edit-product-manufacturer"
                    type="text"
                    placeholder="Enter manufacturer name"
                    value={newProduct.manufacturer}
                    onChange={(e) => setNewProduct({...newProduct, manufacturer: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-product-expiry" className="mb-2 block">Expiry Date</Label>
                  <Input
                    id="edit-product-expiry"
                    type="date"
                    value={newProduct.expiryDate}
                    onChange={(e) => setNewProduct({...newProduct, expiryDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedProduct?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default ProductsPage
