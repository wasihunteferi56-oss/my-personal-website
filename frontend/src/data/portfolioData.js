// Central, editable configuration for content that does not need to live
// in the database (personal intro, links, static copy). Edit this file to
// update the site's text without touching components.

export const personalInfo = {
  name: "Wasihun Teferi",
  initials: "WT",
  location: "Ethiopia",
  role: "Information Technology Student & Aspiring Full-Stack Developer",
  email: "wasihunteferi@example.com", // TODO: replace with real email
  resumeFile: "/resume.pdf", // Place your real resume.pdf in frontend/public/
  typingPhrases: [
    "Information Technology Student",
    "Web Developer",
    "IT Support Enthusiast",
    "Software Engineering Learner",
    "Problem Solver",
    "Technology Enthusiast",
  ],
};

export const heroContent = {
  greeting: "Hello, I'm",
  description:
    "I build practical digital solutions, responsive web applications, and technology-driven projects while continuously developing my skills in software engineering and IT.",
  ctaPrimary: "View My Work",
  ctaSecondary: "Download Resume",
  ctaTertiary: "Let's Connect",
};

export const aboutContent = {
  paragraphs: [
    "I am an Information Technology student from Ethiopia with a strong interest in software development, web technologies, IT support, databases, networking, artificial intelligence, and entrepreneurship.",
    "I enjoy turning ideas into practical digital solutions and learning by building real-world projects.",
    "My current goal is to continue developing my technical skills and become a professional full-stack software engineer capable of building reliable and useful software systems.",
  ],
  values: [
    { name: "Continuous Learning", icon: "book-open" },
    { name: "Problem Solving", icon: "puzzle" },
    { name: "Creativity", icon: "lightbulb" },
    { name: "Practical Innovation", icon: "rocket" },
    { name: "Discipline", icon: "target" },
  ],
  stats: [
    { label: "Projects Built", value: "6+" },
    { label: "Technologies Learned", value: "20+" },
    { label: "Certificates", value: "1" },
    { label: "Currently Learning", value: "AI & Cloud" },
  ],
};

export const education = {
  institution: "Haramaya University",
  program: "Information Technology",
  status: "Current Student",
  topics: [
    "Programming",
    "Database Systems",
    "Computer Networks",
    "Operating Systems",
    "Distributed Systems",
    "Information Storage and Retrieval",
    "Software Design",
    "Project Management",
    "System Analysis and Design",
  ],
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/wasihunteferi", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/wasihunteferi", icon: "linkedin" },
  { name: "Email", url: "mailto:wasihunteferi@example.com", icon: "mail" },
];

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Certificates", to: "/certificates" },
  { label: "Contact", to: "/contact" },
];

export const projectFilters = [
  { label: "All", value: "all" },
  { label: "Web Development", value: "web" },
  { label: "Software Systems", value: "software" },
  { label: "Mobile", value: "mobile" },
  { label: "Business", value: "business" },
  { label: "Entrepreneurship", value: "entrepreneurship" },
];

export const skillCategoryLabels = {
  frontend: "Frontend Development",
  backend: "Backend Development",
  database: "Database",
  it_support: "IT Support & Networking",
  tools: "Tools",
  learning: "Currently Learning",
};
