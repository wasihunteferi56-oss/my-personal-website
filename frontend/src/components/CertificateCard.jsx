import { useState } from "react";
import { Award, ExternalLink, Maximize2, X, Calendar, Building2 } from "lucide-react";

export default function CertificateCard({ certificate }) {
  const { title, organization, issue_date: issueDate, credential_url: credentialUrl, image, description } = certificate;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div className="card certificate-card reveal">
        <div className="certificate-image-container" onClick={() => image && setIsPreviewOpen(true)}>
          {image ? (
            <>
              <img src={image} alt={`${title} certificate demo`} className="certificate-img" />
              <div className="certificate-image-overlay">
                <span className="preview-badge">
                  <Maximize2 size={16} />
                  Preview Certificate
                </span>
              </div>
            </>
          ) : (
            <div className="certificate-fallback-icon">
              <Award size={36} />
            </div>
          )}
        </div>

        <div className="certificate-body">
          <div className="certificate-badge">Certificate</div>
          <h3 className="certificate-title">{title}</h3>
          
          <div className="certificate-meta">
            <span className="meta-item">
              <Building2 size={14} />
              {organization}
            </span>
            <span className="meta-item">
              <Calendar size={14} />
              {issueDate}
            </span>
          </div>

          {description && <p className="certificate-desc">{description}</p>}

          <div className="certificate-actions">
            {image && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Maximize2 size={14} />
                View Picture
              </button>
            )}
            {credentialUrl && credentialUrl !== "#" && (
              <a href={credentialUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <ExternalLink size={14} />
                Verify Credential
              </a>
            )}
          </div>
        </div>
      </div>

      {/* LIGHTBOX PREVIEW MODAL */}
      {isPreviewOpen && image && (
        <div className="modal-backdrop" onClick={() => setIsPreviewOpen(false)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsPreviewOpen(false)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="cert-modal-header">
              <h3>{title}</h3>
              <p>{organization} • {issueDate}</p>
            </div>
            <div className="cert-modal-body">
              <img src={image} alt={`${title} Certificate`} className="cert-modal-img" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

