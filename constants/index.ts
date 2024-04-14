import freebies1 from "../public/productimages/freebies1.webp";
import freebies2 from "../public/productimages/freebies2.webp";
import freebies3 from "../public/productimages/freebies3.webp";
import freebies4 from "../public/productimages/freebies4.webp";
import productimage1 from "../public/productimages/productimage1.webp";
import productimage2 from "../public/productimages/productimage2.webp";
import productimage3 from "../public/productimages/productimage3.webp";
import productimage4 from "../public/productimages/productimage4.webp";
import productimage5 from "../public/productimages/productimage5.webp";
import productimage6 from "../public/productimages/productimage6.webp";
import productimage7 from "../public/productimages/productimage7.webp";
import productimage8 from "../public/productimages/productimage8.webp";
import productimage9 from "../public/productimages/productimage9.webp";
import productimage10 from "../public/productimages/productimage10.webp";
import productimage11 from "../public/productimages/productimage11.webp";
import productimage12 from "../public/productimages/productimage12.webp";
import productimage13 from "../public/productimages/productimage13.webp";
import productimage14 from "../public/productimages/productimage14.webp";
import productimage15 from "../public/productimages/productimage15.webp";

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
    img: "/best-sellers/creatine.webp",
    name: "Ultimate Multivitamin",
    desc: "Comprehensive blend of essential vitamins to support overall health.",
    prize: "₹999",
    prizeStrike: "₹1299",
    discountPrize: "₹300",
    category: "Vitamins",
    stars: 5,
    hot: true,
  },
  {
    id: 2,
    img: "/best-sellers/good-product.webp",
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
    img: "/best-sellers/creatine.webp",
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
    img: "/best-sellers/good-product.webp",
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
    img: "/best-sellers/good-product.webp",
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

export const productData = {
  heading: "Premium Gold Whey Protein",
  rating: 3.6,
  originalPrice: 849,
  discount: 41.41,
  available: 5,
  sizes: ["1 KG", "2 KG", "500 GM"],

  productimages: [
    productimage1,
    productimage2,
    productimage3,
    productimage4,
    productimage5,
    productimage6,
    productimage7,
    productimage8,
    productimage9,
    productimage10,
    productimage11,
    productimage12,
    productimage13,
    productimage14,
    productimage15,
  ],

  flavures: [
    "BELGIAN CHOCOLATE",
    "DOUBLE RICH CHOCOLATE",
    "STRAWBERRY MILKSHAKE",
    "SMOOTH BANANA CREAM",
    "COOKIE & CREAM",
    "ROCKY ROAD",
    "SALTED CARAMEL",
    "MANGO MAGIC",
    "MALAI KULFI",
  ],
  customer_reviews: 217,

  description: [
    {
      heading: "",
      content: `Big Muscle's Premium Gold Whey Protein is pinnacle of superior protein supplementation. Meticulously crafted, our product stands as the best protein supplement, with the world's finest whey protein concentrate and whey protein isolate ensuring unparalleled absorption. Each 35-gram serving delivers 25 grams of high-quality protein, ideal for muscle growth and recovery. Formulated for elite athletes and fitness enthusiasts, it supports peak performance and physique sculpting. Recognizing the body's need for nutrients during intense activity, Premium Gold Whey Protein offers reliability and effectiveness. Choose Premium Gold Whey Protein today to power your full potential with Big Muscle Nutrition. `,
    },

    {
      heading: "Big Muscles Premium Gold Whey Protein",
      content: `Crafted with precision and care, Big Muscle's Premium Gold Whey Protein is a beacon of excellence in nutrition. We select the world's finest whey protein concentrate and whey protein isolate. This ensures unparalleled absorption and use within the body. At the core of Premium Gold Whey Protein is a dedication to quality and efficacy. Each 35-gram serving delivers an impressive 25 grams of high-quality protein. It's ideal for fueling muscle growth and recovery.


    We understand the body's need for essential nutrients, especially during intense physical activity. That's why we've formulated Premium Gold Whey Protein to be a reliable source of premium-grade protein. Whether you're an elite athlete or a dedicated fitness enthusiast, our product supports your journey confidently and easily. Premium Gold Whey Protein caters to individuals seeking peak performance and physique sculpting. It's the ultimate choice for those who focus on quality and effectiveness in their protein supplementation. Choose Premium Gold Whey Protein and unlock your full potential today. `,
    },

    {
      heading:
        "Accelerating Fitness Potential with Whey Protein: Understanding Types and Benefits",
      content: `Whey protein is often hailed as the "gold standard" of protein supplementation. It emerges as a vital part of the fitness and wellness landscape. Whey protein comes from the liquid part of milk during cheese making. It has gained recognition for its many health benefits. This is especially true in the fitness community. Whey protein is a complete protein as it contains all nine essential amino acids. They are crucial for muscle repair, growth, and overall well-being. Its comprehensive amino acid profile makes it a cornerstone in post-workout recovery and muscle synthesis.


    There are two main types of whey protein: whey protein concentrate and whey protein isolate. Whey protein concentrate has some of the fat and lactose from milk, which makes it a more balanced source of nutrients. On the other hand, whey protein isolate undergoes further refining. Isolate protein is a type of protein powder that is subjected to more processing than a concentrate. This removes excess fat and lactose. This results in a purer protein product with minimal carbohydrates and fats. This makes whey protein isolate ideal for individuals seeking a lean protein source. It doesn't have unnecessary additives.
    
    
    Branched-chain amino acids (BCAAs) are a significant part of whey protein. Leucine, isoleucine, and valine lead the charge. These BCAAs play a pivotal role in fostering muscle protein synthesis. They also help muscle recovery and enhance athletic performance. Whey protein has a rich BCAA content. It's an invaluable resource for athletes and fitness enthusiasts. They use it to optimize their training outcomes.
    
    
    When considering the best whey protein supplement, purity, efficacy, and affordability are important factors. Whey protein isolate may have a higher price due to its refined composition. However, whey protein concentrate is a cost-effective option and maintains quality. The best whey protein supplement aligns with individual preferences, dietary requirements, and fitness goals. It offers a synergistic blend of performance and value.`,
    },
    {
      heading:
        "Discovering the Holistic Benefits of Whey Protein: Beyond Muscle Building",
      content: `Incorporating whey protein into your daily dietary routine extends far beyond its renowned role in muscle building and recovery. Isolate protein has many benefits for health and well-being. It's a cornerstone of a balanced, holistic lifestyle.


    Many studies show whey protein may help manage weight. One key mechanism lies in its ability to promote satiety. This leads to reduced calorie consumption and improved portion control. Whey protein can make you feel full, reducing cravings and preventing overeating. This makes it easier to lose and maintain weight.
    
    
    Moreover, whey protein has emerged as a potent ally in aiding immune function. It also helps to prevent inflammation. Whey protein is rich in bioactive peptides and immunoglobulins. It has immunomodulatory properties that strengthen the body's defenses against pathogens and infections. Its anti-inflammatory effects help reduce oxidative stress and combat chronic inflammation. This promotes health and longevity.
    
    
    The cardiovascular benefits of whey protein further brings to light its value as a dietary supplement. Research suggests that whey protein supplementation may improve lipid profiles. This includes reductions in LDL cholesterol levels and improvements in HDL cholesterol levels. These lipid-modulating effects play an integral role in cardiovascular health. They reduce the risk of heart disease and related complications.
    
    
    When deciding on the best whey protein supplement, consider more than just health benefits. Also think about purity, efficacy, and affordability. While protein isolate offers a purer protein source with minimal fats and carbohydrates, whey protein concentrate is a cost-effective option without compromising quality. In the end, the best whey protein supplement aligns with individual preferences and dietary needs. It also fits budget constraints. It offers a blend of health benefits and value.
    
    `,
    },
    {
      heading:
        "Indulgent Flavors and Inclusive Quality: Premium Gold Whey Protein",
      content: `Even in taste, we commit to excellence. We offer 11 delectable flavors. They include: Belgian Chocolate, Double Rich Chocolate, Café Latte, Vanilla Cream, Strawberry Milkshake, Smooth Banana Cream, Cookie and Cream, and Rocky Road. Premium Gold Whey Protein offers a delicious way to please your taste buds and meet your nutritional needs. Whether you prefer classic chocolate or crave something adventurous like smooth banana cream, it has something for everyone.


    Premium Gold Whey Protein excels in taste and performance. It stands as a testament to our unwavering dedication to quality. It also proves our support towards inclusivity. Our product is 100% vegetarian, gluten-free, soy-free, and non-GMO. It aligns with diverse dietary preferences and restrictions. We believe that everyone should have access to high-quality protein supplementation. Our commitment to inclusivity reflects our mission. We aim to empower individuals on their journey toward optimal health and wellness.`,
    },
    {
      heading:
        "Power Up with Premium Gold Whey Protein: Your Ultimate Protein Solution",
      content: `For the best in protein supplementation, choose Premium Gold Whey Protein. It effectively meets daily protein needs while supporting muscle growth, aiding recovery, and enhancing overall health. This premium supplement combines the finest ingredients in a delicious and versatile form. Opt for the best protein supplement on the market by selecting Premium Gold Whey Protein. Its superior blend of whey protein concentrate and isolate protein guarantees quality without compromising taste. With its rich amino acid profile, including essential branched-chain amino acids, it promotes optimal performance. Plus, it caters to diverse needs and budgets, offering whey protein isolate for purity and whey protein concentrate for affordability. Unleash your full potential with Premium Gold Whey Protein from Big Muscle Nutrition.`,
    },
    {
      heading: "CONCLUSION",
      content: `Experience the pinnacle of protein supplementation with Big Muscles Premium Gold Whey Protein. It's the best whey protein supplement, meticulously crafted to elevate your fitness journey. Premium Gold Whey Protein is more than just a product. It's an investment in your health, performance, and overall well-being. Realize your true potential with Premium Gold Whey Protein today.`,
    },
  ],
  faqs: [
    {
      question: "Is whey protein suitable for vegetarians?",
      answer:
        "Yes, whey protein is suitable for vegetarians as Premium Gold Whey Protein is 100% vegetarian.",
    },
    {
      question:
        "What are the differences between whey protein concentrate and whey protein isolate?",
      answer:
        "Whey protein concentrate retains some fat and lactose, while whey protein isolate undergoes further processing for minimal carbohydrates and fats.",
    },
    {
      question: "How does whey protein aid in muscle recovery after workouts?",
      answer:
        "Whey protein, present in isolate protein aids in muscle recovery by providing essential amino acids crucial for muscle repair and growth.",
    },
    {
      question: " Can whey protein help with weight management and satiety?",
      answer:
        "Yes, whey protein promotes a feeling of fullness, reducing calorie consumption and aiding in weight management.",
    },
    {
      question:
        "Are there any potential allergens in Premium Gold Whey Protein?",
      answer:
        "Premium Gold Whey Protein is gluten-free, soy-free, and non-GMO, making it suitable for individuals with various dietary restrictions.",
    },
    {
      question:
        "What are the recommended serving sizes for Premium Gold Whey Protein?",
      answer:
        "Each serving of Premium Gold Whey Protein contains 35 grams, delivering 25 grams of high-quality protein.",
    },
    {
      question:
        "How does Premium Gold Whey Protein contribute to immune function and overall health?",
      answer:
        "Whey protein has immune strengthening properties and anti-inflammatory effects, boosting immune function and promoting overall health.",
    },
  ],

  frebies: [
    {
      image: freebies1,
      title: "Free Shaker*",
      pricerange: [1999, 2499],
    },
    {
      image: freebies2,
      title: "Free T-Shirt*",
      pricerange: [2500, 3499],
    },
    {
      image: freebies3,
      title: "Free Stringer*",
      pricerange: [1999, 2499],
    },
    {
      image: freebies4,
      title: "Free T-Shirt & Shaker*",
      pricerange: [4500],
    },
  ],

  customer_rating: [
    {
      heading: "Convenient Packaging",
      review:
        "The packaging is convenient and easy to store. Will definitely buy it again.",
      name: "Rajveer Singh Rathod",
      date: "Mar,2024",
      rating: 4.5,
    },
    {
      heading: "No Clumps, No Grit – Just Perfection!",
      review: "Mix well with water or milk. No clumps or gritty texture.",
      name: "Tarun Singh",
      date: "Mar,2024",
      rating: 5,
    },
    {
      heading: "Fast Delivery Appreciation",
      review: "Appreciate the fast delivery. Always arrives on time.",
      name: "Shubham Verma",
      date: "Mar,2024",
      rating: 5,
    },
    {
      heading: "Fitness Staple: Can't Go Without It for Months!",
      review:
        "Been using it for months now. Can't imagine my fitness routine without it.",
      name: "Pankaj Sharma",
      date: "Mar,2024",
      rating: 4,
    },
    {
      heading: "Protein Packed: A Daily Intake Essential!",
      review:
        "Provides a good amount of protein per serving. Helps me meet my daily intake.",
      name: "Rajveer Singh Rathod",
      date: "Mar,2024",
      rating: 4,
    },
  ],
};
