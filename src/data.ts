import { WhyUsCard, ServiceItem } from "./types";

export const whyUsData: WhyUsCard[] = [
  {
    id: "fintech_approach",
    title: "Innovative Fintech Approach",
    description: "Innovative Fintech elements to revolutionize brokerage infrastructure, driving custom tech execution and enabling success.",
    iconName: "BrainCircuit",
    isActive: false,
  },
  {
    id: "trading_experience",
    title: "Seamless Trading Experience",
    description: "Flawless, ultra-low latency transaction paths, seamless routing, and optimized packet movement across trading platforms.",
    iconName: "ThumbsUp",
    isActive: true,
  },
  {
    id: "strategic_partnership",
    title: "Ongoing Strategic Partnership",
    description: "Enduring cooperative agreements engineered around co-development, platform scaling, and strategic security alignments.",
    iconName: "Users",
    isActive: false,
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: "mts_solutions",
    title: "MTS Admin Solutions",
    shortDesc: "Comprehensive orchestration utilities for MT4/MT5 platforms to ensure supreme efficiency.",
    fullDesc: "Unlock full leverage over your trading platforms with customized plugins, real-time control, and highly-optimized server configurations. Our MTS Admin Solutions facilitate complex multi-group setups and asset class additions in minutes.",
    iconName: "Settings2",
  },
  {
    id: "mts_management",
    title: "MTS Admin Management",
    shortDesc: "Continuous management and operational back-support for internal trading setups.",
    fullDesc: "Eliminate downtime risks with dedicated 24/7 MetaTrader administrator coverage. We secure your platform with automated maintenance, daily DB backups, and rapid system upgrades so your dealers can trade without stress.",
    iconName: "ShieldAlert",
  },
  {
    id: "server_management",
    title: "Server Management",
    shortDesc: "Highly secure, geographically distributed virtualization and physical rack setups.",
    fullDesc: "Deploy in premium low-latency financial datacenters including NY4, LD4, and TY3. Our Server Management packages guarantee 99.99% system availability with automated failovers and load balancing for high-frequency execution.",
    iconName: "Server",
  },
  {
    id: "bridge_integrations",
    title: "Bridge & Gateway Integrations",
    shortDesc: "High-speed pathways linking your pricing engine securely with top liquidity pools.",
    fullDesc: "Configure hybrid aggregation systems that intelligently route traffic to various liquidity pools. Supports flexible limit orders, smart execution rules, and sub-millisecond execution matching under severe volatility.",
    iconName: "GitMerge",
  },
  {
    id: "data_protection",
    title: "Data Protection",
    shortDesc: "Multi-layered enterprise encryption preserving the confidentiality of transaction records.",
    fullDesc: "Enforce complete security of customer onboarding files and client funds data. Fully compliant with international financial directives, utilizing solid military-grade data vaults with cryptographic audit logs.",
    iconName: "Lock",
  },
  {
    id: "trade_analysis",
    title: "Trade Analysis",
    shortDesc: "Automated business intelligence modules profiling volume shapes and client toxicity.",
    fullDesc: "Generate deep trading reports analyzing toxic order patterns, provider slippage, and swap anomalies. Empower your treasury desks with precise profitability insights with elegant interactive visual charts.",
    iconName: "TrendingUp",
  },
  {
    id: "platform_security",
    title: "Platform Security",
    shortDesc: "Defensive systems shielding against targeted volumetric DDoS and zero-day threats.",
    fullDesc: "Arm your perimeter with continuous behavior-based mitigation, multi-factor admin login, API payload checking, and continuous simulated red-team attacks to patch configuration gaps instantly.",
    iconName: "ShieldCheck",
  },
  {
    id: "trainings",
    title: "Trainings",
    shortDesc: "Rigorous technical bootcamps for back-office handlers and risk officers.",
    fullDesc: "Accelerate your team's adaptation of MetaTrader admin interfaces, manager consoles, risk limits configuration, and regulatory report compilation through structured sandbox lessons mentored by financial specialists.",
    iconName: "GraduationCap",
  },
  {
    id: "risk_management",
    title: "Risk Management",
    shortDesc: "Real-time automated hedging, exposure calculations, and toxic flow shields.",
    fullDesc: "Establish dynamic margin buffers, multi-book allocation algorithms (A-Book / B-Book balance), and instant hedge executions. Keep physical eyes off the panic buttons with self-adjusting market exposure thresholds.",
    iconName: "Scale",
  },
];