export type CreativeData = {
  id: string;
  title: string;
  description: string;
  services: string[];
  src: string;
  isImageLoaded: boolean;
};

export const creativeData: CreativeData[] = [
  {
    id: "01",
    title: "Brand Identity & Design",
    description:
      "I shape the foundation of your brand with a strong visual identity and clear design strategy. From logos, color palettes, and marketing assets to impactful social media creatives, I ensure your brand looks cohesive, professional, and memorable across every platform.",
    services: [
      "Creative Direction",
      "Logo & Branding",
      "Brand Identity Buildup",
      "Business Card",
      "Brochure / Flyer",
      "Menu & Product Design",
    ],
    src: "/videos/BrandIdentityDesign.mp4",
    isImageLoaded: false,
  },
  {
    id: "02",
    title: "Motion Graphics & Animation",
    description:
      "I design dynamic 2D visuals and engaging animations that make your brand stand out. From eye-catching explainer videos to sleek digital ads, I craft motion content that captures attention and communicates your message with impact.",
    services: ["Logo Animation", "Motion Graphics", "Social Media Content"],
    src: "/videos/motion.mp4",
    isImageLoaded: false,
  },
  {
    id: "03",
    title: "3D & Visual Effects (VFX)",
    description:
      "I bring ideas to life with immersive 3D models, animations, and realistic visual effects. By blending creativity with technical precision, I enhance advertisements and visual projects with cinematic depth and impact.",
    services: [
      "3D Modeling",
      "3D Animation",
      "Visual Effects",
      "CGI Advertising",
    ],
    src: "/videos/3Dvfx.mp4",
    isImageLoaded: false,
  },
  {
    id: "04",
    title: "Video Post-Production",
    description:
      "I specialize in refining raw footage into professional, high-impact visuals. From precise editing and seamless transitions to color grading, sound design, and finishing touches—I ensure every frame aligns with your vision. The result is a polished, engaging final product that leaves a lasting impression.",
    services: ["Video Editing", "Color Grading"],
    src: "/videos/postproduction.mp4",
    isImageLoaded: false,
  },
];
