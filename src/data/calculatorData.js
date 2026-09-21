export const projectTypes = [
  {
    id: 'business-web',
    name: 'Business Website',
    basePriceMin: 3500,
    basePriceMax: 6500,
    baseWeeks: 3,
    description: 'High-converting flagship corporate website with custom 3D visuals, CMS, and responsive speed.',
    icon: 'Building2'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Website',
    basePriceMin: 6000,
    basePriceMax: 11000,
    baseWeeks: 5,
    description: 'Bespoke high-volume online boutique with 3D product previews and conversion-tuned checkout.',
    icon: 'ShoppingBag'
  },
  {
    id: 'saas-platform',
    name: 'SaaS Platform',
    basePriceMin: 9500,
    basePriceMax: 17500,
    baseWeeks: 7,
    description: 'Full-featured web application with user workspaces, billing tiers, APIs, and analytics.',
    icon: 'Layers'
  },
  {
    id: 'ai-app',
    name: 'AI Application',
    basePriceMin: 12000,
    basePriceMax: 22000,
    baseWeeks: 8,
    description: 'Intelligent AI app with agentic pipelines, real-time LLM streaming, embeddings, and vector database.',
    icon: 'Sparkles'
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    basePriceMin: 10000,
    basePriceMax: 19000,
    baseWeeks: 8,
    description: 'Native iOS & Android application built with React Native / Swift, haptics, and offline cache.',
    icon: 'Smartphone'
  }
];

export const additionalRequirements = [
  {
    id: 'custom-uiux',
    name: 'Custom UI/UX Design System',
    priceMin: 2000,
    priceMax: 3500,
    weeks: 1.5,
    description: 'Atomic Figma token library, custom iconography, design tokens, and developer handover.'
  },
  {
    id: '3d-animations',
    name: '3D WebGL Animations & Shaders',
    priceMin: 2500,
    priceMax: 4500,
    weeks: 2,
    description: 'Custom interactive 3D WebGL canvases, GLSL shaders, camera parallax, and particle physics.'
  },
  {
    id: 'user-auth',
    name: 'User Authentication & RBAC',
    priceMin: 1200,
    priceMax: 2200,
    weeks: 1,
    description: 'Multi-role authentication, SSO, OAuth, 2FA security, and session management.'
  },
  {
    id: 'payment-integration',
    name: 'Payment & Subscription Engine',
    priceMin: 1500,
    priceMax: 2800,
    weeks: 1,
    description: 'Stripe / LemonSqueezy global checkout, metered billing, invoices, and automated tax.'
  },
  {
    id: 'admin-dashboard',
    name: 'Admin & Analytics Dashboard',
    priceMin: 2500,
    priceMax: 4500,
    weeks: 2,
    description: 'High-density internal management console, user moderation, and live chart telemetry.'
  },
  {
    id: 'ai-integration',
    name: 'AI & Neural Integration',
    priceMin: 3500,
    priceMax: 6000,
    weeks: 2.5,
    description: 'Fine-tuned LLM agents, vector semantic search, RAG pipelines, and automated reasoning.'
  },
  {
    id: 'advanced-animations',
    name: 'Advanced Micro-Animations & Sound',
    priceMin: 1500,
    priceMax: 2500,
    weeks: 1,
    description: 'Kinetic typography, GSAP smooth scroll, cursor magnetic forces, and spatial audio feedback.'
  }
];

export const timelineTiers = [
  {
    id: 'standard',
    name: 'Standard Velocity',
    multiplier: 1.0,
    timeModifier: 1.0,
    badge: 'Recommended',
    description: 'Steady, meticulous agile sprints with weekly review syncs.'
  },
  {
    id: 'priority',
    name: 'Priority Fast-Track',
    multiplier: 1.25,
    timeModifier: 0.75,
    badge: '25% Faster',
    description: 'Dedicated senior engineers with expedited review cycles.'
  },
  {
    id: 'express',
    name: 'Express Warp Speed',
    multiplier: 1.5,
    timeModifier: 0.5,
    badge: '50% Faster',
    description: 'All-hands dedicated war-room delivery for time-critical venture deadlines.'
  }
];
