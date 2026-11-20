export const projectsData = [
  {
    "id": 11,
    "slug": "certificate-portal",
    "title": "Certificate Authentication & Verification Portal",
    "subtitle": "Innovation & DIY Club, MITS Gwalior",
    "description": "A high-performance React application for instant certificate authentication and automated bulk QR code generation. Features real-time live camera QR scanning, multi-engine image/PDF QR extraction, and Excel-based batch QR code zip generation for club events and workshops.",
    "date": "Aug 2026",
    "image": "/assets/images/project-image/project_7f2f8812a450ec6eec3556d0.png",
    "github": null,
    "live": "https://innovation-and-diy-certificate.vercel.app/",
    "stack": [
      "React",
      "JavaScript",
      "PDF.js",
      "SheetJS",
      "Google Apps Script API"
    ],
    "problem": "Managing physical event certificates and verifying attendance manually was error-prone and time-consuming during large-scale student workshops.",
    "architecture": "Client-side PDF and image parsing engine using PDF.js and jsQR, paired with SheetJS for batch spreadsheet parsing and Google Apps Script endpoints for secure cloud record verification.",
    "features": [
      "Real-time Live Camera QR Code Scanner with front/back flip support",
      "Multi-format QR detection from Images and multi-page PDF certificates",
      "Bulk QR Generator from Excel/CSV sheets with automatic ZIP packaging"
    ]
  },
  {
    "id": 7,
    "slug": "hardware-inventory",
    "title": "Hardware Inventory & Borrowing Portal",
    "subtitle": "Innovation & DIY Club Hardware Management System",
    "description": "A full-stack hardware inventory and borrowing platform built for the Innovation & DIY Club at MITS Gwalior. The system enables students to explore available hardware, submit borrowing requests, manage inventory, and securely access resources through college-domain authentication.",
    "date": "Aug 2026",
    "image": "/assets/images/project-image/project_1287618ef496cc2c5ad99189.png",
    "github": null,
    "live": "https://innovation-and-diy-inventory.vercel.app/",
    "stack": [
      "Next.js 16",
      "React 19",
      "Supabase PostgreSQL",
      "Supabase Auth",
      "Nodemailer",
      "TypeScript",
      "Tailwind CSS"
    ],
    "problem": "Microcontrollers, sensors, and development boards were being misplaced or unreturned during campus DIY hackathons without an audit trail.",
    "architecture": "Built with Next.js App Router and Supabase PostgreSQL with strict Row-Level Security (RLS). Incorporates collegiate domain-restricted Gmail OTP verification and transactional item checkout/checkin logic.",
    "features": [
      "Hardware Borrowing & Return Requests with status workflows",
      "Gmail OTP Authentication for verified club members",
      "Role-Based Access Control for student members and club admins",
      "Supabase RLS & Atomic Inventory Updates preventing double booking"
    ]
  },
  {
    "id": 6,
    "slug": "innovation-diy-club",
    "title": "Innovation & DIY Club Website",
    "subtitle": "Student Innovation & Community Platform",
    "description": "Developed and deployed a web platform for the Innovation & DIY Club to showcase projects, support club activities, share updates, and connect students around technology and hands-on innovation.",
    "date": "Aug 2026",
    "image": "/assets/images/project-image/project_16af668a661636288c21c22b.png",
    "github": null,
    "live": "https://innovation-and-diy.vercel.app/",
    "stack": [
      "React 19",
      "Vite",
      "JavaScript",
      "CSS"
    ],
    "problem": "Club activities, workshop announcements, and engineering project showcases were fragmented across messaging groups without a unified showcase.",
    "architecture": "Single-page responsive showcase built with React 19 and Vite, styled with custom modular glassmorphism CSS components for maximum performance and fast mobile loading.",
    "features": [
      "Interactive Project Showcase highlighting member hardware and software builds",
      "Club Activities & Events timeline with upcoming workshop schedules",
      "Community Updates & Announcement boards",
      "Direct membership engagement channels"
    ]
  },
  {
    "id": 9,
    "slug": "11acre-ai",
    "title": "11acre.ai - Real Estate & PropTech Platform",
    "subtitle": "Property Discovery, Listing & Real Estate Services Platform",
    "description": "A modern real estate platform designed to simplify property discovery, listing, and customer engagement. The platform connects buyers, tenants, owners, builders, agents, brokers, and service providers through property search, smart filtering, property listings, project discovery, and digital enquiry workflows.",
    "date": "Apr 2026",
    "image": "/assets/images/project-image/project_30169e5e79b4e76272b4772c.png",
    "github": null,
    "live": "https://11acreai.in/",
    "stack": [
      "CodeIgniter 4",
      "MySQL",
      "AJAX",
      "REST APIs",
      "JavaScript"
    ],
    "problem": "Property buyers and agents in tier-2/3 cities faced fragmented listing options with high platform fees and slow listing creation processes.",
    "architecture": "Architected using CodeIgniter 4 MVC with normalized relational MySQL databases. Features asynchronous AJAX search filtering, geospatial location queries, and responsive multi-step enquiry funnels.",
    "features": [
      "Advanced Property Search with dynamic budget, location, and amenity filters",
      "Property Posting & Listing Management with multi-image uploads",
      "Buy / Rent / Commercial / Plot Discovery categories",
      "Owner, Agent & Builder onboarding workflows"
    ]
  },
  {
    "id": 5,
    "slug": "fpv-surveillance-robot",
    "title": "FPV Surveillance Robot",
    "subtitle": "ESP32-CAM based FPV robot with real-time video streaming, remote navigation.",
    "description": "Built a real-time surveillance robot capable of live video streaming and wireless movement control using ESP32-CAM and Arduino-based hardware integration. The system is designed for low-latency monitoring and future AI object detection integration.",
    "date": "Apr 2026",
    "image": "/assets/images/project-image/project_24cbe1e05b1e772811f32dee.png",
    "github": "https://github.com/sumitrathor1/FPV_Car",
    "live": "https://sumitrathor.vercel.app/projects/fpv-surveillance-robot/",
    "stack": [
      "ESP32-CAM",
      "L298N",
      "Computer Vision",
      "Rest API",
      "Assure Server"
    ],
    "problem": "Traditional surveillance setups require stationary cameras with blind spots and high deployment overhead in confined inspection areas.",
    "architecture": "Embedded C++ firmware on an ESP32-CAM dual-core SoC interfacing with an L298N dual H-bridge motor driver. Streams MJPEG video frames over HTTP sockets while listening to directional REST/WebSocket control commands.",
    "features": [
      "Sub-second latency real-time FPV video streaming over Wi-Fi",
      "Dual H-Bridge motor navigation with four-wheel differential steering",
      "Web-based responsive teleoperation joystick control interface",
      "Integrated flash illumination for low-light inspection environments"
    ]
  },
  {
    "id": 8,
    "slug": "36-broking-hub",
    "title": "36 Broking Hub - Real Estate Platform",
    "subtitle": "Full-Stack Property Listing & Real Estate Management Platform",
    "description": "A full-stack real estate platform connecting property buyers, tenants, owners, builders, and brokers through a centralized property discovery system. The platform supports property listings, location and budget-based search, category filtering, user onboarding, OTP authentication, and responsive dashboards for managing real estate data and inquiries.",
    "date": "Nov 2025",
    "image": "/assets/images/project-image/project_35150c7eece956830c0853d4.png",
    "github": null,
    "live": "https://36brokinghub.com/",
    "stack": [
      "CodeIgniter 4",
      "Hostinger",
      "REST APIs",
      "PHP",
      "MySQL"
    ],
    "problem": "Real estate brokers needed a centralized inventory management portal with direct buyer lead notifications and secure OTP client onboarding.",
    "architecture": "Built with PHP CodeIgniter 4 and MySQL, leveraging SMS/Email OTP APIs for user authentication, transactional lead routing, and dynamic category filtering.",
    "features": [
      "Comprehensive Property Listing & Management dashboard",
      "Buy, Rent, Commercial, PG & Plot categorization",
      "Location & Budget-Based Search with instant query matching",
      "Secure OTP-Based User Authentication & Lead generation"
    ]
  },
  {
    "id": 10,
    "slug": "data-science-quiz",
    "title": "Data Science Quiz & Skill Assessment Platform",
    "subtitle": "Interactive assessment engine with real-time analytics & instructor dashboard",
    "description": "A full-stack web platform designed for evaluating and benchmarking Data Science and Machine Learning concepts. Features timed interactive tests, instant automated evaluation with question-by-question explanations, and a powerful administrative dashboard for managing quiz question banks, tracking student performance, and handling role-based permissions.",
    "date": "Apr 2025",
    "image": "/assets/images/project-image/project_1bcc15a81e736d25246b2246.png",
    "github": "https://github.com/sumitrathor1/Data-Science-Quiz",
    "live": "https://sumitrathor.vercel.app/projects/data-science-quiz/",
    "stack": [
      "PHP",
      "MySQL",
      "JavaScript",
      "Bootstrap"
    ],
    "problem": "Computer science students needed structured, timed self-assessment quizzes with granular performance analytics on algorithms and statistics.",
    "architecture": "Server-side evaluation pipeline with MySQL relational question banks, timed quiz sessions, randomized question sets, and real-time score graphing.",
    "features": [
      "Topic-wise assessment sets covering Python, Machine Learning & Statistics",
      "Instant automated evaluation with detailed answer explanations",
      "Instructor dashboard for question management and class performance metrics",
      "Time-restricted test environments with countdown timers"
    ]
  },
  {
    "id": 1,
    "slug": "smart-resume",
    "title": "Smart Resume - AI Resume Builder",
    "subtitle": "Automated resume creation with Gemini AI and custom templates",
    "description": "A full-stack platform that converts structured input into ATS-friendly resumes with AI-powered suggestions, template switching, and section reordering.",
    "date": "Mar 2025",
    "image": "/assets/images/project-image/project_946de1e20a498fe6e1877a5a.png",
    "github": "https://github.com/sumitrathor1/smartresume",
    "live": "https://sumitrathor.vercel.app/projects/smart-resume/",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "PHP",
      "Gemini AI",
      "MySQL"
    ],
    "problem": "Job seekers frequently struggle to format resumes to pass Applicant Tracking Systems (ATS) and optimize technical bullet points.",
    "architecture": "Client-server architecture integrating Google Gemini AI via REST endpoints to rewrite resume bullets, paired with a print-optimized CSS rendering engine and PDF generation.",
    "features": [
      "AI-generated resume bullet enhancements and skill recommendations",
      "Multiple ATS-optimized templates with live visual preview",
      "One-click browser PDF export with exact print dimensions",
      "Dynamic section customization, reordering, and skill chip inputs"
    ]
  },
  {
    "id": 3,
    "slug": "vibetune",
    "title": "VibeTune – Music Streaming Platform",
    "subtitle": "Responsive music streaming platform with playlist management and interactive playback controls.",
    "description": "Developed a modern music platform where users can upload songs, manage playlists, and stream music through a responsive and user-friendly interface powered by AJAX-based interactions.",
    "date": "Jan 2025",
    "image": "/assets/images/project-image/project_80dce16c3be44e86e7dfb3c3.png",
    "github": "https://github.com/sumitrathor1/VibeTune",
    "live": "https://sumitrathor.vercel.app/projects/vibetune/",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "AJAX",
      "Bootstrap",
      "PHP",
      "MySQL"
    ],
    "problem": "Lightweight web streaming without continuous page reloads or playback interruption required custom asynchronous client-side audio players.",
    "architecture": "HTML5 Web Audio API controller coupled with AJAX endpoints for continuous audio streaming across page navigation, backed by MySQL for playlists and favorite tracks.",
    "features": [
      "Continuous AJAX-powered playback bar with seek, volume, and shuffle controls",
      "User playlist creation and favorite songs collection",
      "Music upload pipeline with metadata extraction",
      "Responsive glassmorphism player design"
    ]
  },
  {
    "id": 12,
    "slug": "jeeneet-tracker",
    "title": "JEE & NEET Prep & Test Tracking Platform",
    "subtitle": "Competitive Exam Analytics & Progress Tracking Engine",
    "description": "A comprehensive assessment and analytics platform for students preparing for JEE Main, JEE Advanced, and NEET. Features automated mock test evaluation, syllabus progress tracker, monthly test diagnostics, and Firebase JWT authentication.",
    "date": "Nov 2025",
    "image": "/assets/images/project-image/project_1bcc15a81e736d25246b2246.png",
    "github": null,
    "live": "https://sumitrathor.vercel.app/projects/jeeneet-tracker/",
    "stack": [
      "PHP",
      "MySQL",
      "Firebase JWT",
      "PHPMailer",
      "Bootstrap 5",
      "JavaScript"
    ],
    "problem": "Students preparing for JEE/NEET lacked a unified diagnostic platform to evaluate chapter-wise strength, benchmark test performance against timelines, and track completion progress across Physics, Chemistry, and Math/Biology.",
    "architecture": "Modular PHP architecture with Firebase JWT token authentication, automated test scoring pipelines, syllabus checklist persistence, and relational MySQL analytics schema.",
    "features": [
      "Chapter-wise test tracking across Physics, Chemistry, Mathematics & Biology",
      "Automated monthly diagnostic test evaluations with rank benchmarking",
      "Firebase JWT secure student sessions and role-based access",
      "Course progress indicators and syllabus completion calculators"
    ]
  }
];
