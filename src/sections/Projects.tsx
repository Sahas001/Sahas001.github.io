import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import WorkShowcase from "@/components/WorkShowcase";
import { featuredProjects, projects } from "@/data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <>
      <div className="container-wide">
        <PageHeader title="Projects">
          Things I&apos;ve built, mostly to learn how something works. All of it is open source.
        </PageHeader>
      </div>

      <WorkShowcase projects={featuredProjects} />

      <section className={`${styles.more} container-wide`} aria-labelledby="more-heading">
        <h2 id="more-heading" className={styles.moreTitle}>
          More projects
        </h2>
        <div className={styles.list}>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
