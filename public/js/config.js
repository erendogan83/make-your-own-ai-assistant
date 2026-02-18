/**
 * ============================================================
 *  make-your-own-chatbot — CONFIG FILE
 *  Edit ONLY this file to personalise your AI portfolio.
 *  Then deploy to GitHub Pages + Cloudflare Workers.
 * ============================================================
 */

const CONFIG = {

  /* ----------------------------------------------------------
   *  1. PERSONAL INFO
   * ---------------------------------------------------------- */
  owner: {
    name:       "Your Full Name",
    title:      "Graduate Student in EEE",
    university:  "Your University",
    email:      "your.email@domain.com",
    bio:        "I'm a researcher focusing on AI, Power Systems, and IoT. Passionate about applying machine learning to renewable energy challenges.",
    avatar:     "👨‍💻",   // emoji or URL to image
    location:   "Your City, Country",
  },

  /* ----------------------------------------------------------
   *  2. SOCIAL LINKS  (leave "" to hide)
   * ---------------------------------------------------------- */
  social: {
    github:    "https://github.com/yourusername",
    linkedin:  "https://linkedin.com/in/yourprofile",
    orcid:     "https://orcid.org/0000-0000-0000-0000",
    twitter:   "",
    website:   "",
  },

  /* ----------------------------------------------------------
   *  3. RESEARCH & THESIS
   * ---------------------------------------------------------- */
  research: {
    thesis: {
      title:    "AI-based Islanding Detection in Solar Power Plants",
      advisor:  "Prof. Dr. Advisor Name",
      year:     2025,
      keywords: ["XAI", "SHAP", "LIME", "Power Systems", "Solar Energy"],
      abstract: "This research proposes an explainable AI approach to detect islanding conditions in grid-connected solar power plants using SHAP and LIME techniques.",
      status:   "In Progress",   // "In Progress" | "Completed" | "Submitted"
    },
    interests: [
      "Explainable AI (XAI)",
      "Renewable Energy Systems",
      "IoT Applications",
      "Power Quality Monitoring",
      "Machine Learning",
    ],
  },

  /* ----------------------------------------------------------
   *  4. PROJECTS
   * ---------------------------------------------------------- */
  projects: [
    {
      name:        "Smart Room Climate Controller",
      description: "ESP32-based IoT system for intelligent HVAC control using MQTT protocol and a React dashboard.",
      tech:        ["ESP32", "MQTT", "React", "Node.js"],
      github:      "https://github.com/yourusername/climate-controller",
      demo:        "",
      year:        2024,
      status:      "Completed",
    },
    {
      name:        "LoRaWAN Air Quality Monitor",
      description: "Long-range environmental monitoring system using LoRa, BME688 sensor, and Grafana dashboards.",
      tech:        ["LoRaWAN", "BME688", "Grafana", "Python"],
      github:      "https://github.com/yourusername/air-quality",
      demo:        "",
      year:        2024,
      status:      "Completed",
    },
    {
      name:        "AI Islanding Detection",
      description: "Machine learning models with XAI explanations for detecting islanding in grid-connected PV systems.",
      tech:        ["Python", "TensorFlow", "SHAP", "LIME", "MATLAB"],
      github:      "",
      demo:        "",
      year:        2025,
      status:      "In Progress",
    },
  ],

  /* ----------------------------------------------------------
   *  5. PUBLICATIONS  (leave array empty if none yet)
   * ---------------------------------------------------------- */
  publications: [
    // {
    //   title:   "Your Paper Title",
    //   venue:   "IEEE Conference / Journal Name",
    //   year:    2024,
    //   doi:     "10.1109/xxxx",
    //   link:    "https://doi.org/10.1109/xxxx",
    // },
  ],

  /* ----------------------------------------------------------
   *  6. SKILLS
   * ---------------------------------------------------------- */
  skills: {
    programming:  ["Python", "MATLAB", "JavaScript", "C/C++"],
    ml:           ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost"],
    hardware:     ["ESP32", "Arduino", "LoRa", "PCB Design"],
    tools:        ["Simulink", "PSCAD", "KiCad", "Git", "Linux", "Docker"],
    languages:    ["Turkish (Native)", "English (Fluent)"],
  },

  /* ----------------------------------------------------------
   *  7. CHATBOT SETTINGS
   * ---------------------------------------------------------- */
  chatbot: {
    name:         "AI Assistant",       // displayed in chat header
    greeting:     "Hi! I'm the AI assistant for {owner}. Ask me about their research, projects, or skills! 👋",
    language:     "en",                 // "en" | "tr" — primary language
    bilingual:    true,                 // respond in the user's language
    suggestions: [                      // quick-reply chips shown on open
      "Tell me about your thesis",
      "What projects have you done?",
      "What are your skills?",
      "How can I contact you?",
    ],
  },

  /* ----------------------------------------------------------
   *  8. API ENDPOINT
   *  Point to your Cloudflare Worker URL after deployment.
   *  During local testing keep it as-is and run the worker locally.
   * ---------------------------------------------------------- */
  apiEndpoint: "https://your-worker.your-subdomain.workers.dev/chat",

};
