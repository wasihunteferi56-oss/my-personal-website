import { useEffect, useState } from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/SectionTitle.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useReveal([loading]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getExperience();
        if (!cancelled) setExperience(data);
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

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionTitle
            eyebrow="Experience"
            title="Where I've been applying what I learn"
            subtitle="Hands-on IT and technical support experience alongside my studies."
          />

          {loading && <LoadingSpinner label="Loading experience..." />}
          {error && !loading && (
            <div className="state-center">
              <p>Couldn't load experience right now. Is the backend running? ({error})</p>
            </div>
          )}
          {!loading && !error && experience.length === 0 && (
            <div className="state-center">
              <p>Experience entries will appear here once added in the Django admin.</p>
            </div>
          )}

          {!loading && !error && experience.length > 0 && (
            <div className="timeline">
              {experience.map((item) => (
                <div key={item.id} className="timeline-item reveal">
                  <span className="timeline-dot" />
                  <div className="card timeline-card">
                    <h3 className="timeline-role">
                      <Briefcase size={18} style={{ verticalAlign: "-3px", marginRight: 8, color: "var(--accent-blue)" }} />
                      {item.role}
                    </h3>
                    <div className="timeline-meta">
                      {item.company && <span>{item.company}</span>}
                      {item.location && <span>{item.location}</span>}
                      <span>
                        {item.start_date} — {item.end_date || "Present"}
                      </span>
                    </div>
                    {item.description && (
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.94rem", marginBottom: 10 }}>
                        {item.description}
                      </p>
                    )}
                    {item.responsibilities_list?.length > 0 && (
                      <ul className="timeline-list">
                        {item.responsibilities_list.map((r) => (
                          <li key={r}>
                            <CheckCircle2 size={15} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
