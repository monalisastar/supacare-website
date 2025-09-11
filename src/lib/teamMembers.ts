// lib/teamMembers.ts
export type TeamMember = {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  email?: string;
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Virginia Njeri",
    role: "Managing Director(MD)",
    photoUrl: "/images/virginia.jpg",
    bio: `Virginia Njeri is the Senior Consultant at Supacare Solutions, a company specializing in sustainable waste management, composting, and carbon advisory services. 
With over 7 years of experience developing carbon projects and 7 years as a carbon projects auditor, Virginia offers a wealth of technical expertise and practical insights into global carbon markets and climate action. 
Her background in Community Development and Business Management uniquely positions her to bridge the gap between grassroots impact and strategic climate solutions. 
At Supacare Solutions, she leads initiatives that integrate circular economy principles, focusing on community-based waste management and composting innovations that reduce emissions and enhance soil health. 
Virginia has successfully developed and audited projects across various standards, including the Verified Carbon Standard (VCS), Gold Standard (GS), Clean Development Mechanism (CDM), and Article 6 frameworks. 
Her work covers household energy, waste-to-resource programs, and nature-based solutions, aligning environmental sustainability with socio-economic development. 
At Supacare Solutions, Virginia is dedicated to advancing inclusive climate solutions, equipping communities with the tools and knowledge to actively engage in the carbon economy.`,
    email: "virginia@Supacare.co.ke",
    linkedin: "https://linkedin.com/in/virginia-njeri",
  },
  {
    name: "Brian Njau Njata",
    role: "Chief Operations Officer (COO)",
    photoUrl: "/images/brian.jpg",
    bio: `Brian Njau Njata is the visionary director of Supacare Solutions, a company dedicated to sustainable waste management and sanitation. 
Under his leadership, Supacare Solutions has developed innovative strategies to promote efficient waste disposal, recycling, and eco-friendly sanitation services, ensuring cleaner and healthier communities. 
With a strong background in law and business, Brian integrates circular economy principles, carbon footprint reduction strategies, and compliance with environmental regulations to drive sustainability. 
His expertise in greenhouse gas (GHG) accounting and carbon markets further supports the company’s mission to minimize environmental impact while enhancing waste management efficiency. 
Beyond Supacare Solutions, Brian is actively involved in governance, legal consultancy, and climate action initiatives. 
His leadership in Silver Dollar Self Help Group and ongoing research in carbon offset projects reflect his commitment to ethical business practices and environmental stewardship. 
Driven by a passion for sustainability, innovation, and public health, Brian continues to position Supacare Solutions as a leader in waste management and sanitation, creating lasting environmental and social impact.`,
    email: "brian@Supacare.co.ke",
    linkedin: "https://linkedin.com/in/brian-njau",
  },
  {
    name: "Trizer Chepkemboi Rutto",
    role: "Consultant",
    photoUrl: "/images/trizer.jpg",
    bio: `Trizer Chepkemboi is a dedicated Environmental Science student at Jomo Kenyatta University of Agriculture and Technology (JKUAT) with a strong passion for sustainability, climate action, and responsible waste management. 
As part of the Supacare Solutions team, she plays a key role in promoting eco-friendly practices, supporting clients in meeting environmental compliance standards, and helping communities transition to sustainable waste solutions. 
Her academic background, combined with hands-on experience in recycling, composting, and environmental awareness campaigns, makes her a valuable asset in driving forward Supacare’s mission for a cleaner, greener Kenya. 
Trizer is committed to educating the public, collaborating with stakeholders, and continuously innovating to make environmental conservation a lifestyle.`,
    email: "trizer@Supacare.co.ke",
  },
];
