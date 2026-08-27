import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import CertificateCard from "../components/CertificateCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";
import { certificatesData } from "../data/portfolioData.js";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useReveal([loading]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getCertificates();
        if (!cancelled) {
          if (Array.isArray(data) && data.length > 0) {
            // Merge or assign image if backend cert lacks image
            const enhanced = data.map((cert, index) => ({
              ...cert,
              image: cert.image || certificatesData[index % certificatesData.length]?.image,
              description: cert.description || certificatesData[index % certificatesData.length]?.description,
            }));
            setCertificates(enhanced);
          } else {
            setCertificates(certificatesData);
          }
        }
      } catch (err) {
        if (!cancelled) {
          // Graceful fallback to static demo certificates with pictures
          setCertificates(certificatesData);
        }
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
            eyebrow="Certificates & Credentials"
            title="Professional Certifications & Course Completion"
            subtitle="Demonstrating acquired knowledge, practical skills, and continuous learning."
          />

          {loading && <LoadingSpinner label="Loading certificates..." />}

          {!loading && certificates.length > 0 && (
            <div className="certificates-grid">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id || cert.title} certificate={cert} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

