import { SidebarLink } from "@/types";
export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/products",
    label: "Products",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/about",
    label: "About Us",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/contact",
    label: "Contact Us",
  },
];

export const products = [
  {
    id: 1,
    name: "Proteins",
  },
  {
    id: 2,
    name: "Wellness",
  },
  {
    id: 3,
    name: "Amino Acids",
  },
  {
    id: 4,
    name: "Pre-Workout",
  },
  {
    id: 5,
    name: "Daily Support",
  },
  {
    id: 6,
    name: "Bundle Stacks",
  },
];

export const explore = [
  {
    id: 1,
    name: "News",
  },
  {
    id: 2,
    name: "Blogs",
  },
  {
    id: 3,
    name: "About",
  },
  {
    id: 4,
    name: "Our Athletes",
  },
  {
    id: 5,
    name: "Our Stories",
  },
];

export const information = [
  {
    id: 1,
    name: "Contact Us",
  },
  {
    id: 2,
    name: "Terms of Use",
  },
  {
    id: 3,
    name: "Privacy Policy",
  },
  {
    id: 4,
    name: "Shipping & Delivery Policy",
  },
  {
    id: 5,
    name: "Return and Refund",
  },
];

export const info = [
  {
    title: "Natural Ingredients",
    description:
      "Harnessing the power of nature, BioEssentia provides supplements made with the finest organic ingredients for your well-being.",
    link: "#natural-ingredients", // This could link to a section on the page about natural ingredients.
  },
  {
    title: "Full Spectrum Health",
    description:
      "From vitamins to minerals and herbal extracts, explore our full range of supplements designed to support your entire body's health.",
    link: "#full-spectrum-health", // Link to a section about the full spectrum of health products.
  },
  {
    title: "Scientifically Backed",
    description:
      "Trust in the science behind our supplements. Each product is rigorously tested for efficacy and safety.",
    link: "#scientifically-backed", // Link to studies or evidence backing your products.
  },
  {
    title: "Eco-Friendly Packaging",
    description:
      "Committed to the planet, BioEssentia's products come in eco-friendly packaging, ensuring sustainability from production to your doorstep.",
    link: "#eco-friendly", // Link to your sustainability mission page or section.
  },
  {
    title: "Fitness and Wellness",
    description:
      "Whether you're a fitness enthusiast or seeking wellness, our tailored supplements cater to every lifestyle.",
    link: "#fitness-and-wellness", // Link to categories or collections of products for fitness and wellness.
  },
  {
    title: "Expert Advice",
    description:
      "Get personalized supplement advice from our team of health experts and nutritionists. We're here to guide you on your health journey.",
    link: "#expert-advice", // Link to a consultation page or contact form.
  },
];

export const popularProducts = [
  {
    id: 1,
    img: "/assets/images/supplement.webp",
    name: "Ultimate Multivitamin",
    desc: "Comprehensive blend of essential vitamins and minerals to support overall health.",
    prize: "₹999",
    prizeStrike: "₹1299",
    discountPrize: "₹300",
    category: "Vitamins",
    stars: 5,
    hot: true,
  },
  {
    id: 2,
    img: "/assets/images/supplement.webp",
    name: "Organic Whey Protein",
    desc: "Fuel your muscles with our pure, grass-fed organic whey protein.",
    prize: "₹2199",
    prizeStrike: "₹2599",
    discountPrize: "₹400",
    category: "Protein Powder",
    stars: 4.8,
    sale: true,
  },
  {
    id: 3,
    img: "/assets/images/supplement.webp",
    name: "Omega-3 Fish Oil",
    desc: "High-quality, purified Omega-3 fish oil for heart health and cognitive function.",
    prize: "₹749",
    prizeStrike: "₹999",
    discountPrize: "₹250",
    category: "Fish Oil",
    stars: 4.7,
    newPro: true,
  },
  {
    id: 4,
    img: "/assets/images/supplement.webp",
    name: "Power Pre-workout",
    desc: "Boost your workout intensity with our advanced pre-workout formula.",
    prize: "₹1299",
    prizeStrike: "₹1599",
    discountPrize: "₹300",
    category: "Pre-workout",
    stars: 4.9,
  },
  {
    id: 5,
    img: "/assets/images/supplement.webp",
    name: "Daily Probiotic",
    desc: "Support your gut health with our daily probiotic blend.",
    prize: "₹899",
    prizeStrike: "₹1199",
    discountPrize: "₹300",
    category: "Gut Health",
    stars: 4.6,
  },
];

export const trendingProducts = [
  {
    id: 6,
    img: "/assets/images/supplement.webp",
    name: "Vegan Protein Blend",
    desc: "A plant-based protein powder perfect for vegans and vegetarians alike.",
    prize: "₹1999",
    prizeStrike: "₹2399",
    discountPrize: "₹400",
    category: "Vegan Protein",
    stars: 4.5,
    hot: true,
  },
  {
    id: 7,
    img: "/assets/images/supplement.webp",
    name: "Performance BCAAs",
    desc: "Branched-chain amino acids to support muscle recovery and growth.",
    prize: "₹1199",
    prizeStrike: "₹1499",
    discountPrize: "₹300",
    category: "Amino Acids",
    stars: 4.8,
    sale: true,
  },
  {
    id: 8,
    img: "/assets/images/supplement.webp",
    name: "ZMA Night Recovery",
    desc: "Promote better sleep and muscle recovery with our ZMA supplement.",
    prize: "₹999",
    prizeStrike: "₹1299",
    discountPrize: "₹300",
    category: "Recovery",
    stars: 4.9,
    newPro: true,
  },
  {
    id: 9,
    img: "/assets/images/supplement.webp",
    name: "Complete Greens Powder",
    desc: "Get your daily dose of greens with this easy-to-mix superfood powder.",
    prize: "₹1099",
    prizeStrike: "₹1399",
    discountPrize: "₹300",
    category: "Superfoods",
    stars: 4.7,
  },
  {
    id: 10,
    img: "/assets/images/supplement.webp",
    name: "Energy Boost Gummies",
    desc: "Enjoy a tasty, chewable gummy for a quick energy boost any time of the day.",
    prize: "₹599",
    prizeStrike: "₹799",
    discountPrize: "₹200",
    category: "Energy",
    stars: 4.5,
  },
];
export const fitnessBudgetStacks = [
  {
    id: 11,
    img: "/assets/images/supplement.webp",
    name: "Starter Fitness Stack",
    desc: "Kickstart your fitness journey with our budget-friendly starter stack.",
    prize: "₹2999",
    prizeStrike: "₹3499",
    discountPrize: "₹500",
    category: "Stacks",
    stars: 4.3,
    hot: true,
  },
  {
    id: 12,
    img: "/assets/images/supplement.webp",
    name: "Weight Loss Stack",
    desc: "A specially curated stack of supplements to support your weight loss goals.",
    prize: "₹3499",
    prizeStrike: "₹3999",
    discountPrize: "₹500",
    category: "Weight Loss",
    stars: 4.6,
  },
  {
    id: 13,
    img: "/assets/images/supplement.webp",
    name: "Muscle Gain Stack",
    desc: "Gain strength and size with our muscle-building supplement stack.",
    prize: "₹3999",
    prizeStrike: "₹4599",
    discountPrize: "₹600",
    category: "Muscle Building",
    stars: 4.8,
    sale: true,
  },
  {
    id: 14,
    img: "/assets/images/supplement.webp",
    name: "Endurance Athlete Stack",
    desc: "Enhance your endurance with this comprehensive supplement stack.",
    prize: "₹3699",
    prizeStrike: "₹4299",
    discountPrize: "₹600",
    category: "Endurance",
    stars: 4.7,
    newPro: true,
  },
];

// Mock data for categories
export const categoryData = [
  { title: "Vitamins", img: "/assets/images/supplement.webp" },
  { title: "Proteins", img: "/assets/images/supplement.webp" },
  { title: "Minerals", img: "/assets/images/supplement.webp" },
  { title: "Herbs", img: "/assets/images/supplement.webp" },
  { title: "Vitamins", img: "/assets/images/supplement.webp" },
  { title: "Proteins", img: "/assets/images/supplement.webp" },
  { title: "Minerals", img: "/assets/images/supplement.webp" },
  { title: "Herbs", img: "/assets/images/supplement.webp" },
  // Add more categories as needed
];
