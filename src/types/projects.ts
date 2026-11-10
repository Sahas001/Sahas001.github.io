export interface ProjectShot {
  src: string;
  /** Short name on the switcher, e.g. "Feed". */
  label: string;
  alt: string;
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  githubLink: string;
  liveLink?: string;
  year?: string;
  /** e.g. "Team of 4" or "Solo" */
  role?: string;
  /** Short label for the kind of project, e.g. "Deep learning". */
  area?: string;
  /** Concrete details: what it does and how. */
  highlights?: string[];
  /** Steps of the system, in order. */
  pipeline?: string[];
  /** Real screenshots. */
  shots?: ProjectShot[];
  /** A longer write-up elsewhere. */
  writeup?: { href: string; label: string };
}
