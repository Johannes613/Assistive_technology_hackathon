import icon1 from "../../images/10019.svg";
import icon2 from "../../images/10020.png";
import icon3 from "../../images/10021.png";
import icon4 from "../../images/10022.png";

export const pricingPlans = [
  {
    id: 1,
    name: "Free",
    price: "$00.00",
    features: [
      "Access up to 15 speech exercises/month",
      "Basic AI pronunciation feedback",
      "Supports 5 global languages",
      "10 audio uploads/month including different languages",
      "Limited therapy chat support",
    ],
    icon: icon1,
  },
  {
    id: 2,
    name: "Premium",
    price: "$5.00",
    features: [
      "Access up to 30 speech exercises/month",
      "Smart AI pronunciation improvement",
      "AI-based language support",
      "15 audio uploads/month",
      "Unlimited chat support",
    ],
    icon: icon2,
  },
  {
    id: 3,
    name: "Pro",
    price: "$10.00",
    features: [
      "Access up to 60 speech exercises/month",
      "Real-time speech feedback",
      "Advanced AI-driven corrections",
      "Supports more than 15 languages",
      "30 audio uploads/month including different languages",
    ],
    icon: icon3,
  },
  {
    id: 4,
    name: "Unlimited",
    price: "$20.00",
    features: [
      "Unlimited speech exercises/month",
      "Real-time pronunciation correction",
      "Supports 25+ global languages",
      "Unlimited audio uploads",
      "Unlimited therapist chat support",
    ],
    icon: icon4,
  },
];
