import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectDetailsModal from "../components/ProjectDetailsModal.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";
import { heroContent, personalInfo } from "../data/portfolioData.js";

function useTypingEffect(phrases, typingSpeed = 70, deletingSpeed = 40, pause = 1400) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setPhraseIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause]);

  return text;
}

function TerminalPanel() {
  return (
    <div className="terminal">
      <div className="floating-chip chip-1">🎓 Haramaya University</div>
      <div className="floating-chip chip-2">💻 Trying</div>
      <div className="terminal-bar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">whoami.py</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">$</span> python whoami.py
        </div>
        <div className="terminal-line">&nbsp;</div>
        <div className="terminal-line">
          <span className="terminal-key">name</span> = <span className="terminal-string">"Wasihun Teferi"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-key">student_at</span> = <span className="terminal-string">"Haramaya University"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-key">program</span> = <span className="terminal-string">"Information Technology"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-key">currently</span> = <span className="terminal-string">"IT Intern,MCE"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-key">interests</span> = <span className="terminal-string">"web dev"</span>, <span className="terminal-string">"AI"</span>, <span className="terminal-string">"networking"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-key">goal</span> = <span className="terminal-string">"full-stack software engineer"</span>
        </div>
        <div className="terminal-line">&nbsp;</div>
        <div className="terminal-line terminal-comment"># still building, still learning</div>
      </div>
    </div>
  );
}

export default function Home() {
  const typed = useTypingEffect(personalInfo.typingPhrases);

  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeProject, setActiveProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useReveal([loading]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getProjects("all");
        if (!cancelled) setFeatured(data.slice(0, 3));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <p className="hero-greeting">{heroContent.greeting}</p>
            <h1 className="hero-name">
              {personalInfo.name.split(" ")[0]} <span className="gradient-text">{personalInfo.name.split(" ")[1]}</span>
            </h1>
            <p className="hero-role">
              {typed}
              <span className="hero-cursor" aria-hidden="true" />
            </p>
            <p className="hero-desc">{heroContent.description}</p>
            <div className="hero-ctas">
              <Button to="/projects" variant="primary">
                {heroContent.ctaPrimary}
                <ArrowRight size={16} />
              </Button>
              <Button href={personalInfo.resumeFile} download variant="secondary">
                {heroContent.ctaSecondary}
              </Button>
              <Button to="/contact" variant="ghost">
                <MessageSquare size={16} />
                {heroContent.ctaTertiary}
              </Button>
            </div>
            <div className="hero-scroll-indicator">
              <ArrowDown size={14} />
              SCROLL TO EXPLORE
            </div>
          </div>
          <TerminalPanel />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Selected Work"
            title="A few things I've built"
            subtitle="Real projects built while learning — from IT support tooling to web and mobile concepts."
          />

          {loading && <LoadingSpinner label="Loading projects..." />}
          {error && !loading && (
            <div className="state-center">
              <p>Couldn't load projects right now. Is the backend running? ({error})</p>
            </div>
          )}
          {!loading && !error && (
            <>
              <div className="projects-grid">
                {featured.map((project) => (
                  <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
                ))}
              </div>
              <div style={{ marginTop: 36, textAlign: "center" }}>
                <Button to="/projects" variant="secondary">
                  View All Projects
                  <ArrowRight size={16} />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* RESUME CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="resume-cta reveal">
            <h2>Interested in learning more about my background and experience?</h2>
            <p>Download my resume for a full overview of my education, skills, and projects.</p>
            <Button href={personalInfo.resumeFile} download variant="primary">
              {heroContent.ctaSecondary}
            </Button>
          </div>
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
