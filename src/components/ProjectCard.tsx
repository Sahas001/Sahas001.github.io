import type { Project } from "@/types/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.row}>
      <div className={styles.main}>
        {(project.area || project.year) && (
          <p className={styles.meta}>
            {[project.area, project.year, project.role].filter(Boolean).join("  /  ")}
          </p>
        )}
        <h2 className={styles.name}>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h2>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.stack} aria-label="Built with">
          {project.stack.map((tech) => (
            <li key={tech} className="tag-badge">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.links}>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Source ↗
        </a>
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Live ↗
          </a>
        )}
      </div>
    </article>
  );
}
