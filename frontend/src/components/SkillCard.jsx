import { getIcon } from "./iconMap.js";

export default function SkillCard({ skill }) {
  const Icon = getIcon(skill.icon);
  const proficiency = Math.max(0, Math.min(100, skill.proficiency));

  return (
    <div className="card skill-card reveal">
      <div className="skill-card-top">
        <span className="icon-wrap">
          <Icon size={18} />
        </span>
        <span className="skill-name">{skill.name}</span>
      </div>
      <div>
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{ width: `${proficiency}%` }}
            role="progressbar"
            aria-valuenow={proficiency}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${skill.name} proficiency`}
          />
        </div>
        <span className="skill-percent">{proficiency}%</span>
      </div>
    </div>
  );
}
