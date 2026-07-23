export type Project = {
  title: string
  description: string
  tags: string[]
  href?: string
}

export const projects: Project[] = [
  {
    title: "Mini Finance Dashboard",
    description:
      "Eine kleine React-Anwendung mit Diagrammen, Filterlogik und responsive Layout.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Animation Playground",
    description:
      "Interaktive UI-Experimente mit Motion, Transitions und Micro-Interactions.",
    tags: ["Animation", "UI", "React"],
  },
  {
    title: "Music Visualizer",
    description:
      "Ein visuelles Experiment zur Darstellung von Musik und Sounddaten.",
    tags: ["Audio", "Canvas", "Creative Coding"],
  },
]