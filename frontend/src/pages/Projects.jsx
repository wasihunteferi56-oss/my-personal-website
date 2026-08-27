import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectDetailsModal from "../components/ProjectDetailsModal.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";
import { projectFilters } from "../data/portfolioData.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const [activeProject, setActiveProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useReveal([loading, activeFilter]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const data = await api.getProjects(activeFilter);
        if (!cancelled) setProjects(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeFilter]);

  const handleViewDetails = async (project) => {
    setModalOpen(true);
    setModalLoading(true);
    try {
      const full = await api.getProject(project.id);
      setActiveProject(full);
    } catch {
      setActiveProject(project);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionTitle
            eyebrow="Projects"
            title="Things I've built and planned"
            subtitle="A mix of working software, mobile concepts, and business planning projects."
          />

          <div className="skills-tabs">
            {projectFilters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-chip ${activeFilter === filter.value ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading && <LoadingSpinner label="Loading projects..." />}
          {error && !loading && (
            <div className="state-center">
              <p>Couldn't load projects right now. Is the backend running? ({error})</p>
            </div>
          )}
          {!loading && !error && projects.length === 0 && (
            <div className="state-center">
              <p>No projects in this category yet.</p>
            </div>
          )}
          {!loading && !error && projects.length > 0 && (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
              ))}
            </div>
          )}
        </div>
      </section>

      {modalOpen && (
        <ProjectDetailsModal
          project={activeProject}
          loading={modalLoading}
          onClose={() => {
            setModalOpen(false);
            setActiveProject(null);
          }}
        />
      )}
    </div>
  );
}
