import { personalInfo } from "../data/portfolioData.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-copy">
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p className="footer-tagline">Built with React &amp; Django.</p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
