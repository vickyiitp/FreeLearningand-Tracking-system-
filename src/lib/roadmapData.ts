export interface Track {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: 'tech' | 'foundations' | 'business' | 'finance' | 'career';
  modules: Module[];
}

export interface Module {
  title: string;
  days: Day[];
}

export interface Day {
  dayNum: number;
  title: string;
  hours: Hour[];
  videos: Video[];
  docs: Doc[];
  practice: Practice;
  checklist: string[];
  intro?: string;
  assignment?: {
    title: string;
    description: string;
    template?: string;
    deliverable: string;
  };
  project?: {
    title: string;
    description: string;
    milestone: string;
  };
}

export interface Hour {
  time: string;
  type: 'Theory' | 'Video' | 'Lab' | 'Project' | 'Other';
  desc: string;
}

export interface Video {
  title: string;
  channel: string;
  url: string;
}

export interface Doc {
  title: string;
  url: string;
}

export interface Practice {
  platform: string;
  task: string;
  code: string;
}

export const degreeTracks: Track[] = [
  {
    id: "track-1",
    icon: "globe",
    title: "Track 1: Full-Stack Web & AI Integrations",
    description: "Start from absolute zero. Learn terminal, HTML/CSS, React, Node.js, and how to hook up OpenAI/Claude APIs to build intelligent web apps.",
    category: "tech",
    modules: [
      {
        title: "Module 1: Absolute Foundations (Zero to One)",
        days: [
          {
            dayNum: 1,
            title: "The Terminal, Git & HTML5",
            hours: [
              { time: "08:00 - 10:00", type: "Theory", desc: "How computers work. What is a GUI vs CLI. Introduction to HTML structure." },
              { time: "10:00 - 13:00", type: "Video", desc: "SuperSimpleDev: HTML & CSS Full Course (first 3 hours)." },
              { time: "14:00 - 16:00", type: "Lab", desc: "Mastering CLI commands: cd, mkdir, ls, touch, rm." },
              { time: "16:00 - 18:00", type: "Project", desc: "Build your first raw HTML website and version control it with Git." }
            ],
            videos: [
              { title: "HTML & CSS Full Course", channel: "SuperSimpleDev", url: "https://www.youtube.com/watch?v=G3e-cpL7ofc" },
              { title: "Git and GitHub for Beginners", channel: "FreeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
            ],
            docs: [{ title: "MDN: Introduction to HTML", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML" }],
            practice: {
              platform: "VS Code Terminal",
              task: "Create a project, initialize git, write HTML, and commit.",
              code: "mkdir web-basics && cd web-basics\ngit init\ntouch index.html\n# Write HTML boilerplate using '!' in VS Code\ngit add .\ngit commit -m 'Initial commit'"
            },
            checklist: ["Can navigate PC using terminal.", "Understand Git commits.", "Built a basic HTML page."],
            intro: "Welcome to the Machine. Before you write logic, you must speak to the operating system. The CLI (Command Line Interface) is your raw interface to code execution. Combined with version control (Git), you gain the superpower of restoring your application state to any point in time.",
            assignment: {
              title: "Problem Set 1: CLI and Version Control Setup",
              description: "Navigate to your workspace. Create a nested project structure using commands: `mkdir`, `cd`, and `touch`. Build an `index.html` file detailing your tech objectives, initialize git, write a meaningful commit message, and push to a remote GitHub repository.",
              template: "# CLI Command sequence\nmkdir dev-env && cd dev-env\ngit init\ntouch index.html",
              deliverable: "Submit the URL to your public GitHub repository containing the committed index.html file."
            },
            project: {
              title: "Project Milestone: Static Personal Base",
              description: "Build a raw, semantically accurate HTML5 website showcasing your engineering portfolio, credentials, and projects. Use tables, lists, and proper headers.",
              milestone: "Initialize public-portfolio repository with clean HTML5 semantic structure."
            }
          },
          {
            dayNum: 2,
            title: "JavaScript Engines & The DOM",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "Variables, Functions, Arrays, Objects. How the V8 engine reads JS." },
              { time: "11:00 - 14:00", type: "Video", desc: "Namaste JavaScript by Akshay Saini (Execution Context, Hoisting)." },
              { time: "14:00 - 18:00", type: "Project", desc: "Build an interactive To-Do list using vanilla JS and DOM manipulation." }
            ],
            videos: [
              { title: "Namaste JavaScript (Execution Context)", channel: "Akshay Saini", url: "https://www.youtube.com/watch?v=iLWTnMzWtj4" }
            ],
            docs: [{ title: "Javascript.info: The DOM", url: "https://javascript.info/document" }],
            practice: {
              platform: "VS Code",
              task: "Manipulate the DOM.",
              code: "const btn = document.createElement('button');\nbtn.innerText = 'Click Me';\ndocument.body.appendChild(btn);\nbtn.addEventListener('click', () => alert('Done!'));"
            },
            checklist: ["Understand Hoisting.", "Can write functions & loops.", "Manipulated DOM via JS."],
            intro: "JavaScript transforms static HTML sheets into living applications. When you run JS, Chrome's V8 engine creates an Execution Context. Understanding hoisting and scope chains separates average developers from elite architects.",
            assignment: {
              title: "Problem Set 2: Dynamic Task Register",
              description: "Implement a DOM manipulator script that creates lists, takes inputs from text boxes, updates element classes dynamically, and handles user clicks. You must use vanilla JS events (addEventListener) and DOM selectors.",
              template: "const input = document.querySelector('#task-input');\n// Create nodes dynamically and append...",
              deliverable: "Vanilla JavaScript script handling todo lists with adding, checking, and deleting tasks."
            },
            project: {
              title: "Project Milestone: Dynamic Portfolio Integrations",
              description: "Add a dynamic light/dark theme switcher and a contacts validation form to your portfolio using pure vanilla JavaScript DOM manipulation.",
              milestone: "Write main.js containing theme controls and contact form logic."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-2",
    icon: "cpu",
    title: "Track 2: Adv. AI, ML & Data Analytics",
    description: "Go beyond API calls. Learn the math behind AI, train Neural Networks from scratch, and master Data Analytics with Python.",
    category: "tech",
    modules: [
      {
        title: "Module 1: Data Science Stack & Math",
        days: [
          {
            dayNum: 1,
            title: "Python, NumPy & Pandas",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "Vectorization. Why Python is used for AI. DataFrames." },
              { time: "12:00 - 18:00", type: "Lab", desc: "Clean and analyze a 100k row dataset from Kaggle using Pandas." }
            ],
            videos: [{ title: "Data Analysis with Python", channel: "FreeCodeCamp", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8" }],
            docs: [{ title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" }],
            practice: {
              platform: "Jupyter Notebook",
              task: "Load a CSV and find correlations.",
              code: "pip install jupyter pandas numpy\njupyter notebook\nimport pandas as pd\ndf = pd.read_csv('data.csv')\ndf.describe()"
            },
            checklist: ["Mastered Pandas DataFrames.", "Can clean missing data."],
            intro: "Before AI can make decisions, data must be structured. Python's NumPy operates with vectorized linear algebra arrays compiled in C, making mathematical operations extremely fast. Pandas wraps this inside DataFrames for optimal data manipulation.",
            assignment: {
              title: "Problem Set 1: Data Cleansing Pipeline",
              description: "Using a public dataset (e.g., housing pricing or user retention), write a Python script to filter out missing columns, convert strings to category indicators, normalize value scales, and group records by metric metrics.",
              template: "import pandas as pd\ndf = pd.read_csv('housing.csv')\n# Fill missing values and scale...",
              deliverable: "Jupyter Notebook (.ipynb) containing data cleaning operations and basic charts."
            },
            project: {
              title: "Project Milestone: EDA Report",
              description: "Build an Exploratory Data Analysis (EDA) report on a dataset of choice, detailing correlation coefficients, standard deviations, and anomalies.",
              milestone: "Produce Matplotlib/Seaborn correlation heatmaps and boxplots."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-3",
    icon: "code",
    title: "Track 3: DSA Mastery (IIT/Stanford Tier)",
    description: "The core logic of computer science. C++, Data Structures, DP, and Graph Algorithms to pass elite tech interviews.",
    category: "tech",
    modules: [
      {
        title: "Module 1: C++ & Memory Architecture",
        days: [
          {
            dayNum: 1,
            title: "Pointers, References & Memory",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "Stack vs Heap, Dereferencing, Memory Leaks." },
              { time: "12:00 - 18:00", type: "Lab", desc: "Implement a custom Linked List from scratch using pure C++ pointers." }
            ],
            videos: [{ title: "Pointers in C/C++", channel: "mycodeschool", url: "https://www.youtube.com/watch?v=zuegQmMdy8M" }],
            docs: [{ title: "C++ Memory Management", url: "https://cplusplus.com/doc/tutorial/dynamic/" }],
            practice: {
              platform: "Terminal (g++)",
              task: "Write memory-safe C++.",
              code: "struct Node { int data; Node* next; };\nNode* head = new Node();\n// Delete memory to prevent leaks"
            },
            checklist: ["Understand Stack vs Heap.", "Mastered Pointers."],
            intro: "Languages like Python manage memory for you, but they add high latency. C++ gives you direct control over RAM. To build operating systems, game engines, or high-frequency trading swarms, you must master the stack, the heap, raw pointers, and memory leaks.",
            assignment: {
              title: "Problem Set 1: Singly Linked List Implementation",
              description: "Write a C++ class that implements a linked list from scratch. Include methods for insertion at head/tail, deletion by value, and a destructor that cleans up heap memory to avoid leaks. Compile using `g++`.",
              template: "class LinkedList {\n  struct Node { int val; Node* next; };\n  Node* head;\npublic:\n  ~LinkedList();\n};",
              deliverable: "LinkedList.cpp implementing memory-safe list updates."
            },
            project: {
              title: "Project Milestone: Memory Analyzer",
              description: "Build a simple trace wrapper that overrides `new` and `delete` in C++ to log current heap allocations and alert the user of memory leaks.",
              milestone: "Overload new/delete operators to trace memory state in C++."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-4",
    icon: "smartphone",
    title: "Track 4: App Development",
    description: "Build iOS and Android applications natively using React Native and Expo.",
    category: "tech",
    modules: [
      {
        title: "Module 1: Cross-Platform Mobile",
        days: [
          {
            dayNum: 1,
            title: "React Native & Expo Setup",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "Mobile architecture vs Web. Views vs Divs." },
              { time: "12:00 - 18:00", type: "Project", desc: "Build a UI clone of Instagram using React Native Components." }
            ],
            videos: [{ title: "React Native Crash Course", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=mJ3bGvy0WAY" }],
            docs: [{ title: "Expo Documentation", url: "https://docs.expo.dev/" }],
            practice: {
              platform: "Terminal & Expo Go app",
              task: "Initialize mobile app.",
              code: "npx create-expo-app my-app\ncd my-app\nnpx expo start"
            },
            checklist: ["Connected app to phone via Expo Go.", "Built mobile layouts with Flexbox."],
            intro: "Developing for mobile requires compiling to Native Views on Android and iOS. Using Expo and React Native, we can write Javascript that bridges directly into native Swift and Kotlin views, offering high performance with cross-platform ease.",
            assignment: {
              title: "Problem Set 1: Scrollable Grid Layout",
              description: "Construct a React Native page using Expo. The interface must use FlatList, show local image items, layout metadata using Flexbox, and integrate simple touch triggers.",
              template: "import { View, FlatList, Image } from 'react-native';\n// Build list layout using FlatList...",
              deliverable: "App.tsx React Native codebase containing a functional grid list."
            },
            project: {
              title: "Project Milestone: Grid Portfolio App",
              description: "Create a mobile interface version of your portfolio displaying links, career history, and contact inputs designed for standard phone screens.",
              milestone: "Build and deploy developer profile page on Expo Go client."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-5",
    icon: "server",
    title: "Track 5: Systems & Cloud (Phase 1)",
    description: "Docker, Kubernetes, Networking, Distributed DBs. (The Original Architect Phase 1).",
    category: "tech",
    modules: [
      {
        title: "Module 1: Infrastructure as Code",
        days: [
          {
            dayNum: 1,
            title: "TCP/IP, Nginx & Docker",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "OSI Model, Load Balancing, Containerization." },
              { time: "12:00 - 18:00", type: "Lab", desc: "Deploy a Node app behind an Nginx Reverse Proxy inside Docker." }
            ],
            videos: [{ title: "Docker Tutorial", channel: "NetworkChuck", url: "https://www.youtube.com/watch?v=Gjnup-PuquQ" }],
            docs: [{ title: "Docker Docs", url: "https://docs.docker.com/" }],
            practice: {
              platform: "Docker / Linux",
              task: "Write docker-compose.yml.",
              code: "docker-compose up -d --build"
            },
            checklist: ["Understand Reverse Proxies.", "Mastered Dockerfiles."],
            intro: "Software running on a developer's machine often behaves differently in production. Containerization (Docker) isolates libraries, system configurations, and files into a standard package that runs consistently on any cloud machine.",
            assignment: {
              title: "Problem Set 1: Double-Tier Container Setup",
              description: "Create a Dockerfile for a basic Node.js API, and a compose configuration that links it to an Nginx web proxy. Nginx must map inbound port 80 traffic to Node's internal port.",
              template: "version: '3.8'\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - '80:80'",
              deliverable: "Dockerfile and docker-compose.yml files orchestrating Node and Nginx."
            },
            project: {
              title: "Project Milestone: Deploy to Cloud Instance",
              description: "Provision a free-tier virtual machine (e.g., AWS EC2 or Render), install Docker, and deploy your multi-container web server configuration.",
              milestone: "Provide active public IP address displaying the reverse-proxied home route."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-6",
    icon: "shield",
    title: "Track 6: Cybersecurity in AI Era",
    description: "Offensive and defensive security. Protecting AI models and web servers from modern attacks.",
    category: "tech",
    modules: [
      {
        title: "Module 1: Penetration Testing & AI Sec",
        days: [
          {
            dayNum: 1,
            title: "OWASP Top 10 & Web Exploits",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "SQLi, XSS, CSRF, Authentication bypass." },
              { time: "12:00 - 18:00", type: "Lab", desc: "Use Burp Suite to intercept and modify HTTP requests safely in a sandbox." }
            ],
            videos: [{ title: "Web Security", channel: "LiveOverflow", url: "https://www.youtube.com/c/LiveOverflow" }],
            docs: [{ title: "OWASP Documentation", url: "https://owasp.org/Top10/" }],
            practice: {
              platform: "Burp Suite Community Edition",
              task: "Intercept HTTP traffic.",
              code: "Set browser proxy to 127.0.0.1:8080. Capture request."
            },
            checklist: ["Understand XSS vs SQLi.", "Intercepted requests with proxy."],
            intro: "Security is an continuous chess match. As applications become complex, injection vectors grow. Understanding OWASP top vulnerabilities like SQL Injections (SQLi) and Cross-Site Scripting (XSS) helps protect systems against database compromise and session hijacking.",
            assignment: {
              title: "Problem Set 1: Defending Against Injection",
              description: "Review a vulnerable Node.js/Express code block that queries a database using unsanitized template strings. Refactor the queries using parameterized statements (prepared statements) to prevent SQL Injection.",
              template: "// Vulnerable: `SELECT * FROM users WHERE user = '${input}'`\n// Secure: ...",
              deliverable: "Refactored Express controller script securing API inputs against database manipulation."
            },
            project: {
              title: "Project Milestone: Security Audit",
              description: "Execute a full input-validation security audit on your dynamic portfolio, ensuring form submissions block script tags and special query tokens.",
              milestone: "Deliver HTML element sanitization code for frontend validation."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-7",
    icon: "terminal",
    title: "Track 7: Foundations of Logic & CLI",
    description: "Ideal for non-tech individuals moving into engineering. Learn logical thinking, computer systems, and CLI.",
    category: "foundations",
    modules: [
      {
        title: "Module 1: Basic Logical Architectures",
        days: [
          {
            dayNum: 1,
            title: "Boolean Logic & Flow Diagrams",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "AND, OR, NOT operations. Logic gates, truth tables." },
              { time: "11:00 - 14:00", type: "Video", desc: "Crash Course Computer Science: Boolean Logic." },
              { time: "14:00 - 18:00", type: "Lab", desc: "Build truth tables and translate logical statements into decisions." }
            ],
            videos: [{ title: "Boolean Logic & Logic Gates", channel: "CrashCourse", url: "https://www.youtube.com/watch?v=gI-qXk7XojA" }],
            docs: [{ title: "Introduction to Logic Gates", url: "https://www.geeksforgeeks.org/logic-gates/" }],
            practice: {
              platform: "Flowchart Tool (Draw.io)",
              task: "Map decision logic flow for a basic login validation.",
              code: "Start -> Input Email & PW -> Is Email Valid? (AND) Is PW Length > 8? -> Allow Login / Reject"
            },
            checklist: ["Can build truth tables.", "Understand conditional logic flow.", "Mastered AND/OR/NOT combinations."],
            intro: "Computers are built on logic. At the physical layer, tiny transistors open or close to process electrical signals using Boolean algebra. Before writing code, you must learn to think in structured logical sequences.",
            assignment: {
              title: "Problem Set 1: Conditional Flow Charting",
              description: "Design a logical schema mapping user validation. If a user is not logged in, route to home. If logged in but lacks billing credentials, route to checkout. Detail all logical nodes using truth tables.",
              deliverable: "Truth table combinations and a structured layout diagram mapping conditional routes."
            },
            project: {
              title: "Project Milestone: logical outline",
              description: "Outline the logic flow for a simple automation system that turns on lawn sprinklers based on temperature, rain readings, and time-of-day constraints.",
              milestone: "Write logical equations specifying conditional sprinkler triggers."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-8",
    icon: "bookOpen",
    title: "Track 8: Elite Communication & Technical Writing",
    description: "Master business communication, professional technical writing, cold emails, and public speaking.",
    category: "career",
    modules: [
      {
        title: "Module 1: Professional Technical Outreach",
        days: [
          {
            dayNum: 1,
            title: "The Art of Cold Emailing & Pitching",
            hours: [
              { time: "08:00 - 10:00", type: "Theory", desc: "Subject lines that convert, value-first propositions, call-to-actions (CTA)." },
              { time: "10:00 - 13:00", type: "Video", desc: "Cold Email copywriting teardown by top SaaS founders." },
              { time: "13:00 - 18:00", type: "Lab", desc: "Draft three distinct cold pitches targeted at virtual corporate executives." }
            ],
            videos: [{ title: "Cold Email Strategy for Developers", channel: "SaaS Academy", url: "https://www.youtube.com/watch?v=JmU8T2-bXaw" }],
            docs: [{ title: "HubSpot: Cold Email Templates", url: "https://blog.hubspot.com/sales/cold-email-templates" }],
            practice: {
              platform: "Markdown Editor",
              task: "Draft a high-conversion cold outreach structure.",
              code: "Subject: Quick question regarding [System Painpoint]...\n\nHi [Name],\n\nI noticed that [System Painpoint] might be slowing down [Department]...\nI created a prototype addressing this...\n\nBest,\n[Your Name]"
            },
            checklist: ["Mastered the Hook-Value-Ask structure.", "Write subject lines with high open-rates.", "Understand follow-up cadences."],
            intro: "Your technical skills are only as valuable as your ability to communicate them. If you cannot explain the value of your system, nobody will deploy it. Learning value-first cold outreach is the fastest way to land projects.",
            assignment: {
              title: "Problem Set 1: B2B Cold Outreach Draft",
              description: "Write a high-converting cold email pitch offering custom software scaling services to a Chief Technology Officer. The pitch must address a technical bottleneck, offer a free trial component, and end with a clear Call to Action.",
              deliverable: "Markdown document containing three distinct email templates focusing on different customer value propositions."
            },
            project: {
              title: "Project Milestone: Outreach Campaign",
              description: "Identify five real local or online SaaS startups, find the contact details of the founders, and customize the value-driven templates to reach out to them.",
              milestone: "Document targets, emails, custom value propositions, and tracking status."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-9",
    icon: "rocket",
    title: "Track 9: YC Startup Blueprint & B2B Sales",
    description: "Learn how to build products, determine product-market fit, pitch investors, and scale B2B contracts.",
    category: "business",
    modules: [
      {
        title: "Module 1: Validation & B2B Sales",
        days: [
          {
            dayNum: 1,
            title: "Ideation & Product-Market Fit (PMF)",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "Problem validation. The Mom Test. SaaS business metrics." },
              { time: "12:00 - 18:00", type: "Lab", desc: "Build a landing page targeting a specific problem statement to capture user signups." }
            ],
            videos: [{ title: "YC: How to Validate Startup Ideas", channel: "Y Combinator", url: "https://www.youtube.com/watch?v=l_M9V37l-1Y" }],
            docs: [{ title: "The Mom Test Summary", url: "https://www.robfitz.com/mom-test" }],
            practice: {
              platform: "Terminal (Next.js)",
              task: "Build validation landing page to capture emails.",
              code: "npx create-next-app@latest landing-page --use-npm\n# Integrate mailer API or form submit to Google Sheets"
            },
            checklist: ["Validated problem statements.", "Conducted customer interviews.", "Built a basic signup landing page."],
            intro: "Startups fail because they build products nobody wants. To succeed, you must validate your assumptions. This means asking questions that prevent users from lying to be polite (called the Mom Test) and deploying simple landing pages to test intent.",
            assignment: {
              title: "Problem Set 1: User Validation Plan",
              description: "Choose a product concept. Define three core assumptions. Draft a list of five open-ended user interview questions that do not ask 'Would you buy this product?'. Outlines metrics indicating demand.",
              deliverable: "Validation proposal sheet detailing user questionnaire, validation parameters, and analytics tools."
            },
            project: {
              title: "Project Milestone: Demand Validation Page",
              description: "Build and deploy a responsive micro-landing page containing a compelling value pitch, mock interface screenshots, and an email collection box.",
              milestone: "Deploy landing page to Vercel/Netlify with Google Analytics/Hotjar tracking."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-10",
    icon: "wallet",
    title: "Track 10: SaaS Economics & Corporate Finance",
    description: "Financial modeling, personal finance pipelines, pricing structures, and SaaS unit economics.",
    category: "finance",
    modules: [
      {
        title: "Module 1: SaaS Metrics & Modeling",
        days: [
          {
            dayNum: 1,
            title: "LTV, CAC, Churn & Runway",
            hours: [
              { time: "08:00 - 12:00", type: "Theory", desc: "Customer Lifetime Value (LTV), Acquisition Cost (CAC), Gross Margins, Burn Rate." },
              { time: "12:00 - 18:00", type: "Lab", desc: "Build a financial projection model for a subscription app in Google Sheets." }
            ],
            videos: [{ title: "Understanding SaaS Metrics", channel: "Andreessen Horowitz", url: "https://www.youtube.com/watch?v=F711E81u_hA" }],
            docs: [{ title: "a16z: 16 Startup Metrics", url: "https://a16z.com/16-startup-metrics/" }],
            practice: {
              platform: "Google Sheets",
              task: "Build mathematical models for LTV/CAC ratio.",
              code: "# Formula: LTV = (ARPU * Gross Margin) / Churn Rate\n# Goal: Keep LTV/CAC ratio > 3x"
            },
            checklist: ["Understand unit economics.", "Built a SaaS financial projection sheet.", "Can calculate Churn & CAC Payback."],
            intro: "Finance is the scorecard of business. In tech, unit economics tell you whether your app is viable. To scale a company, you must master LTV, CAC, Churn, and Cash Flow Runway to ensure your business makes more than it spends.",
            assignment: {
              title: "Problem Set 1: Financial Model Sheet",
              description: "Construct a Google Sheet detailing a 12-month model for a SaaS business. Incorporate parameters for monthly signup growth, price tiers, churn rate, marketing CAC spend, and server operating overhead.",
              deliverable: "Public link to a view-only Google Sheets containing formulas for LTV, CAC, Burn Rate, and Month-over-Month growth."
            },
            project: {
              title: "Project Milestone: Pricing Strategy Model",
              description: "Define three distinct pricing plans (e.g., Free, Pro, Enterprise) for a software product. Explain the margins, support costs, and targeting logic for each plan.",
              milestone: "Provide a pricing model detailing user acquisition goals and margins."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-11",
    icon: "trendingUp",
    title: "Track 11: Audience Building & LinkedIn Strategy",
    description: "Learn how to build in public, create content, network on LinkedIn, and build professional pipelines.",
    category: "career",
    modules: [
      {
        title: "Module 1: Building in Public",
        days: [
          {
            dayNum: 1,
            title: "LinkedIn Branding & Content Systems",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "Profile optimization, content copywriting formats, hooks, algorithm logic." },
              { time: "11:00 - 14:00", type: "Video", desc: "Building in Public strategies by top tech creators." },
              { time: "14:00 - 18:00", type: "Lab", desc: "Optimize your personal LinkedIn profile and schedule your first 5-day post series." }
            ],
            videos: [{ title: "LinkedIn Branding for Software Engineers", channel: "Developer Academy", url: "https://www.youtube.com/watch?v=n5l7P7Q0UeY" }],
            docs: [{ title: "Building in Public Guide", url: "https://www.indiehackers.com/start-building-in-public" }],
            practice: {
              platform: "LinkedIn / Markdown",
              task: "Write a high-hook technical post format.",
              code: "Hook: I spent 10 hours debugging a memory leak in C++.\nHere is what I discovered...\n\n1. Overriding operators was not enough...\n2. Check stack allocations first...\n\n#buildinpublic #cpp"
            },
            checklist: ["Optimized LinkedIn profile header and bio.", "Understand post formatting hook mechanics.", "Created a 5-day content calendar."],
            intro: "The developer who builds in silence loses to the developer who builds in public. Creating posts detailing your challenges, breakthroughs, and code learnings builds an audience that leads to inbound job offers and partnerships.",
            assignment: {
              title: "Problem Set 1: LinkedIn Optimization & Content Copywriting",
              description: "Optimize your professional LinkedIn profile including your header, summary, and experience sections. Draft three high-quality posts detailing your technical learnings and breakthroughs.",
              deliverable: "Optimized profile link and document containing three post drafts with hooks, bullet points, and CTAs."
            },
            project: {
              title: "Project Milestone: Launch 3-Day Campaign",
              description: "Publish your three drafted technical posts on LinkedIn over consecutive days, tracking likes, comments, impressions, and connection requests.",
              milestone: "Document post performance and screenshot connection growth."
            }
          }
        ]
      }
    ]
  },
  {
    id: "track-12",
    icon: "cpu",
    title: "Track 12: Complete AI & AGI Systems Engineer",
    description: "Architect state-of-the-art LLM pipelines, RAG systems, PEFT fine-tuning models, high-throughput deployment, and autonomous agent swarms.",
    category: "tech",
    modules: [
      {
        title: "Module 1: LLM Pipelines & Production RAG",
        days: [
          {
            dayNum: 1,
            title: "Tokenization, Embeddings & Vectors",
            hours: [
              { time: "08:00 - 10:00", type: "Theory", desc: "Tokenization mathematical bounds, embedding cosine similarity, vector database index mechanisms (HNSW vs IVF-Flat)." },
              { time: "10:00 - 13:00", type: "Video", desc: "Andrej Karpathy: Let's build GPT: from scratch." },
              { time: "14:00 - 16:00", type: "Lab", desc: "Interact with tokenizers (TikToken), run open-source sentence embeddings, and store indices in ChromaDB." },
              { time: "16:00 - 18:00", type: "Project", desc: "Build a raw document chunking and vector storage database engine in Python." }
            ],
            videos: [
              { title: "Let's build GPT: from scratch", channel: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
              { title: "Intro to Large Language Models", channel: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" }
            ],
            docs: [
              { title: "ChromaDB Core Operations", url: "https://docs.trychroma.com/" },
              { title: "HNSW Indexed Vector Clustering", url: "https://www.pinecone.io/learn/series/faiss/hnsw/" }
            ],
            practice: {
              platform: "Python Sandbox",
              task: "Initialize tiktoken, tokenize text, encode sentence, and calculate cosine similarity.",
              code: "import tiktoken\nenc = tiktoken.get_encoding('cl100k_base')\ntokens = enc.encode('Hello Machine!')\n# Print length and token mappings"
            },
            checklist: ["Understand sub-word tokenization constraints.", "Calculate similarity matrices manually.", "Query vector indexes in ChromaDB."],
            intro: "To build elite AI, you must understand how models read. Raw text is split into numeric tokens, then projected as high-dimensional semantic vectors. To search these millions of vectors quickly, we structure databases using advanced indexing like HNSW (Hierarchical Navigable Small World).",
            assignment: {
              title: "Problem Set 1: Vector Query Engine from Scratch",
              description: "Build a mini python script that chunk text documents, generates sentence embeddings via a local HuggingFace model (e.g. all-MiniLM-L6-v2), indices the vectors, and responds to queries using cosine similarity distance calculation without database APIs.",
              template: "def cosine_similarity(a, b):\n  return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))",
              deliverable: "Python script processing raw texts, querying top-k matches based on vector geometry calculations."
            },
            project: {
              title: "Project Milestone: Enterprise Index Core",
              description: "Configure a Python ingestion script that takes directories of PDFs/Markdown files, cleans boilerplate texts, splits paragraphs dynamically using markdown structure, and saves index representations in local database files.",
              milestone: "Complete document parsing script linked to local database file."
            }
          },
          {
            dayNum: 2,
            title: "Advanced RAG with LangChain & LlamaIndex",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "RAG bottlenecks. Retrieve-Read pipelines. Query routing, query expansion, and re-ranking (Cohere/CrossEncoder)." },
              { time: "11:00 - 14:00", type: "Video", desc: "LangChain Expression Language (LCEL) and Advanced Retrieval." },
              { time: "14:00 - 18:00", type: "Project", desc: "Build a production-grade Q&A system using LlamaIndex and a local llama3 model." }
            ],
            videos: [
              { title: "LlamaIndex: Advanced RAG Techniques", channel: "LlamaIndex", url: "https://www.youtube.com/watch?v=JmHj-Osaq3Q" }
            ],
            docs: [
              { title: "LlamaIndex Production Checklists", url: "https://docs.llamaindex.ai/en/stable/optimizing/production_rag/" },
              { title: "LangChain LCEL Architectures", url: "https://python.langchain.com/docs/concepts/#lcel" }
            ],
            practice: {
              platform: "Python Env",
              task: "Orchestrate basic RAG query pipeline using LlamaIndex.",
              code: "from llama_index.core import SimpleDirectoryReader, VectorStoreIndex\ndocuments = SimpleDirectoryReader('data').load_data()\nindex = VectorStoreIndex.from_documents(documents)\nquery_engine = index.as_query_engine()"
            },
            checklist: ["Implement Query Rewrite mechanisms.", "Set up Cross-Encoder Re-ranking nodes.", "Avoid hallucination context overflows."],
            intro: "Standard RAG often fails in production because of poor chunks and weak query descriptions. Advanced Retrieval-Augmented Generation solves this using Query Expansion (generating multiple variations of queries) and Cross-Encoder Re-ranking to sort retrieved chunks by precise semantic relevance.",
            assignment: {
              title: "Problem Set 2: Re-ranked Q&A System",
              description: "Build an API endpoint using LangChain/LCEL or LlamaIndex. It must ingest a document collection, expand incoming queries using an LLM, retrieve top-20 chunks, run a local re-ranker model (HuggingFace cross-encoder), and pass the top-3 chunks as system contexts.",
              deliverable: "FastAPI server script supporting query-expansion, re-ranking, and streaming context response."
            },
            project: {
              title: "Project Milestone: Streaming Documentation Assistant",
              description: "Create a web helper engine that indexes a technology's official documentations (e.g. Next.js docs) and provides streaming completions directly in a web console chat page.",
              milestone: "Deploy local indexing pipeline with FastAPI streaming endpoints active."
            }
          }
        ]
      },
      {
        title: "Module 2: Model Fine-Tuning & Local Scaling",
        days: [
          {
            dayNum: 3,
            title: "Parameter-Efficient Fine-Tuning (PEFT/LoRA)",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "Fine-tuning vs RAG. Math behind LoRA (Low-Rank Adaptation) and QLoRA. Weight adapter matrices." },
              { time: "11:00 - 14:00", type: "Video", desc: "HuggingFace PEFT + Unsloth: Fine-Tune Llama3 on custom dataset." },
              { time: "14:00 - 18:00", type: "Lab", desc: "Fine-tune a 7B model using QLoRA in a Jupyter/Google Colab notebook." }
            ],
            videos: [
              { title: "Fine-tuning LLMs with LoRA & QLoRA", channel: "Cameron R. Wolfe", url: "https://www.youtube.com/watch?v=yK7hMshj9sU" }
            ],
            docs: [
              { title: "HuggingFace PEFT Documentation", url: "https://huggingface.co/docs/peft/index" },
              { title: "Unsloth Fast Fine-Tuning", url: "https://github.com/unslothai/unsloth" }
            ],
            practice: {
              platform: "Google Colab (GPU)",
              task: "Configure LoRA parameters inside PeftConfig.",
              code: "from peft import LoraConfig, get_peft_model\nconfig = LoraConfig(r=16, lora_alpha=32, target_modules=['q_proj', 'v_proj'], lora_dropout=0.05, bias='none')"
            },
            checklist: ["Understand Rank (r) bounds.", "Calculate model trainable parameter ratios.", "Save model LoRA weights safely."],
            intro: "Fine-tuning alters a model's style, tone, or specific formatting skills. Training all parameters requires massive computing power. We solve this using LoRA (Low-Rank Adaptation) which freezes the base model and trains small weight adapter matrices (updating less than 1% of the model).",
            assignment: {
              title: "Problem Set 3: Instruction Tuned Adapter",
              description: "Format a dataset into instruction-following JSON configurations. Load a base model (like Llama-3-8B) in 4-bit quantization, mount LoRA adapters using PEFT, and execute a 1-epoch fine-tuning pass on local hardware/Colab. Save and evaluate the weights.",
              deliverable: "Fine-tuning scripts with training metrics graphs, and verified evaluation answers showing adapted formats."
            },
            project: {
              title: "Project Milestone: SQL-Generator Model Adapter",
              description: "Train a LoRA adapter that converts conversational prompts into valid, syntax-correct PostgreSQL commands based on a provided schema definition sheet.",
              milestone: "Deliver trained adapter weights and inference evaluation codes."
            }
          },
          {
            dayNum: 4,
            title: "Local Inference Deployments (vLLM & Ollama)",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "Quantization mechanisms (GGUF, GPTQ, AWQ). PagedAttention in vLLM. High-concurrency throughput optimization." },
              { time: "11:00 - 14:00", type: "Video", desc: "vLLM Setup: High-Throughput LLM Serving." },
              { time: "14:00 - 18:00", type: "Lab", desc: "Spin up a local API endpoint using Ollama/vLLM and configure load tests using Locust." }
            ],
            videos: [
              { title: "vLLM Setup & Concurrency Guide", channel: "NeuralSeek", url: "https://www.youtube.com/watch?v=50GPL7ZgX3s" }
            ],
            docs: [
              { title: "vLLM PagedAttention Architectures", url: "https://docs.vllm.ai/en/latest/index.html" },
              { title: "Ollama API Specifications", url: "https://github.com/ollama/ollama/blob/main/docs/api.md" }
            ],
            practice: {
              platform: "Linux Server Terminal",
              task: "Initialize local Ollama model and fetch streaming chat endpoint.",
              code: "ollama run llama3\n# Open terminal and run API curl request\ncurl http://localhost:11434/api/generate -d '{\"model\": \"llama3\", \"prompt\":\"Hello Machine\"}'"
            },
            checklist: ["Serve local endpoints via vLLM.", "Explain PagedAttention KV-Cache optimizations.", "Benchmark request-per-second latency bounds."],
            intro: "Serving raw models directly is slow and resource-heavy. Production scaling requires quantization (shrinking weights from 16-bit to 4-bit) and serving engines like vLLM, which uses PagedAttention to manage KV-cache memory like virtual operating system memory, boosting throughput by 10x.",
            assignment: {
              title: "Problem Set 4: Scalable Local Model Serving API",
              description: "Deploy a local server running vLLM. Load a quantized AWQ/GGUF model. Write a proxy API wrapper using Python/FastAPI that maps requests, tracks token speeds, and load-test the setup under 100 virtual concurrent users using Locust.",
              deliverable: "FastAPI server proxy files and Locust benchmark performance graphs."
            },
            project: {
              title: "Project Milestone: Enterprise API Gateway",
              description: "Build an API Gateway controller that balances traffic requests between local Ollama instances and fallback cloud LLM endpoints when queue latency thresholds are crossed.",
              milestone: "Provide gateway control code with metric monitoring metrics."
            }
          }
        ]
      },
      {
        title: "Module 3: Autonomous Agent Swarms & LangGraph",
        days: [
          {
            dayNum: 5,
            title: "Agent Systems, Tool Calling & CrewAI",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "ReAct loop framework (Reasoning + Acting). Tool schema definitions. Agent role division and state management." },
              { time: "11:00 - 14:00", type: "Video", desc: "CrewAI: Build multi-agent teams step by step." },
              { time: "14:00 - 18:00", type: "Project", desc: "Create a business analysis swarm using CrewAI that researches competitors and drafts HTML reports." }
            ],
            videos: [
              { title: "CrewAI Tutorial: Multi-Agent Systems", channel: "Brandon Hancock", url: "https://www.youtube.com/watch?v=sPzc6hMg7yY" }
            ],
            docs: [
              { title: "CrewAI Core Frameworks", url: "https://docs.crewai.com/" },
              { title: "OpenAI Function/Tool Calling Guidelines", url: "https://platform.openai.com/docs/guides/function-calling" }
            ],
            practice: {
              platform: "Python Editor",
              task: "Define a custom calculator tool for an agent.",
              code: "from langchain.tools import tool\n@tool\ndef multiply(a: int, b: int) -> int:\n    \"\"\"Multiplies two integers together.\"\"\"\n    return a * b"
            },
            checklist: ["Draft clean JSON Schema tool definitions.", "Initialize agents with distinct roles.", "Avoid tool execution infinite loops."],
            intro: "AI models are static until they are given tools. Agents operate using the ReAct (Reasoning and Acting) loop. They take a prompt, reason about what to do, select a tool (like search or a calculator), execute it, examine the output, and repeat until the objective is reached.",
            assignment: {
              title: "Problem Set 5: Autonomous Market Analysis Swarm",
              description: "Build a multi-agent network using CrewAI or LangChain. Agent A (Researcher) must scrape search metrics for a specific topic, Agent B (Writer) must summarize the findings into markdown reports, and Agent C (Editor) must check the formatting.",
              deliverable: "Python script executing the swarm, and sample output markdown reports generated autonomously."
            },
            project: {
              title: "Project Milestone: Automated Support Agent Swarm",
              description: "Create a customer support system where Agent A queries local vector databases for support documents, Agent B writes the response, and Agent C validates code snippets before returning.",
              milestone: "Provide multi-agent orchestration codes with active database integration."
            }
          },
          {
            dayNum: 6,
            title: "Stateful Multi-Agent Workflows (LangGraph)",
            hours: [
              { time: "08:00 - 11:00", type: "Theory", desc: "State management in cyclical systems. LangGraph nodes, edges, and conditional routers. Human-in-the-loop validation configurations." },
              { time: "11:00 - 14:00", type: "Video", desc: "LangGraph Deep-Dive: Stateful multi-agent graphs." },
              { time: "14:00 - 18:00", type: "Project", desc: "Build an autonomous code-generation and self-testing loop application using LangGraph." }
            ],
            videos: [
              { title: "LangGraph Tutorial: Stateful Agents", channel: "LangChain", url: "https://www.youtube.com/watch?v=PqS1D_Sg-3E" }
            ],
            docs: [
              { title: "LangGraph Conceptual Guides", url: "https://langchainai.github.io/langgraph/concepts/" },
              { title: "State Management in Cyclical Networks", url: "https://langchainai.github.io/langgraph/how-tos/" }
            ],
            practice: {
              platform: "Python / LangGraph",
              task: "Set up a state dict and build a LangGraph workflow.",
              code: "from langgraph.graph import StateGraph, END\nclass AgentState(TypedDict):\n    messages: list\nworkflow = StateGraph(AgentState)"
            },
            checklist: ["Define cyclical nodes and conditional routers.", "Implement State persistence across cycles.", "Configure Human-in-the-loop checkpoints."],
            intro: "Traditional agent chains are linear. Real-world tasks require cycles—like writing code, testing it, and if it fails, looping back to rewrite it. LangGraph allows building stateful, cyclical agent networks by representing workflows as graphs with nodes and edges.",
            assignment: {
              title: "Problem Set 6: Autonomous Debugging Loop",
              description: "Build a LangGraph workflow. Node A writes Python code based on a prompt, Node B executes the code inside a subprocess. If the code fails, a conditional router sends the error back to Node A to fix. If it succeeds, the workflow completes.",
              deliverable: "LangGraph orchestration file executing autonomous code generation, self-execution, and auto-debugging loops."
            },
            project: {
              title: "Project Milestone: Enterprise Research Graph",
              description: "Design an agency research network with human validation breakpoints. The system drafts market outlines, halts execution for user feedback, updates parameters, and generates final PDFs.",
              milestone: "Deliver complete LangGraph system with integrated human validation control steps."
            }
          }
        ]
      }
    ]
  }
];
