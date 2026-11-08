import { Project } from "@/types/projects";

export const featuredProject: Project = {
  name: "AgroGuard",
  area: "Deep learning",
  year: "2024",
  role: "Team of 4",
  description:
    "Upload a photo of a maize leaf and AgroGuard tells you which disease it has, if any, and how to treat it.",
  pipeline: ["Leaf photo", "YOLO classifier", "Flask API", "Diagnosis and treatment"],
  highlights: [
    "Image-classification model trained with Ultralytics YOLO on four classes: common rust, gray leaf spot, northern leaf blight and healthy.",
    "A Flask API runs the model, only reports a disease above a confidence threshold, and returns treatment advice from a curated dataset.",
    "React and TypeScript front end for uploading photos and reading the result.",
  ],
  stack: ["Python", "YOLO", "Flask", "React", "TypeScript"],
  githubLink: "https://github.com/Sahas001/AgroGuard",
};

export const projects: Project[] = [
  {
    name: "Simple Container",
    area: "Systems",
    year: "2025",
    role: "Solo",
    description:
      "A tiny container runtime in Go. It runs a command in its own UTS and PID namespaces, chroots into a root filesystem, mounts /proc and drops to an unprivileged user.",
    stack: ["Go", "Linux namespaces"],
    githubLink: "https://github.com/Sahas001/simple-container",
  },
  {
    name: "Service Management System",
    area: "Full stack",
    year: "2024",
    description:
      "Lets service providers add, update and remove their services, and lets customers book them and track their bookings.",
    stack: ["React", "TypeScript", "Go", "PostgreSQL"],
    githubLink: "https://github.com/Sahas001/service-management-system",
  },
  {
    name: "Netflix Clone",
    area: "Front end",
    year: "2024",
    description: "A Netflix-style streaming UI built with React, TypeScript and Tailwind CSS.",
    stack: ["React", "TypeScript", "Tailwind"],
    githubLink: "https://github.com/Sahas001/netflix-clone",
  },
];
