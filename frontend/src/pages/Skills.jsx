import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import SkillCard from "../components/SkillCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";
import { skillCategoryLabels } from "../data/portfolioData.js";

const CATEGORY_ORDER = ["frontend", "backend", "database", "it_support", "tools", "learning"];

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useReveal([loading, activeCategory]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getSkills();
        if (!cancelled) setSkills(data);
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

  const categories = CATEGORY_ORDER.filter((cat) => skills.some((s) => s.category === cat));
  const visibleCategories = activeCategory === "all" ? categories : [activeCategory];

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionTitle
            eyebrow="Skills"
            title="What I work with"
            subtitle="An honest snapshot of my current technical skill levels — always growing."
          />

          {loading && <LoadingSpinner label="Loading skills..." />}
          {error && !loading && (
            <div className="state-center">
              <p>Couldn't load skills right now. Is the backend running? ({error})</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="skills-tabs">
                <button
                  className={`filter-chip ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-chip ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {skillCategoryLabels[cat]}
                  </button>
                ))}
              </div>

              {visibleCategories.map((cat) => (
                <div key={cat} className="skills-category-block">
                  <div className="skills-category-heading">// {skillCategoryLabels[cat]}</div>
                  <div className="skills-grid">
                    {skills
                      .filter((s) => s.category === cat)
                      .map((skill) => (
                        <SkillCard key={skill.id} skill={skill} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
