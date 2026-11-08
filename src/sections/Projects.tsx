import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProject, projects } from "@/data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <div className="container-wide">
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.intro}>
          Things I&apos;ve built to learn something or scratch an itch. Everything here is open source.
        </p>
      </header>
      <div className={styles.featured}>
        <FeaturedProject project={featuredProject} />
      </div>
      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
