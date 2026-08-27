import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../data/portfolioData.js";

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail };

export default function SocialLinks({ size = 18 }) {
  return (
    <div className="social-links">
      {socialLinks.map((link) => {
        const Icon = ICONS[link.icon] || Mail;
        return (
          <a
            key={link.name}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label={link.name}
            title={link.name}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
