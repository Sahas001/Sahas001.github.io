import type { Project } from "@/types/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const meta = [project.area, project.year, project.role].filter(Boolean).join(", ");
  return (
    <article className={styles.row}>
      <div>
        <h3 className={styles.name}>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        {meta && <p className={styles.meta}>{meta}</p>}
      </div>
      <div>
        <p className={styles.description}>{project.description}</p>
        <p className={styles.stack}>{project.stack.join(" / ")}</p>
        <p className={styles.links}>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-link">
            Source on GitHub ↗
          </a>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-link">
              Open it ↗
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
