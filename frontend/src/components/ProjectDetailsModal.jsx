import { useEffect } from "react";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function ProjectDetailsModal({ project, loading, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={project ? `${project.title} details` : "Project details"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{project ? project.title : "Loading project"}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close details">
            <X size={18} />
          </button>
        </div>

        {loading || !project ? (
          <LoadingSpinner label="Loading project details..." />
        ) : (
          <div className="modal-body">
            <p>{project.detailed_description || project.description}</p>

            {project.problem && (
              <div>
                <div className="modal-section-label">Problem</div>
                <p>{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <div className="modal-section-label">Solution</div>
                <p>{project.solution}</p>
              </div>
            )}

            {project.features_list?.length > 0 && (
              <div>
                <div className="modal-section-label">Features</div>
                <ul className="timeline-list" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {project.features_list.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.technologies_list?.length > 0 && (
              <div>
                <div className="modal-section-label">Technologies</div>
                <div className="project-tech-list">
                  {project.technologies_list.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.role && (
              <div>
                <div className="modal-section-label">My Role</div>
                <p>{project.role}</p>
              </div>
            )}

            {project.lessons_learned && (
              <div>
                <div className="modal-section-label">Lessons Learned</div>
                <p>{project.lessons_learned}</p>
              </div>
            )}

            <div className="project-actions">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <Github size={15} />
                  GitHub
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
