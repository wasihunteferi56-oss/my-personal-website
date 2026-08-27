import { GraduationCap, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/SectionTitle.jsx";
import { getIcon } from "../components/iconMap.js";
import { useReveal } from "../hooks/useReveal.js";
import { aboutContent, education, personalInfo } from "../data/portfolioData.js";

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

          <div className="about-grid">
            {/* PROFILE CARD WITH PICTURE */}
            <div className="reveal">
              <div className="card profile-card">
                <div className="profile-image-wrap">
                  <img
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} Profile`}
                    className="profile-img"
                  />
                  <div className="profile-status-badge">
                    <span className="status-dot pulsing" />
                    <span>Open for Work</span>
                  </div>
                </div>
                <div className="profile-details">
                  <h3 className="profile-name">{personalInfo.name}</h3>
                  <p className="profile-role">{personalInfo.role}</p>
                  
                  <div className="profile-info-tags">
                    <span className="profile-tag">
                      <MapPin size={14} />
                      {personalInfo.location}
                    </span>
                    <span className="profile-tag">
                      <GraduationCap size={14} />
                      Haramaya University
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BIO & VALUES */}
            <div className="reveal">
              <div className="about-bio">
                <h3 className="about-heading">
                  <Sparkles size={20} className="accent-icon" />
                  Passionate IT Student & Developer
                </h3>
                {aboutContent.paragraphs.map((p, i) => (
                  <p key={i} className="about-p">
                    {p}
                  </p>
                ))}
              </div>

              <h4 className="values-title">Core Principles & Values</h4>
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

          <div className="stats-grid" style={{ marginTop: 40 }}>
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

