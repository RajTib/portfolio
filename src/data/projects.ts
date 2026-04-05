export type BadgeType = 'security' | 'ml' | 'tool' | 'astro'

export interface Project {
  id: string
  num: string
  title: string
  desc: string
  tech: string[]
  badge: BadgeType
  github: string
  live?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'siem',
    num: '01',
    title: 'SIEM-Lite — Linux Security Monitor',
    desc: 'Lightweight SIEM pipeline for real-time monitoring of Linux auth logs. Rule-based SSH brute-force & privilege escalation detection with correlation-driven severity escalation.',
    tech: ['Python', 'Streamlit', 'Linux'],
    badge: 'security',
    github: 'https://github.com/RajTib',
  },
  {
    id: 'geoai',
    num: '02',
    title: 'GeoAI Hack — IIT Bombay TechFest',
    desc: 'National hackathon at IIT Bombay. End-to-end GeoAI pipeline for satellite-based infrastructure detection using YOLO & SegFormer. Deployed via FastAPI + Docker.',
    tech: ['YOLOv8', 'SegFormer', 'FastAPI', 'Docker'],
    badge: 'ml',
    github: 'https://github.com/RajTib',
  },
  {
    id: 'vtop',
    num: '03',
    title: 'VTOP GPA Calculator',
    desc: 'Automated GPA tool for VIT students that parses the full VTOP timetable — extracts courses, credits, and eligibility. No manual entry. Deployed on Vercel, MIT licensed.',
    tech: ['JavaScript', 'HTML5', 'Vercel'],
    badge: 'tool',
    github: 'https://github.com/RajTib/vtop-gpa-calculator',
    live: 'https://vtop-gpa-calculator.vercel.app',
  },
  {
    id: 'encryption',
    num: '04',
    title: 'Text Encryption Tool',
    desc: 'Hybrid cryptography implementation — AES (CBC mode) for symmetric encryption, RSA-2048 for key protection. Mirrors HTTPS-style encryption for secure data handling.',
    tech: ['Python', 'AES', 'RSA-2048', 'PBKDF2'],
    badge: 'security',
    github: 'https://github.com/RajTib/text-encryption-tool',
  },
  {
    id: 'keylogger',
    num: '05',
    title: 'Keylogger Research Tool',
    desc: 'Educational keyboard behavior research tool to understand OS-level input monitoring and how security software detects it. Includes Tkinter analytics dashboard.',
    tech: ['Python', 'Tkinter', 'Matplotlib'],
    badge: 'security',
    github: 'https://github.com/RajTib/keylogger-tool',
  },
  {
    id: 'astro',
    num: '06',
    title: 'Astrophysics Data Analysis',
    desc: 'Analyzed Type Ia supernova datasets to estimate the Hubble Constant (H₀) and age of the Universe. Validated results against Planck 2018 benchmarks.',
    tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
    badge: 'astro',
    github: 'https://github.com/RajTib/ISA-Summer-School',
  },
]
