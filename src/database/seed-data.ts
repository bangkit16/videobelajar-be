// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface UserSeed {
  countryCode: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage: string | null;
}

export interface CatSeed {
  slug: string;
  name: string;
}

export interface TutorSeed {
  userName: string;
  avatar: string;
  company: string;
  role: string;
}

export interface MaterialSeed {
  sortOrder: number;
  title: string;
  type: "video" | "document" | "quiz";
  duration: number;
  linkMaterial: string | null;
  linkFile: string | null;
  passingScore: number | null;
}

export interface ModuleSeed {
  sortOrder: number;
  title: string;
  duration: number;
  materials: MaterialSeed[];
}

export interface ClassSeed {
  categorySlug: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  promoEndsIn: string | null;
  bgImage: string;
  duration: number;
  language: string;
  totalVideos: number;
  totalDocuments: number;
  hasPretest: boolean;
  hasFinalExam: boolean;
  hasCertificate: boolean;
  tutors: TutorSeed[];
  modules: ModuleSeed[];
}

export interface PreTestSeed {
  sortOrder: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

export interface OrderSeed {
  classSlug: string;
  userEmail: string;
  noInvoice: string;
  adminFee: number;
  totalPayment: number;
  status: string;
}

export interface MyClassSeed {
  classSlug: string;
  userEmail: string;
  status: string;
  completedModule: number;
}

export interface ReviewSeed {
  classSlug: string;
  rating: number;
  text: string;
  alumniOfBatch: number | null;
}

// ─── USERS ────────────────────────────────────────────────────────────────────

export const users: UserSeed[] = [
  {
    countryCode: "+62",
    fullname: "Jennie Ruby Jane",
    username: "rubyjane",
    email: "rubyjane@gmail.com",
    password: "password123",
    phoneNumber: "81234567890",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    countryCode: "+62",
    fullname: "Bangkit Maulana Caniago",
    username: "bangkit16",
    email: "bangkit@gmail.com",
    password: "password123",
    phoneNumber: "877657652734",
    profileImage: "https://i.pravatar.cc/40",
  },
];

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export const categories: CatSeed[] = [
  { slug: "pemasaran", name: "Pemasaran" },
  { slug: "desain", name: "Desain" },
  { slug: "pengembangan-diri", name: "Pengembangan Diri" },
  { slug: "bisnis", name: "Bisnis" },
  { slug: "digital-teknologi", name: "Digital & Teknologi" },
];

// ─── CLASSES ──────────────────────────────────────────────────────────────────

export const classes: ClassSeed[] = [
  {
    categorySlug: "digital-teknologi",
    title: "Full-Stack Web Development Bootcamp",
    slug: "full-stack-web-development-bootcamp",
    description:
      "Kuasai JavaScript, React, dan Node.js dari dasar hingga siap kerja dalam 3 bulan. Belajar bersama mentor profesional.",
    price: 450000,
    originalPrice: 500000,
    discount: 50,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 360,
    language: "Bahasa Indonesia",
    totalVideos: 49,
    totalDocuments: 7,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Rian Hidayat", avatar: "https://i.pravatar.cc/40?img=2", company: "Gojek", role: "Senior Software Engineer" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Pengenalan Full-Stack", duration: 36,
        materials: [
          { sortOrder: 1, title: "The basics of user experience design", type: "video", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Jobs in the field of user experience", type: "video", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "The product development life cycle", type: "video", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 2, title: "React & Node.js", duration: 48,
        materials: [
          { sortOrder: 1, title: "React Fundamental", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Node.js & Express", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
    ],
  },
  {
    categorySlug: "desain",
    title: "UI/UX Design Masterclass",
    slug: "uiux-design-masterclass",
    description:
      "Belajar UI/UX modern menggunakan Figma dengan studi kasus proyek aplikasi nyata.",
    price: 350000,
    originalPrice: 400000,
    discount: 12,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 240,
    language: "Bahasa Indonesia",
    totalVideos: 32,
    totalDocuments: 5,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Dewi Lestari", avatar: "https://i.pravatar.cc/40?img=1", company: "Tokopedia", role: "Lead Product Designer" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Pengenalan UI/UX Design", duration: 41,
        materials: [
          { sortOrder: 1, title: "Selamat Datang", type: "video", duration: 8, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Roadmap UI/UX Designer", type: "video", duration: 15, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Tools yang Digunakan", type: "document", duration: 8, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Design Thinking", duration: 102,
        materials: [
          { sortOrder: 1, title: "Empathize", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Define Problem", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Ideation", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Mini Case Study", type: "document", duration: 40, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "User Research", duration: 114,
        materials: [
          { sortOrder: 1, title: "User Persona", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Empathy Map", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Customer Journey Map", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Research Assignment", type: "document", duration: 50, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "Wireframing", duration: 135,
        materials: [
          { sortOrder: 1, title: "Low Fidelity Wireframe", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "High Fidelity Wireframe", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Information Architecture", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Wireframe Challenge", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "Figma Fundamental", duration: 107,
        materials: [
          { sortOrder: 1, title: "Workspace Figma", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Frame & Layout", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Auto Layout", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Components", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Design System", duration: 76,
        materials: [
          { sortOrder: 1, title: "Typography", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Color System", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Spacing & Grid", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Iconography", type: "video", duration: 16, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Interactive Prototype", duration: 109,
        materials: [
          { sortOrder: 1, title: "Prototype Connection", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Animation", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Smart Animate", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Interactive Component", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Usability Testing", duration: 107,
        materials: [
          { sortOrder: 1, title: "Planning User Testing", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Conduct Interview", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Analyze Feedback", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Improve Design", type: "document", duration: 45, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Developer Handoff", duration: 43,
        materials: [
          { sortOrder: 1, title: "Inspect Panel", type: "video", duration: 16, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Export Assets", type: "video", duration: 15, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Design Documentation", type: "document", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 10, title: "Capstone Project", duration: 303,
        materials: [
          { sortOrder: 1, title: "Brief Project", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Mendesain Aplikasi Mobile", type: "document", duration: 180, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Presentasi Portfolio", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Final Assessment", type: "quiz", duration: 45, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "digital-teknologi",
    title: "Data Science & Machine Learning",
    slug: "data-science-machine-learning",
    description:
      "Mulai karir data analitik dengan menguasai Python, SQL, dan visualisasi data.",
    price: 500000,
    originalPrice: 650000,
    discount: 23,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 480,
    language: "Bahasa Indonesia",
    totalVideos: 64,
    totalDocuments: 10,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Budi Santoso", avatar: "https://i.pravatar.cc/40?img=3", company: "Bukalapak", role: "Data Scientist Specialist" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Pengenalan Data Science", duration: 46,
        materials: [
          { sortOrder: 1, title: "Selamat Datang", type: "video", duration: 8, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Roadmap Data Scientist", type: "video", duration: 16, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Instalasi Python & VS Code", type: "document", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Python Programming", duration: 138,
        materials: [
          { sortOrder: 1, title: "Variable & Data Type", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Function & Loop", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Object Oriented Programming", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Mini Project Python", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "NumPy & Pandas", duration: 109,
        materials: [
          { sortOrder: 1, title: "NumPy Array", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Pandas DataFrame", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Cleaning Data", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Data Transformation", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "SQL for Data Analysis", duration: 130,
        materials: [
          { sortOrder: 1, title: "Basic SQL", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "JOIN & Aggregate", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Window Function", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Case Study SQL", type: "document", duration: 50, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "Exploratory Data Analysis", duration: 92,
        materials: [
          { sortOrder: 1, title: "EDA Workflow", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Missing Value", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Outlier Detection", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Feature Engineering", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Data Visualization", duration: 140,
        materials: [
          { sortOrder: 1, title: "Matplotlib", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Seaborn", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Interactive Chart", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Dashboard Project", type: "document", duration: 70, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Statistics for Machine Learning", duration: 83,
        materials: [
          { sortOrder: 1, title: "Descriptive Statistics", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Probability", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Hypothesis Testing", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Machine Learning Fundamental", duration: 106,
        materials: [
          { sortOrder: 1, title: "Supervised Learning", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Unsupervised Learning", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Model Evaluation", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Cross Validation", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Scikit-Learn", duration: 174,
        materials: [
          { sortOrder: 1, title: "Linear Regression", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Decision Tree", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Random Forest", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Classification Project", type: "document", duration: 90, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 10, title: "Deep Learning", duration: 113,
        materials: [
          { sortOrder: 1, title: "Artificial Neural Network", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "TensorFlow & Keras", type: "video", duration: 38, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Image Classification", type: "video", duration: 40, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 11, title: "Deployment Machine Learning", duration: 356,
        materials: [
          { sortOrder: 1, title: "Membuat API dengan FastAPI", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Deploy Streamlit", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Capstone Project", type: "document", duration: 240, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Final Assessment", type: "quiz", duration: 60, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "pemasaran",
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    description:
      "Strategi jitu optimasi SEO, Google Ads, dan Copywriting untuk menaikkan penjualan.",
    price: 250000,
    originalPrice: 350000,
    discount: 28,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 180,
    language: "Bahasa Indonesia",
    totalVideos: 24,
    totalDocuments: 4,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Siti Rahma", avatar: "https://i.pravatar.cc/40?img=4", company: "Shopee", role: "Growth Marketing Manager" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Introduction to Digital Marketing", duration: 33,
        materials: [
          { sortOrder: 1, title: "Welcome & Course Overview", type: "video", duration: 8, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Digital Marketing Roadmap", type: "video", duration: 15, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Marketing Strategy", duration: 84,
        materials: [
          { sortOrder: 1, title: "Market Research", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Target Audience", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Customer Persona", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Marketing Funnel", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "Content Marketing", duration: 123,
        materials: [
          { sortOrder: 1, title: "Content Planning", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Copywriting", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Storytelling", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Content Calendar", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "Social Media Marketing", duration: 87,
        materials: [
          { sortOrder: 1, title: "Instagram Marketing", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "TikTok Marketing", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "LinkedIn Marketing", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Scheduling Content", type: "video", duration: 16, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "Search Engine Optimization", duration: 97,
        materials: [
          { sortOrder: 1, title: "SEO Fundamental", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Keyword Research", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "On-Page SEO", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Technical SEO", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Paid Advertising", duration: 104,
        materials: [
          { sortOrder: 1, title: "Google Ads", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Meta Ads", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Campaign Optimization", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "A/B Testing", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Email Marketing & Automation", duration: 66,
        materials: [
          { sortOrder: 1, title: "Email Campaign", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Customer Segmentation", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Marketing Automation", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Analytics & Reporting", duration: 140,
        materials: [
          { sortOrder: 1, title: "Google Analytics 4", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Conversion Tracking", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Campaign Report", type: "document", duration: 90, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Capstone Project", duration: 285,
        materials: [
          { sortOrder: 1, title: "Digital Marketing Strategy", type: "document", duration: 180, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Campaign Presentation", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Assessment", type: "quiz", duration: 45, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "bisnis",
    title: "Product Management Fundamental",
    slug: "product-management-fundamental",
    description:
      "Pelajari framework manajemen produk, riset user, hingga peluncuran fitur sukses.",
    price: 300000,
    originalPrice: 400000,
    discount: 25,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 300,
    language: "Bahasa Indonesia",
    totalVideos: 38,
    totalDocuments: 6,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Andi Wijaya", avatar: "https://i.pravatar.cc/40?img=5", company: "Blibli", role: "Senior Product Manager" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Introduction to Product Management", duration: 46,
        materials: [
          { sortOrder: 1, title: "Welcome to Product Management", type: "video", duration: 8, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Role of Product Manager", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Roadmap Product Manager", type: "document", duration: 10, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Product Discovery", duration: 126,
        materials: [
          { sortOrder: 1, title: "Problem Identification", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Market Research", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Customer Interview", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Product Discovery Assignment", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "User Research", duration: 108,
        materials: [
          { sortOrder: 1, title: "User Persona", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Customer Journey Map", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Empathy Mapping", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Research Report", type: "document", duration: 50, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "Product Strategy", duration: 94,
        materials: [
          { sortOrder: 1, title: "Vision & Mission", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Value Proposition", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Business Model Canvas", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Go-To-Market Strategy", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "Product Roadmap", duration: 139,
        materials: [
          { sortOrder: 1, title: "Roadmap Planning", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Prioritization Framework", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "RICE & MoSCoW", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Roadmap Exercise", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Agile & Scrum", duration: 84,
        materials: [
          { sortOrder: 1, title: "Agile Manifesto", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Scrum Framework", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Sprint Planning", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Sprint Review", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Product Metrics", duration: 92,
        materials: [
          { sortOrder: 1, title: "North Star Metric", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "OKR & KPI", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "AARRR Funnel", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Product Analytics", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Stakeholder Management", duration: 56,
        materials: [
          { sortOrder: 1, title: "Working with Designers", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Working with Engineers", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Communication Skills", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Product Launch", duration: 62,
        materials: [
          { sortOrder: 1, title: "Release Planning", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Launch Checklist", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Post Launch Evaluation", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 10, title: "Capstone Project", duration: 285,
        materials: [
          { sortOrder: 1, title: "Build Product Requirement Document (PRD)", type: "document", duration: 180, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Pitching Product Idea", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Assessment", type: "quiz", duration: 45, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "digital-teknologi",
    title: "Cyber Security & Ethical Hacking",
    slug: "cyber-security-ethical-hacking",
    description:
      "Pahami celah keamanan jaringan, enkripsi, dan teknik penetrasi sistem komputer.",
    price: 600000,
    originalPrice: 750000,
    discount: 20,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 540,
    language: "Bahasa Indonesia",
    totalVideos: 72,
    totalDocuments: 12,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Fahmi Idris", avatar: "https://i.pravatar.cc/40?img=6", company: "Dana", role: "Security Analyst" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Introduction to Cyber Security", duration: 58,
        materials: [
          { sortOrder: 1, title: "Welcome to Cyber Security", type: "video", duration: 10, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Cyber Security Career Path", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "CIA Triad", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Networking Fundamental", duration: 134,
        materials: [
          { sortOrder: 1, title: "OSI Model", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "TCP/IP", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Subnetting", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Network Lab", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "Linux for Ethical Hacker", duration: 138,
        materials: [
          { sortOrder: 1, title: "Linux Command Line", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "File Permission", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Bash Scripting", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Linux Practice", type: "document", duration: 70, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "Web Security", duration: 89,
        materials: [
          { sortOrder: 1, title: "HTTP & HTTPS", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Cookie & Session", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Authentication", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Common Vulnerabilities", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "OWASP Top 10", duration: 102,
        materials: [
          { sortOrder: 1, title: "SQL Injection", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Cross Site Scripting (XSS)", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Broken Authentication", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Access Control", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Security Tools", duration: 128,
        materials: [
          { sortOrder: 1, title: "Nmap", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Wireshark", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Burp Suite", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Metasploit Framework", type: "video", duration: 40, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Penetration Testing", duration: 98,
        materials: [
          { sortOrder: 1, title: "Reconnaissance", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Scanning", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Exploitation", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Privilege Escalation", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Incident Response", duration: 72,
        materials: [
          { sortOrder: 1, title: "Incident Handling", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Digital Forensics", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Log Analysis", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Capstone Project", duration: 390,
        materials: [
          { sortOrder: 1, title: "Web Penetration Testing", type: "document", duration: 240, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Security Assessment Report", type: "document", duration: 90, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Assessment", type: "quiz", duration: 60, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "digital-teknologi",
    title: "Mobile App Development with Flutter",
    slug: "mobile-app-development-with-flutter",
    description:
      "Bangun aplikasi Android dan iOS sekaligus menggunakan satu codebase framework Flutter.",
    price: 400000,
    originalPrice: 550000,
    discount: 27,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 420,
    language: "Bahasa Indonesia",
    totalVideos: 55,
    totalDocuments: 8,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Introduction to Flutter", duration: 45,
        materials: [
          { sortOrder: 1, title: "Welcome to Flutter", type: "video", duration: 8, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Flutter Roadmap", type: "video", duration: 15, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Setup Android Studio & VS Code", type: "document", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Dart Programming", duration: 130,
        materials: [
          { sortOrder: 1, title: "Variable & Data Type", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Function & Class", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Null Safety", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Mini Project Dart", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "Flutter Widget", duration: 97,
        materials: [
          { sortOrder: 1, title: "Stateless Widget", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Stateful Widget", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Layout & Navigation", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Responsive UI", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "State Management", duration: 152,
        materials: [
          { sortOrder: 1, title: "Provider", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Riverpod", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Bloc Overview", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "State Management Practice", type: "document", duration: 70, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "Networking & REST API", duration: 100,
        materials: [
          { sortOrder: 1, title: "HTTP Package", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "JSON Parsing", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Authentication JWT", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Pagination API", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Firebase Integration", duration: 108,
        materials: [
          { sortOrder: 1, title: "Firebase Authentication", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Cloud Firestore", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Firebase Storage", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Push Notification (FCM)", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Local Database", duration: 62,
        materials: [
          { sortOrder: 1, title: "Shared Preferences", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Hive Database", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Offline First", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Clean Architecture", duration: 74,
        materials: [
          { sortOrder: 1, title: "Folder Structure", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Repository Pattern", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Dependency Injection", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Publish Application", duration: 60,
        materials: [
          { sortOrder: 1, title: "Generate APK & AAB", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Play Store Publishing", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "App Signing", type: "video", duration: 16, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 10, title: "Capstone Project", duration: 405,
        materials: [
          { sortOrder: 1, title: "Build E-Commerce App", type: "document", duration: 300, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Code Review", type: "video", duration: 45, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Assessment", type: "quiz", duration: 60, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "digital-teknologi",
    title: "DevOps Engineering Roadmap",
    slug: "devops-engineering-roadmap",
    description:
      "Otomatisasi deploy software menggunakan Docker, Kubernetes, dan CI/CD pipeline.",
    price: 550000,
    originalPrice: 700000,
    discount: 21,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 480,
    language: "Bahasa Indonesia",
    totalVideos: 60,
    totalDocuments: 9,
    hasPretest: true,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Kevin Pratama", avatar: "https://i.pravatar.cc/40?img=8", company: "Traveloka", role: "DevOps Engineer" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Introduction to DevOps", duration: 50,
        materials: [
          { sortOrder: 1, title: "Welcome to DevOps", type: "video", duration: 10, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "DevOps Culture", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Roadmap DevOps Engineer", type: "document", duration: 12, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Linux Administration", duration: 147,
        materials: [
          { sortOrder: 1, title: "Linux Command Line", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "User & Permission", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Shell Scripting", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Linux Practice", type: "document", duration: 70, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "Git & GitHub", duration: 114,
        materials: [
          { sortOrder: 1, title: "Git Fundamental", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Branching Strategy", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Pull Request Workflow", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Git Collaboration", type: "document", duration: 50, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "Docker", duration: 108,
        materials: [
          { sortOrder: 1, title: "Docker Installation", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Docker Image", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Docker Container", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Docker Compose", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "CI/CD Pipeline", duration: 171,
        materials: [
          { sortOrder: 1, title: "Introduction to CI/CD", type: "video", duration: 18, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "GitHub Actions", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Build Automation", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Deployment Workflow", type: "document", duration: 90, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "Cloud Computing", duration: 101,
        materials: [
          { sortOrder: 1, title: "AWS Fundamentals", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "EC2", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "S3 Storage", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "RDS Database", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Kubernetes", duration: 119,
        materials: [
          { sortOrder: 1, title: "Kubernetes Architecture", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Pod & Deployment", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Service & Ingress", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Helm Chart", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "Monitoring & Logging", duration: 78,
        materials: [
          { sortOrder: 1, title: "Prometheus", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Grafana", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Centralized Logging", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Infrastructure as Code", duration: 89,
        materials: [
          { sortOrder: 1, title: "Terraform Fundamentals", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Provision Infrastructure", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Terraform Best Practice", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 10, title: "Capstone Project", duration: 450,
        materials: [
          { sortOrder: 1, title: "Deploy Full-Stack Application", type: "document", duration: 300, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Infrastructure Review", type: "document", duration: 90, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Assessment", type: "quiz", duration: 60, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
  {
    categorySlug: "digital-teknologi",
    title: "Python for Automation & Scripting",
    slug: "python-for-automation-scripting",
    description:
      "Tingkatkan produktivitas kerja dengan membuat bot dan skrip otomatisasi Python.",
    price: 200000,
    originalPrice: 300000,
    discount: 33,
    promoEndsIn: "2026-08-31 23:59:59",
    bgImage: "https://picsum.photos/1400/800?education",
    duration: 150,
    language: "Bahasa Indonesia",
    totalVideos: 18,
    totalDocuments: 3,
    hasPretest: false,
    hasFinalExam: true,
    hasCertificate: true,
    tutors: [
      { userName: "Eka Putri", avatar: "https://i.pravatar.cc/40?img=9", company: "Telkom", role: "Automation Engineer" },
      { userName: "Jessica Tan", avatar: "https://i.pravatar.cc/40?img=7", company: "tiket.com", role: "Mobile Developer" },
    ],
    modules: [
      {
        sortOrder: 1, title: "Introduction to Python", duration: 45,
        materials: [
          { sortOrder: 1, title: "Welcome to Python", type: "video", duration: 10, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Install Python & VS Code", type: "video", duration: 15, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Python Roadmap", type: "document", duration: 10, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Quiz Fundamental", type: "quiz", duration: 10, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
      {
        sortOrder: 2, title: "Python Fundamental", duration: 137,
        materials: [
          { sortOrder: 1, title: "Variables & Data Types", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Conditional & Loop", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Function", type: "video", duration: 25, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Mini Project Python", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 3, title: "Object Oriented Programming", duration: 136,
        materials: [
          { sortOrder: 1, title: "Class & Object", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Inheritance", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Polymorphism", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "OOP Practice", type: "document", duration: 70, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 4, title: "Automation with Python", duration: 102,
        materials: [
          { sortOrder: 1, title: "Working with Files", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Excel Automation", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Email Automation", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Scheduling Automation", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 5, title: "Web Scraping", duration: 168,
        materials: [
          { sortOrder: 1, title: "BeautifulSoup", type: "video", duration: 26, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Requests", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Scraping Dynamic Website", type: "video", duration: 32, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Web Scraping Project", type: "document", duration: 90, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 6, title: "REST API Development", duration: 111,
        materials: [
          { sortOrder: 1, title: "FastAPI Introduction", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "CRUD API", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Authentication JWT", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Deploy FastAPI", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 7, title: "Artificial Intelligence", duration: 205,
        materials: [
          { sortOrder: 1, title: "Introduction to LLM", type: "video", duration: 22, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Prompt Engineering", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "OpenAI API", type: "video", duration: 35, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 4, title: "Building AI Chatbot", type: "document", duration: 120, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 8, title: "LangChain & AI Workflow", duration: 82,
        materials: [
          { sortOrder: 1, title: "LangChain Basics", type: "video", duration: 30, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "RAG Introduction", type: "video", duration: 28, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Memory & Tools", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 9, title: "Deploy AI Application", duration: 60,
        materials: [
          { sortOrder: 1, title: "Deploy with Docker", type: "video", duration: 24, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Deploy to Railway", type: "video", duration: 20, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Environment Variables", type: "video", duration: 16, linkMaterial: null, linkFile: null, passingScore: null },
        ],
      },
      {
        sortOrder: 10, title: "Capstone Project", duration: 420,
        materials: [
          { sortOrder: 1, title: "Build AI Assistant", type: "document", duration: 300, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 2, title: "Project Presentation", type: "document", duration: 60, linkMaterial: null, linkFile: null, passingScore: null },
          { sortOrder: 3, title: "Final Assessment", type: "quiz", duration: 60, linkMaterial: null, linkFile: null, passingScore: 80 },
        ],
      },
    ],
  },
];

// ─── PRETEST QUESTIONS ─────────────────────────────────────────────────────────

export const pretestQuestions: PreTestSeed[] = [
  {
    sortOrder: 1,
    question:
      "Memikirkan dan mengantisipasi secara teliti adanya user secara tidak sengaja mengutak-atik konfigurasi, namun dapat diatasi dengan membuat default yang mengurangi kepanikan pada user adalah pengertian dari ...",
    optionA: "Memikirkan tentang default *",
    optionB: "Mempertimbangkan page layout berdasarkan suatu tujuan tertentu",
    optionC: "Memastikan bahwa sistem berjalan sesuai dengan apa yang terjadi saat itu juga",
    optionD: "Menciptakan konsistensi dan menggunakan elemen UI umum",
    correctAnswer: "A",
  },
  {
    sortOrder: 2,
    question: "Apa kepanjangan dari UI?",
    optionA: "User Interface",
    optionB: "User Integration",
    optionC: "Unified Interface",
    optionD: "Universal Interaction",
    correctAnswer: "A",
  },
  {
    sortOrder: 3,
    question: "Apa yang dimaksud dengan UX Design?",
    optionA: "Proses mendesain tampilan visual",
    optionB: "Proses meningkatkan kepuasan pengguna dengan meningkatkan kegunaan dan aksesibilitas",
    optionC: "Proses membuat kode program",
    optionD: "Proses memasarkan produk digital",
    correctAnswer: "B",
  },
];

// ─── ORDERS ────────────────────────────────────────────────────────────────────

export const orders: OrderSeed[] = [
  { classSlug: "full-stack-web-development-bootcamp", userEmail: "rubyjane@gmail.com", noInvoice: "INV/VI/10062023-1", adminFee: 5000, totalPayment: 455000, status: "success" },
  { classSlug: "uiux-design-masterclass",           userEmail: "rubyjane@gmail.com", noInvoice: "INV/VI/10062023-2", adminFee: 5000, totalPayment: 355000, status: "success" },
  { classSlug: "data-science-machine-learning",      userEmail: "rubyjane@gmail.com", noInvoice: "INV/VI/10062023-3", adminFee: 5000, totalPayment: 505000, status: "pending" },
  { classSlug: "digital-marketing-specialist",       userEmail: "bangkit@gmail.com", noInvoice: "INV/VI/10062023-4", adminFee: 5000, totalPayment: 255000, status: "success" },
  { classSlug: "product-management-fundamental",     userEmail: "bangkit@gmail.com", noInvoice: "INV/VI/10062023-5", adminFee: 5000, totalPayment: 305000, status: "failed" },
];

// ─── MYCLASS ───────────────────────────────────────────────────────────────────

export const myClasses: MyClassSeed[] = [
  { classSlug: "full-stack-web-development-bootcamp", userEmail: "rubyjane@gmail.com", status: "completed", completedModule: 2 },
  { classSlug: "uiux-design-masterclass",             userEmail: "rubyjane@gmail.com", status: "active",    completedModule: 2 },
  { classSlug: "product-management-fundamental",      userEmail: "bangkit@gmail.com",  status: "active",    completedModule: 2 },
];

// ─── REVIEWS ───────────────────────────────────────────────────────────────────

export const reviews: ReviewSeed[] = [
  { classSlug: "full-stack-web-development-bootcamp", rating: 5,   text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist.", alumniOfBatch: 2 },
  { classSlug: "full-stack-web-development-bootcamp", rating: 3.5, text: "Kursus ini sangat membantu karir saya.",                              alumniOfBatch: 4 },
  { classSlug: "uiux-design-masterclass",             rating: 5,   text: "Saya benar-benar belajar UI/UX dari nol. Sekarang sudah bisa membuat prototype interaktif di Figma.",                    alumniOfBatch: 6 },
  { classSlug: "uiux-design-masterclass",             rating: 4.9, text: "Materinya runtut mulai dari design thinking sampai handoff ke developer.",                                            alumniOfBatch: 5 },
  { classSlug: "uiux-design-masterclass",             rating: 5,   text: "Project akhirnya benar-benar seperti studi kasus startup.",                                                            alumniOfBatch: 8 },
  { classSlug: "uiux-design-masterclass",             rating: 4.8, text: "Penjelasan mengenai Auto Layout dan Design System sangat mudah dipahami.",                                            alumniOfBatch: 7 },
  { classSlug: "uiux-design-masterclass",             rating: 5,   text: "Mentor memberikan banyak insight mengenai workflow UI/UX di perusahaan teknologi.",                                     alumniOfBatch: 9 },
  { classSlug: "data-science-machine-learning",      rating: 5,   text: "Materi Python dan Machine Learning dijelaskan dari dasar hingga implementasi project.",                                 alumniOfBatch: 5 },
  { classSlug: "data-science-machine-learning",      rating: 4.9, text: "Bagian data visualization menggunakan Matplotlib dan Seaborn sangat membantu.",                                        alumniOfBatch: 7 },
  { classSlug: "data-science-machine-learning",      rating: 5,   text: "Project prediksi harga rumah dan klasifikasi gambar sangat menarik.",                                                  alumniOfBatch: 6 },
  { classSlug: "data-science-machine-learning",      rating: 4.8, text: "Mentor menjelaskan konsep statistik dengan cara yang mudah dipahami.",                                                 alumniOfBatch: 8 },
  { classSlug: "data-science-machine-learning",      rating: 5,   text: "Materinya lengkap mulai dari Python, SQL, hingga deployment ML.",                                                      alumniOfBatch: 9 },
  { classSlug: "digital-marketing-specialist",       rating: 5,   text: "Setelah mengikuti course ini saya berhasil meningkatkan penjualan UMKM.",                                              alumniOfBatch: 4 },
  { classSlug: "digital-marketing-specialist",       rating: 4.9, text: "Materinya sangat lengkap mulai dari SEO, social media marketing hingga analytics.",                                     alumniOfBatch: 6 },
  { classSlug: "digital-marketing-specialist",       rating: 5,   text: "Saya jadi memahami cara membuat strategi marketing berdasarkan data.",                                                 alumniOfBatch: 5 },
  { classSlug: "digital-marketing-specialist",       rating: 4.8, text: "Penjelasan Meta Ads dan Google Ads sangat mudah dipahami.",                                                            alumniOfBatch: 7 },
  { classSlug: "digital-marketing-specialist",       rating: 5,   text: "Capstone project membantu saya membangun digital marketing plan.",                                                     alumniOfBatch: 8 },
  { classSlug: "product-management-fundamental",     rating: 5,   text: "Course ini membuka wawasan saya tentang bagaimana sebuah produk digital dikembangkan.",                                 alumniOfBatch: 3 },
  { classSlug: "product-management-fundamental",     rating: 4.9, text: "Materi product discovery dan product roadmap sangat mudah dipahami.",                                                  alumniOfBatch: 5 },
  { classSlug: "product-management-fundamental",     rating: 5,   text: "Capstone project membuat saya lebih percaya diri saat interview Product Manager.",                                      alumniOfBatch: 4 },
  { classSlug: "product-management-fundamental",     rating: 4.8, text: "Belajar Agile, Scrum, hingga KPI produk dalam satu course yang sangat lengkap.",                                        alumniOfBatch: 6 },
  { classSlug: "product-management-fundamental",     rating: 5,   text: "Materinya sangat relevan dengan workflow Product Manager di startup.",                                                 alumniOfBatch: 7 },
  { classSlug: "cyber-security-ethical-hacking",     rating: 5,   text: "Materi disusun sangat sistematis, mulai dari networking hingga penetration testing.",                                   alumniOfBatch: 4 },
  { classSlug: "cyber-security-ethical-hacking",     rating: 4.9, text: "Lab praktik menggunakan Kali Linux dan Burp Suite membuat saya lebih memahami.",                                        alumniOfBatch: 5 },
  { classSlug: "cyber-security-ethical-hacking",     rating: 5,   text: "OWASP Top 10 dijelaskan dengan contoh yang mudah dipahami.",                                                           alumniOfBatch: 7 },
  { classSlug: "cyber-security-ethical-hacking",     rating: 4.8, text: "Capstone project penetration testing memberikan pengalaman seperti menjadi security consultant.",                       alumniOfBatch: 6 },
  { classSlug: "cyber-security-ethical-hacking",     rating: 5,   text: "Sangat direkomendasikan untuk yang ingin mengambil sertifikasi CEH atau Security+.",                                     alumniOfBatch: 8 },
  { classSlug: "mobile-app-development-with-flutter", rating: 5,  text: "Course ini membantu saya membangun aplikasi Flutter dari nol hingga publish ke Play Store.",                              alumniOfBatch: 8 },
  { classSlug: "mobile-app-development-with-flutter", rating: 4.9,text: "State management menggunakan Riverpod dijelaskan dengan sangat jelas.",                                                  alumniOfBatch: 7 },
  { classSlug: "mobile-app-development-with-flutter", rating: 5,  text: "Project akhirnya seperti aplikasi production lengkap dengan authentication, REST API, Firebase.",                        alumniOfBatch: 9 },
  { classSlug: "mobile-app-development-with-flutter", rating: 4.8,text: "Saya berhasil membuat aplikasi kasir untuk UMKM setelah mengikuti bootcamp ini.",                                        alumniOfBatch: 6 },
  { classSlug: "mobile-app-development-with-flutter", rating: 5,  text: "Sangat cocok bagi developer yang ingin berpindah dari Android native ke Flutter.",                                        alumniOfBatch: 10 },
  { classSlug: "devops-engineering-roadmap",         rating: 5,   text: "Bootcamp ini mengubah cara saya melakukan deployment. Sekarang saya menggunakan Docker dan CI/CD.",                     alumniOfBatch: 4 },
  { classSlug: "devops-engineering-roadmap",         rating: 4.9, text: "Materi Kubernetes dijelaskan dari nol hingga deployment production.",                                                    alumniOfBatch: 6 },
  { classSlug: "devops-engineering-roadmap",         rating: 5,   text: "Saya berhasil mengotomatisasi deployment menggunakan GitHub Actions.",                                                  alumniOfBatch: 5 },
  { classSlug: "devops-engineering-roadmap",         rating: 4.8, text: "Lab praktiknya sangat realistis seperti environment perusahaan.",                                                       alumniOfBatch: 7 },
  { classSlug: "devops-engineering-roadmap",         rating: 5,   text: "Capstone project deployment microservice menjadi pengalaman terbaik.",                                                  alumniOfBatch: 8 },
  { classSlug: "python-for-automation-scripting",    rating: 5,   text: "Saya berhasil membuat automation script dan chatbot AI sederhana.",                                                      alumniOfBatch: 6 },
  { classSlug: "python-for-automation-scripting",    rating: 4.9, text: "Materinya lengkap mulai dari Python dasar, automation, web scraping hingga integrasi OpenAI API.",                       alumniOfBatch: 5 },
  { classSlug: "python-for-automation-scripting",    rating: 5,   text: "Project AI Assistant menggunakan LangChain dan OpenAI API menjadi portfolio terbaik.",                                   alumniOfBatch: 7 },
  { classSlug: "python-for-automation-scripting",    rating: 4.8, text: "Saya jadi bisa membuat bot untuk otomatis mengolah Excel dan mengirim email.",                                          alumniOfBatch: 8 },
  { classSlug: "python-for-automation-scripting",    rating: 5,   text: "Sangat cocok untuk programmer yang ingin mulai masuk ke dunia AI dan automation.",                                        alumniOfBatch: 9 },
];
