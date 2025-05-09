import icon1 from "../../images/10019.svg"
import icon2 from "../../images/10020.png"
import icon3 from "../../images/10021.png"
import icon4 from "../../images/10022.png"

export const pricingPlans = [
  {
    id: 1,
    name: "Free",
    price: "$00.00",
    features: [
      "Generate up to 15,000 words/month",
      "AI-powered writing assistance",
      "Supports 10 global languages",
      "40 AI-created images/month",
      "Limited chatbot interaction",
    ],
    icon: icon1,
  },
  {
    id: 2,
    name: "Premium",
    price: "$5.00",
    features: [
      "Generate up to 30,000 words/month",
      "Smart AI content refinement",
      "SEO-enhanced text generation",
      "25+ language translation",
      "40 AI-created images/month",

    ],
    icon: icon2,
  },
  {
    id: 3,
    name: "Pro",
    price: "$10.00",
    features: [
      "Generate up to 60,000 words/month",
      "AI-powered research insights",
      "Advanced text optimization",
      "25+ language translation",
      "40 AI-created images/month",
    
    ],
    icon: icon3,
  },
  {
    id: 4,
    name: "Unlimited",
    price: "$20.00",
    features: [
      "Generate unlimted amount of words/month",
      "Real-time AI content suggestions",
      "Supports 56+ global languages",
      "40 AI-created images/month",
      "Unlimited chatbot engagement",
    ],
    icon: icon4,
  },
];
