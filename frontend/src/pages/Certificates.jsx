import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import CertificateCard from "../components/CertificateCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useReveal([loading]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getCertificates();
        if (!cancelled) setCertificates(data);
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
            eyebrow="Certificates"
            title="Credentials I've earned"
            subtitle="More certificates are being added as I continue learning."
          />

          {loading && <LoadingSpinner label="Loading certificates..." />}
          {error && !loading && (
            <div className="state-center">
              <p>Couldn't load certificates right now. Is the backend running? ({error})</p>
            </div>
          )}
          {!loading && !error && certificates.length === 0 && (
            <div className="state-center">
              <p>No certificates added yet. Add them from the Django admin.</p>
            </div>
          )}
          {!loading && !error && certificates.length > 0 && (
            <div className="certificates-grid">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
