// data/ideas.ts
export type IdeaStatus = 'building' | 'parked' | 'done'

export interface Idea {
  id: string
  title: string
  status: IdeaStatus
  desc: string
  tags: string[]
}

export const IDEAS: Idea[] = [
  {
    id: 'cosmopedia',
    title: 'Cosmopedia',
    status: 'building',
    desc: 'Space-themed SPA with Firebase Auth + Firestore. A personal knowledge hub for astronomy and space exploration topics.',
    tags: ['Vanilla JS', 'Firebase', 'Space'],
  },
  {
    id: 'borderline',
    title: 'BorderLine',
    status: 'building',
    desc: 'A full-stack web application in progress. Backend currently being architected — check FigJam for design specs.',
    tags: ['React', 'Backend', 'In Progress'],
  },
  {
    id: 'synapse',
    title: 'Synapse',
    status: 'parked',
    desc: 'A personal dashboard project combining productivity tools, analytics, and note-taking into a single unified workspace.',
    tags: ['Dashboard', 'Productivity'],
  },
  {
    id: 'jarvis',
    title: 'Jarvis — Personal Assistant',
    status: 'building',
    desc: 'Voice + camera integrated personal assistant connecting Spotify, Notion, and Obsidian. Ongoing long-term project.',
    tags: ['Python', 'Notion API', 'Voice'],
  },
  {
    id: 'snapscript',
    title: 'SnapScript / Snap Detector',
    status: 'done',
    desc: 'Webcam-based finger snap detector using Mediapipe + audio volume hybrid approach. Modular, showcased on GitHub.',
    tags: ['Python', 'Mediapipe', 'OpenCV'],
  },
  {
    id: 'smoke',
    title: 'Smart Smoke & Gas Detector',
    status: 'done',
    desc: 'IoT project with optional ML, cloud integration, and multi-room awareness. Repo organized with docs, hardware, and software.',
    tags: ['IoT', 'ML', 'Cloud'],
  },
]
