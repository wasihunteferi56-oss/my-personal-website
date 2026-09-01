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
          <div className="footer-links">
            <p className="footer-tagline">Build &amp; Trust.</p>
            <span className="footer-divider">•</span>
            <a href="/admin/" className="admin-link">Admin Panel</a>
          </div>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
