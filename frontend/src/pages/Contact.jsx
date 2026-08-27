import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SectionTitle from "../components/SectionTitle.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { api } from "../services/api.js";
import { personalInfo } from "../data/portfolioData.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your full name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Please enter a subject.";
  if (!fields.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

const initialFields = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  useReveal();

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await api.sendContactMessage(fields);
      setStatus("success");
      setStatusMessage(res?.detail || "Thank you. Your message has been sent successfully.");
      setFields(initialFields);
    } catch (err) {
      setStatus("error");
      setStatusMessage("Something went wrong sending your message. Please try again shortly.");
    }
  };

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionTitle
            eyebrow="Contact"
            title="Let's build something together"
            subtitle="Have an opportunity, project idea, or question? I'd love to hear from you."
          />

          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-info-item">
                <span className="icon-wrap">
                  <Mail size={18} />
                </span>
                <div>
                  <div style={{ fontWeight: 600 }}>Email</div>
                  <a href={`mailto:${personalInfo.email}`} style={{ color: "var(--text-secondary)" }}>
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="icon-wrap">
                  <MapPin size={18} />
                </span>
                <div>
                  <div style={{ fontWeight: 600 }}>Location</div>
                  <span style={{ color: "var(--text-secondary)" }}>{personalInfo.location}</span>
                </div>
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Find me online</div>
                <SocialLinks />
              </div>
            </div>

            <form className="card reveal" style={{ padding: 28 }} onSubmit={handleSubmit} noValidate>
              {status === "success" && (
                <div className="form-success">
                  <CheckCircle2 size={18} />
                  {statusMessage}
                </div>
              )}
              {status === "error" && (
                <div className="form-fail">
                  <AlertCircle size={18} />
                  {statusMessage}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? "has-error" : ""}`}
                  value={fields.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p className="form-error" id="name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? "has-error" : ""}`}
                  value={fields.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p className="form-error" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  className={`form-input ${errors.subject ? "has-error" : ""}`}
                  value={fields.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p className="form-error" id="subject-error">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-textarea ${errors.message ? "has-error" : ""}`}
                  value={fields.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p className="form-error" id="message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={status === "submitting"}>
                <Send size={16} />
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
