// src/app/dashboard/client/carbon/data/carbonServices.ts

/**
 * 🌿 Supacare Carbon Services Catalog
 * --------------------------------------------------------------
 * Contains both:
 * 1️⃣ Universal coreScopes (applicable to all projects)
 * 2️⃣ Category-specific carbonServices with tailored scopes
 */

export const coreScopes = [
  // 🏗️ Core Project Cycle Services
  "Project Design & PDD Development",
  "Baseline & Validation Support",
  "Program of Activities (PoA) Development",
  "Component Project Activity (CPA) Structuring",
  "Methodology Selection & Gap Assessment",
  "Carbon Registry & Documentation Support",

  // 📊 MRV & Quantification
  "Monitoring, Reporting & Verification (MRV)",
  "Field Data Collection & Sampling Design",
  "GHG Quantification & Emission Factor Analysis",
  "Verification & Validation Support (VVB Coordination)",

  // 📈 Accounting & Footprinting
  "Organizational Carbon Footprint (Scope 1, 2, 3)",
  "Product & Service Carbon Footprint (ISO 14067)",
  "Life Cycle Assessment (LCA)",
  "Corporate GHG Inventory Development",
  "Decarbonization & Net-Zero Strategy Development",

  // 💰 Finance & Trading
  "Carbon Credit Trading & Finance Advisory",
  "Voluntary & Compliance Market Registration",
  "Carbon Pricing & Offset Mechanism Training",
  "Investment Readiness Assessment",
  "Carbon Asset Management Strategy",

  // 🌍 ESG & Climate Reporting
  "ESG Reporting & Climate Disclosure (CDP, TCFD, GRI)",
  "Carbon Neutrality Certification Support",
]

export const carbonServices = [
  {
    category: "Clean Cooking & Energy Efficiency",
    description:
      "Supporting modern energy transitions for households and institutions through efficient cooking technologies and adoption studies.",
    scopes: [
      "Household Energy Efficiency (Clean Cooking)",
      "Institutional Energy Efficiency (Schools, Hospitals)",
      "Stove Performance & Durability Testing",
      "Fuel Switching and Adoption Studies",
      "Water Boiling Tests (WBT)",
      "Kitchen Performance Tests (KPT)",
      "Controlled Cooking Tests (CCT)",
      "Baseline Surveys for Households and Institutions",
      "Household Energy Transition Studies",
    ],
  },
  {
    category: "Renewable Energy",
    description:
      "Developing clean energy generation and distribution systems to replace fossil fuels and drive decarbonization.",
    scopes: [
      "Solar PV Project Design & Implementation",
      "Wind Energy Feasibility Studies",
      "Small Hydro Project Development",
      "Biogas and Biomass Power Projects",
      "Energy Efficiency in Industrial Processes",
      "Renewable Power Purchase Agreement (PPA) Advisory",
      "Carbon Accounting for Renewable Energy Assets",
      "Grid Integration and Energy Storage Studies",
    ],
  },
  {
    category: "Waste-to-Energy",
    description:
      "Transforming waste streams into sustainable energy while reducing methane and CO₂ emissions from dumpsites.",
    scopes: [
      "Municipal Solid Waste (MSW) to Energy Feasibility Studies",
      "Landfill Gas Capture and Utilization",
      "Anaerobic Digestion & Biogas Projects",
      "Industrial Waste Heat Recovery",
      "Waste Segregation and Collection Baseline Studies",
      "Methane Avoidance Projects (CDM / Verra)",
      "Carbon Credit Quantification for Waste Projects",
    ],
  },
  {
    category: "Forestry & Land Use",
    description:
      "Promoting sustainable forest management and land-based carbon sequestration under global REDD+ frameworks.",
    scopes: [
      "REDD+ (Reducing Emissions from Deforestation & Degradation)",
      "Afforestation, Reforestation & Revegetation (ARR)",
      "Improved Forest Management (IFM)",
      "Agroforestry & Soil Carbon Projects",
      "Community Forestry Initiatives",
      "Forest Carbon Monitoring and Remote Sensing (MRV)",
      "Biodiversity and Co-benefits Assessment",
    ],
  },
  {
    category: "Blue Carbon",
    description:
      "Restoring and conserving coastal and marine ecosystems for carbon storage, biodiversity, and livelihood resilience.",
    scopes: [
      "Mangrove Restoration Projects",
      "Seagrass Meadow Conservation",
      "Saltmarsh Rehabilitation",
      "Wetland Restoration and Management",
      "Coastal Community Engagement for Blue Carbon",
      "Baseline Studies for Coastal Ecosystems",
      "Carbon Stock Assessment and Monitoring (MRV)",
    ],
  },
  {
    category: "Industrial Process & Carbon Advisory",
    description:
      "Supporting industrial clients with emissions tracking, decarbonization strategy, and access to carbon finance.",
    scopes: [
      "Industrial Process Emission Reduction Feasibility",
      "Fuel Switching and Energy Optimization Studies",
      "Industrial Waste Heat Recovery Systems",
      "Process Improvement for GHG Reduction",
      "ISO 14064 / 50001 Implementation Support",
      "Carbon Neutral Product Certification Assistance",
      "Carbon Market Entry & Project Validation (Verra/GS)",
    ],
  },
]
