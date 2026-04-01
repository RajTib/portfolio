export interface Idea {
  name: string;
  status: 'Build' | 'Parked' | 'Building' | 'Passive';
}

export const ideas: Idea[] = [
  { name: "BorderLine", status: "Build" },
  { name: "Synapse", status: "Parked" },
  { name: "Portfolio Website", status: "Building" },
];
