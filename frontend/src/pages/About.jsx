import { GraduationCap } from "lucide-react";
import SectionTitle from "../components/SectionTitle.jsx";
import { getIcon } from "../components/iconMap.js";
import { useReveal } from "../hooks/useReveal.js";
import { aboutContent, education } from "../data/portfolioData.js";

export default function About() {
  useReveal();

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionTitle
            eyebrow="About Me"
            title="Building my path into software engineering"
            subtitle="A little about who I am, what drives me, and where I'm headed."
          />

          <div className="two-col">
            <div className="reveal">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} style={{ color: "var(--text-secondary)", marginBottom: 16, fontSize: "1.02rem" }}>
                  {p}
                </p>
              ))}
            </div>

            <div className="reveal">
              <div className="values-grid">
                {aboutContent.values.map((value) => {
                  const Icon = getIcon(value.icon);
                  return (
                    <div key={value.name} className="card value-chip">
                      <span className="icon-wrap">
                        <Icon size={18} />
                      </span>
                      <span>{value.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {aboutContent.stats.map((stat) => (
              <div key={stat.label} className="card stat-card reveal">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle eyebrow="Education" title="Academic background" />

          <div className="timeline">
            <div className="timeline-item reveal">
              <span className="timeline-dot" />
              <div className="card timeline-card">
                <h3 className="timeline-role">
                  <GraduationCap size={18} style={{ verticalAlign: "-3px", marginRight: 8, color: "var(--accent-blue)" }} />
                  {education.program}
                </h3>
                <div className="timeline-meta">
                  <span>{education.institution}</span>
                  <span className="badge">{education.status}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: 6 }}>
                  Topics I'm studying and exploring:
                </p>
                <div className="project-tech-list">
                  {education.topics.map((topic) => (
                    <span key={topic} className="tech-pill">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
