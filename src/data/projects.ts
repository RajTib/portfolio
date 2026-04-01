export interface Project {
  title: string;
  description: string;
  status: 'Active' | 'Flagship' | 'In Development';
  tech: string[];
}

export const projects: Project[] = [
  {
    title: "Borderline",
    description: "A high-performance, system-level application focused on bridging gap between hardware abstraction and user experience.",
    status: "Flagship",
    tech: ["Systems", "C++", "Kernel"]
  },
  {
    title: "SnapScript",
    description: "Computer vision powered file automation. Control your digital workspace using intuitive physical gestures.",
    status: "Active",
    tech: ["Python", "OpenCV", "OS API"]
  },
  {
    title: "Smart Smoke & Gas Detector",
    description: "Enterprise-grade IoT safety system integrating machine learning for predictive fire analysis and cloud reporting.",
    status: "Active",
    tech: ["IoT", "ML", "Node.js"]
  }
];