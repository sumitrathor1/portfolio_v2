// ==============================================================================
// Sumit Rathor - First-Person Interactive Portfolio Knowledge Base
// ==============================================================================
// All answers are written in first-person as Sumit Rathor, grounded strictly
// in verified codebase and credential data.
// ==============================================================================

export const chatbotCategories = [
  { id: 'about', label: 'About Me', icon: 'fa-solid fa-user' },
  { id: 'skills', label: 'Technical Skills', icon: 'fa-solid fa-code' },
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-laptop-code' },
  { id: 'experience', label: 'Experience & Achievements', icon: 'fa-solid fa-award' },
  { id: 'contact', label: 'Career & Contact', icon: 'fa-solid fa-envelope' }
];

export const chatbotKnowledge = [
  // ----------------------------------------------------------------------------
  // Category 1: About Me
  // ----------------------------------------------------------------------------
  {
    id: 'who-is-sumit',
    category: 'about',
    question: 'Who are you?',
    aliases: [
      'who is sumit',
      'who is sumit rathor',
      'who are you',
      'tell me about yourself',
      'tell me about sumit',
      'introduce yourself',
      'about sumit',
      'sumit background',
      'bio'
    ],
    keywords: ['who', 'sumit', 'rathor', 'rathore', 'profile', 'bio', 'developer', 'yourself'],
    answer:
      "I'm Sumit Rathor, a Full Stack Software Engineer pursuing my B.Tech in Computer Science & Design at MITS Gwalior (CGPA 8.09). I specialize in building scalable web applications, real-time backend systems, offline AI/RAG assistants, and embedded IoT platforms. I've also completed research work at DRDO-CFEES and led collegiate technical initiatives.",
    suggestedFollowUps: ['skills-overview', 'best-projects', 'drdo-internship'],
    action: { label: 'Explore About Section', url: '#about-me' }
  },
  {
    id: 'education-details',
    category: 'about',
    question: 'Tell me about your education.',
    aliases: [
      'education',
      'college',
      'university',
      'degree',
      'academic background',
      'where did you study',
      'what did you study',
      'tell me about his education'
    ],
    keywords: ['education', 'mits', 'college', 'degree', 'diploma', 'gwalior', 'cgpa', 'school'],
    answer:
      "I'm currently pursuing my B.Tech in Computer Science & Design at Madhav Institute of Technology & Science (MITS), Gwalior (2024–2027) with a CGPA of 8.09. Before this, I graduated with a Diploma in Computer Science & Engineering from Dr. B.R. Ambedkar Polytechnic College, Gwalior with an 8.42 CGPA (2021–2024), and completed Higher Secondary School with 80%.",
    suggestedFollowUps: ['career-goal', 'achievements-notable'],
    action: { label: 'View Education Timeline', url: '#education' }
  },
  {
    id: 'career-goal',
    category: 'about',
    question: 'What is your current career goal?',
    aliases: [
      'career goal',
      'what role are you looking for',
      'future goals',
      'job interests',
      'what position do you want',
      'career aspirations',
      'what is his current career goal'
    ],
    keywords: ['career', 'goal', 'target', 'role', 'seeking', 'hire', 'job', 'sde', 'position'],
    answer:
      "I'm actively looking for Software Development Engineer (SDE), Full-Stack Developer, and AI/Backend Engineering opportunities where I can architect reliable web services, optimize distributed systems, and build practical AI workflows with clean engineering practices.",
    suggestedFollowUps: ['contact-how', 'resume-download', 'best-projects'],
    action: { label: 'Get In Touch', url: '#contact-us' }
  },
  {
    id: 'skills-overview',
    category: 'about',
    question: 'What are your strongest technical skills?',
    aliases: [
      'strongest skills',
      'top skills',
      'what are you best at',
      'core competencies',
      'main tech stack',
      'what are his strongest technical skills'
    ],
    keywords: ['skills', 'strongest', 'top', 'stack', 'competencies', 'proficient'],
    answer:
      "My core strengths include JavaScript/TypeScript (React, Next.js, Node.js), Python (LangChain, Streamlit, Ollama RAG), PHP (CodeIgniter, REST APIs), relational databases (MySQL, PostgreSQL with Supabase RLS), vector databases (ChromaDB), and embedded hardware (ESP32-CAM, C++, IoT architecture).",
    suggestedFollowUps: ['languages-known', 'react-node-experience', 'databases-experience'],
    action: { label: 'View Skills Grid', url: '#skills' }
  },

  // ----------------------------------------------------------------------------
  // Category 2: Technical Skills
  // ----------------------------------------------------------------------------
  {
    id: 'languages-known',
    category: 'skills',
    question: 'Which programming languages do you know?',
    aliases: [
      'languages',
      'programming languages',
      'what coding languages',
      'do you know python',
      'do you know c++',
      'which programming languages does he know'
    ],
    keywords: ['languages', 'python', 'javascript', 'typescript', 'c', 'cpp', 'php', 'sql', 'java'],
    answer:
      "I work comfortably with Python, JavaScript (ES6+), TypeScript, C / C++, PHP, SQL, and Java. I also hold verified IIT Bombay Spoken Tutorial certifications in both C and C++.",
    suggestedFollowUps: ['react-node-experience', 'php-mysql-experience'],
    action: { label: 'Check Verified Certifications', url: '#achievements' }
  },
  {
    id: 'react-node-experience',
    category: 'skills',
    question: 'Do you work with React and Node.js?',
    aliases: [
      'react and node',
      'react experience',
      'node experience',
      'mern stack',
      'do you know react',
      'does he work with react and node.js'
    ],
    keywords: ['react', 'node', 'nodejs', 'reactjs', 'express', 'mern', 'frontend', 'backend'],
    answer:
      "Yes, extensively! React is my primary frontend framework — I used it to build this portfolio, the Mandola e-commerce SPA, and the Innovation & DIY Club portal. On the backend, I build RESTful APIs, JWT authentication, and middleware with Node.js and Express.",
    suggestedFollowUps: ['mandola-project', 'databases-experience'],
    action: { label: 'See React Projects', url: '#projects' }
  },
  {
    id: 'databases-experience',
    category: 'skills',
    question: 'What databases have you worked with?',
    aliases: [
      'databases',
      'database experience',
      'mysql',
      'postgresql',
      'supabase',
      'vector database',
      'what databases has he worked with'
    ],
    keywords: ['database', 'databases', 'mysql', 'postgres', 'postgresql', 'supabase', 'chromadb', 'vector'],
    answer:
      "I work with both relational and vector databases: MySQL (complex relational schemas, indexing, 60+ table enterprise architectures), PostgreSQL / Supabase (Row-Level Security, real-time events), and ChromaDB (vector embeddings for semantic document search in RAG applications).",
    suggestedFollowUps: ['rakshak-ai-details', 'php-mysql-experience'],
    action: { label: 'View Tech Stack', url: '#skills' }
  },
  {
    id: 'php-mysql-experience',
    category: 'skills',
    question: 'What is your experience with PHP and MySQL?',
    aliases: [
      'php and mysql',
      'php experience',
      'codeigniter',
      'lamp stack',
      'what is his experience with php and mysql'
    ],
    keywords: ['php', 'mysql', 'codeigniter', 'lamp', 'backend'],
    answer:
      "I've built multiple production systems in PHP & MySQL, including full-stack platforms with CodeIgniter 4 (11acre.ai, 36 Broking Hub), real-time WebSocket chatrooms (Coders Cafe with Ratchet PHP), assessment tracking engines (Data Science Quiz, JEE/NEET Prep Tracker), and my original InfinityFree portfolio backend.",
    suggestedFollowUps: ['best-projects', 'react-node-experience']
  },

  // ----------------------------------------------------------------------------
  // Category 3: Projects
  // ----------------------------------------------------------------------------
  {
    id: 'best-projects',
    category: 'projects',
    question: 'What are your best projects?',
    aliases: [
      'best projects',
      'top projects',
      'featured projects',
      'what have you built',
      'portfolio projects',
      'what are his best projects'
    ],
    keywords: ['projects', 'best', 'top', 'featured', 'built', 'work'],
    answer:
      "Some of my favorite builds include:\n1. Rakshak AI — Offline air-gapped RAG assistant I built during my DRDO CFEES internship.\n2. Hardware Inventory Portal — Next.js + Supabase hardware borrowing platform.\n3. Mandola — Multi-vendor women's fashion e-commerce SPA (55+ screens).\n4. FPV Surveillance Robot — ESP32-CAM real-time teleoperation rover.\n5. 11acre.ai — Commercial PropTech discovery engine.",
    suggestedFollowUps: ['rakshak-ai-details', 'mandola-project', 'fpv-car-details'],
    action: { label: 'View Project Explorer', url: '#projects' }
  },
  {
    id: 'rakshak-ai-details',
    category: 'projects',
    question: 'Tell me about Rakshak AI.',
    aliases: [
      'rakshak ai',
      'rakshak',
      'drdo project',
      'ragbot',
      'ai project',
      'local rag'
    ],
    keywords: ['rakshak', 'ai', 'rag', 'drdo', 'cfees', 'langchain', 'ollama', 'chromadb', 'pypdf'],
    answer:
      "I engineered Rakshak AI (Enterprise Local Knowledge Assistant) during my research internship at DRDO CFEES (under Scientist 'F' Sh. Trilochan Singh Rathore). It's a 100% offline, air-gapped Retrieval-Augmented Generation (RAG) assistant using Python, Streamlit, LangChain, local Ollama LLMs, and ChromaDB to query internal technical PDFs and manuals without internet dependencies.",
    suggestedFollowUps: ['drdo-internship', 'mandola-project'],
    action: { label: 'Read Rakshak AI Case Study', url: '/projects/rakshak-ai/' }
  },
  {
    id: 'mandola-project',
    category: 'projects',
    question: 'What is Mandola?',
    aliases: [
      'mandola',
      'ecommerce project',
      'mandola platform',
      'fashion platform'
    ],
    keywords: ['mandola', 'ecommerce', 'fashion', 'multivendor', 'marketplace', 'react', 'typescript'],
    answer:
      "Mandola is a multi-vendor women's fashion e-commerce SPA I built with React 18, TypeScript, Vite, and Tailwind CSS. It features 3 role dashboards (Customer, Seller, Admin) across 55+ screens, JWT authentication, and 48 custom Radix UI components, backed by a Node.js REST API and MySQL database.",
    suggestedFollowUps: ['bitzech-details', 'fullstack-project-example'],
    action: { label: 'Explore Projects Section', url: '#projects' }
  },
  {
    id: 'fpv-car-details',
    category: 'projects',
    question: 'Tell me about your FPV Smart Car.',
    aliases: [
      'fpv car',
      'fpv smart car',
      'surveillance robot',
      'robot',
      'iot project',
      'esp32 car',
      'tell me about his fpv smart car'
    ],
    keywords: ['fpv', 'car', 'robot', 'esp32', 'surveillance', 'arduino', 'hardware', 'iot'],
    answer:
      "My FPV Surveillance Robot is an IoT project featuring an ESP32-CAM dual-core SoC interfacing with an L298N motor driver. It streams low-latency MJPEG video over Wi-Fi while receiving real-time differential teleoperation navigation commands via REST/WebSocket interfaces.",
    suggestedFollowUps: ['best-projects', 'diy-club-work'],
    action: { label: 'View FPV Robot Details', url: '/projects/fpv-surveillance-robot/' }
  },
  {
    id: 'bitzech-details',
    category: 'projects',
    question: 'What is BitZech?',
    aliases: [
      'bitzech',
      'aura connection',
      'bitzech software',
      'what is bitzech'
    ],
    keywords: ['bitzech', 'aura', 'connection', 'enterprise', 'portal', 'erp', 'crm'],
    answer:
      "BitZech is an enterprise software initiative where I worked on platforms including Aura Connection — a spiritual education and governance platform featuring 4 portals (Student, 15-module Trainer CRM, Admin ERP, Super Admin Command Sanctuary), 64 MySQL relational tables, and Node.js/React architectures.",
    suggestedFollowUps: ['mandola-project', 'best-projects']
  },
  {
    id: 'live-deployed-projects',
    category: 'projects',
    question: 'Which projects are deployed live?',
    aliases: [
      'live projects',
      'deployed projects',
      'which projects can i visit',
      'working demos'
    ],
    keywords: ['live', 'deployed', 'demos', 'vercel', 'online', 'links', 'visit'],
    answer:
      "You can check out several of my live deployments right now:\n• Hardware Inventory: innovation-and-diy-inventory.vercel.app\n• Certificate Portal: innovation-and-diy-certificate.vercel.app\n• Innovation Club Website: innovation-and-diy.vercel.app\n• 11acre.ai: 11acreai.in\n• 36 Broking Hub: 36brokinghub.com\n• BitBrief: sumitrathor.rf.gd/bitBrief/\n• Portfolio: sumitrathor.vercel.app",
    suggestedFollowUps: ['best-projects', 'fullstack-project-example'],
    action: { label: 'Open Project Explorer', url: '#projects' }
  },
  {
    id: 'fullstack-project-example',
    category: 'projects',
    question: 'Which project shows your full-stack skills?',
    aliases: [
      'fullstack demo',
      'full-stack project',
      'best full stack example',
      'architecture example',
      'which project demonstrates his full-stack skills'
    ],
    keywords: ['fullstack', 'full-stack', 'demonstrate', 'example', 'end-to-end', 'architecture'],
    answer:
      "My Hardware Inventory Portal (Next.js 16, React 19, Supabase PostgreSQL, Row-Level Security, collegiate Gmail OTP verification) and Mandola (React 18, TypeScript, Node.js, MySQL multi-vendor ERP) are great examples of how I design end-to-end full-stack architecture, secure auth, and transactional database logic.",
    suggestedFollowUps: ['rakshak-ai-details', 'skills-overview'],
    action: { label: 'Inspect Hardware Inventory', url: '/projects/hardware-inventory/' }
  },

  // ----------------------------------------------------------------------------
  // Category 4: Experience & Achievements
  // ----------------------------------------------------------------------------
  {
    id: 'drdo-internship',
    category: 'experience',
    question: 'Tell me about your DRDO internship.',
    aliases: [
      'drdo internship',
      'drdo experience',
      'cfees internship',
      'delhi research',
      'drdo research',
      'tell me about his drdo internship'
    ],
    keywords: ['drdo', 'cfees', 'internship', 'delhi', 'scientist', 'rathore', 'defence', 'research'],
    answer:
      "I worked as a Research Intern at DRDO CFEES (Centre for Fire, Explosive and Environment Safety, Ministry of Defence, Delhi) from June to August 2026 under Sh. Trilochan Singh Rathore, Scientist 'F'. During my internship, I engineered an offline AI knowledge assistant (Rakshak AI) using LangChain, Ollama, ChromaDB, and Streamlit to search local technical PDF documentation.",
    suggestedFollowUps: ['rakshak-ai-details', 'achievements-notable'],
    action: { label: 'View Experience Section', url: '#experience' }
  },
  {
    id: 'diy-club-work',
    category: 'experience',
    question: 'What did you do in Innovation & DIY Club?',
    aliases: [
      'diy club',
      'innovation club',
      'club president',
      'leadership role',
      'mits club',
      'what did he do in innovation & diy club'
    ],
    keywords: ['diy', 'innovation', 'club', 'president', 'leadership', 'mits', 'hardware', 'inventory'],
    answer:
      "As elected President of the Innovation & DIY Club at MITS Gwalior (Feb–Sep 2026), I led a community of 50+ members across multidisciplinary technical projects. I built the club's web platform, engineered a digital hardware inventory and borrowing system with student OTP verification, and organized campus technical workshops like Aarunya.",
    suggestedFollowUps: ['achievements-notable', 'opensource-contributions'],
    action: { label: 'View Club Platform', url: 'https://innovation-and-diy.vercel.app/' }
  },
  {
    id: 'opensource-contributions',
    category: 'experience',
    question: 'Have you contributed to open-source?',
    aliases: [
      'open source',
      'gssoc',
      'girlscript',
      'contributions',
      'open source experience',
      'has he contributed to open-source projects'
    ],
    keywords: ['opensource', 'open-source', 'gssoc', 'girlscript', 'github', 'contributions'],
    answer:
      "Yes! I was selected as a Project Admin for GirlScript Summer of Code (GSSoC 2025). I managed open-source repositories (such as Sachiva), mentored contributors, reviewed pull requests, and maintained code quality standards.",
    suggestedFollowUps: ['github-linkedin-links', 'achievements-notable'],
    action: { label: 'Visit My GitHub', url: 'https://github.com/sumitrathor1' }
  },
  {
    id: 'achievements-notable',
    category: 'experience',
    question: 'What are your notable achievements?',
    aliases: [
      'achievements',
      'awards',
      'certifications',
      'hackathons',
      'honors',
      'what are his notable achievements'
    ],
    keywords: ['achievements', 'awards', 'nptel', 'hackathon', 'paytm', 'gdg', 'cloud', 'lor', 'elite'],
    answer:
      "Here are a few milestones I'm proud of:\n• Elite NPTEL Certification in Cloud Computing (IIT Kharagpur, Score: 76%)\n• Elite NPTEL Certification in Human-Computer Interfaces (Score: 70%)\n• Participant, PAYTM Fin-O Hack at DTU (Fortune'26)\n• Participant, Devcation Delhi 2026 (GDG on Campus IGDTUW & IIT Delhi)\n• Google Cloud Skills Boost Arcade Legend Tier\n• Formal Letter of Recommendation from HoD, CSE, MITS Gwalior",
    suggestedFollowUps: ['drdo-internship', 'contact-how'],
    action: { label: 'View Verified Certificates', url: '#achievements' }
  },

  // ----------------------------------------------------------------------------
  // Category 5: Career & Contact
  // ----------------------------------------------------------------------------
  {
    id: 'hiring-availability',
    category: 'contact',
    question: 'Are you open to new opportunities?',
    aliases: [
      'available for hire',
      'are you looking for a job',
      'hiring status',
      'can i hire you',
      'open to work',
      'job availability',
      'is he available for software engineering opportunities'
    ],
    keywords: ['available', 'hire', 'hiring', 'status', 'job', 'opportunity', 'internship', 'fulltime'],
    answer:
      "Yes! I'm actively open to software engineering opportunities, including Full Stack, Frontend, Backend, and AI Engineering roles — as well as interesting freelance collaborations, both on-site and remote.",
    suggestedFollowUps: ['contact-how', 'resume-download', 'github-linkedin-links'],
    action: { label: 'Reach Out to Me', url: '#contact-us' }
  },
  {
    id: 'contact-how',
    category: 'contact',
    question: 'How can I contact you?',
    aliases: [
      'how to contact',
      'email address',
      'get in touch',
      'reach out',
      'contact information',
      'phone number',
      'how can i contact him'
    ],
    keywords: ['contact', 'email', 'touch', 'reach', 'message', 'inquiry'],
    answer:
      "You can email me directly at sumitrathor142272@gmail.com, connect with me on LinkedIn (linkedin.com/in/sumitrathor), or drop a message through the contact form right here on my portfolio.",
    suggestedFollowUps: ['resume-download', 'github-linkedin-links'],
    action: { label: 'Go to Contact Section', url: '#contact-us' }
  },
  {
    id: 'github-linkedin-links',
    category: 'contact',
    question: 'Where can I find your GitHub and LinkedIn?',
    aliases: [
      'github link',
      'linkedin link',
      'social profiles',
      'where is your github',
      'github profile',
      'where can i find his github and linkedin'
    ],
    keywords: ['github', 'linkedin', 'leetcode', 'social', 'profiles', 'links'],
    answer:
      "Here are my official profiles:\n• GitHub: github.com/sumitrathor1\n• LinkedIn: linkedin.com/in/sumitrathor\n• LeetCode: leetcode.com/u/SumitRathor/\n• Email: sumitrathor142272@gmail.com",
    suggestedFollowUps: ['resume-download', 'hiring-availability'],
    action: { label: 'Open My GitHub', url: 'https://github.com/sumitrathor1' }
  },
  {
    id: 'resume-download',
    category: 'contact',
    question: 'Can I download your resume?',
    aliases: [
      'download resume',
      'resume pdf',
      'get cv',
      'download cv',
      'curriculum vitae',
      'resume',
      'can i download his resume'
    ],
    keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum', 'profile'],
    answer:
      "Of course! You can download my latest resume in PDF format using the button below or from the top navigation bar.",
    suggestedFollowUps: ['hiring-availability', 'who-is-sumit'],
    action: { label: 'Download Resume (PDF)', url: '/assets/public/Sumit%20Rathor%20Resume.pdf' }
  }
];

// Fallback response for unsupported or unmapped queries
export const chatbotFallbackResponse = {
  answer:
    "I'm not completely sure about that one! Feel free to ask me about my education at MITS Gwalior, my DRDO research internship, projects like Rakshak AI or Mandola, my skills in React and Python, or grab my resume and contact details.",
  suggestedFollowUps: ['who-is-sumit', 'best-projects', 'skills-overview', 'contact-how']
};
