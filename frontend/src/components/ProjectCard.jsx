import { Github, ExternalLink, Eye, FolderGit2 } from "lucide-react";

export default function ProjectCard({ project, onViewDetails }) {
  const {
    title,
    description,
    category,
    technologies_list: technologies = [],
    image,
    github_url: githubUrl,
    live_url: liveUrl,
    featured,
  } = project;

  return (
    <article className="card project-card reveal">
      <div className="project-image">
        {image ? (
          <img src={image} alt={`${title} preview`} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        ) : (
          <FolderGit2 size={34} />
        )}
      </div>
      <div className="project-body">
        <span className="project-category">
          {category.replace("_", " ")}
          {featured ? " · Featured" : ""}
        </span>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <div className="project-tech-list">
          {technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => onViewDetails(project)}>
            <Eye size={15} />
            Details
          </button>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <Github size={15} />
              GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
