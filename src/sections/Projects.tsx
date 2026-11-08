import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProject, projects } from "@/data/projects";
import PageHeader from "@/components/PageHeader";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <div className="container-wide">
      <PageHeader title="Projects">
        Things I&apos;ve built, mostly to learn how something works. All of it is open source.
      </PageHeader>
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
