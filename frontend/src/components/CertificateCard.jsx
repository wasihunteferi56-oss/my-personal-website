import { Award, ExternalLink } from "lucide-react";

export default function CertificateCard({ certificate }) {
  const { title, organization, issue_date: issueDate, credential_url: credentialUrl, image } = certificate;

  return (
    <div className="card certificate-card reveal">
      <div className="certificate-image">
        {image ? (
          <img src={image} alt={`${title} certificate`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
        ) : (
          <Award size={26} />
        )}
      </div>
      <div>
        <h3 className="certificate-title">{title}</h3>
        <p className="certificate-org">{organization}</p>
        <p className="certificate-date">{issueDate}</p>
        {credentialUrl && (
          <a href={credentialUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <ExternalLink size={14} />
            View Certificate
          </a>
        )}
      </div>
    </div>
  );
}
