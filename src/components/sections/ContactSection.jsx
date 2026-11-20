import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { personalInfo } from '../../data/personalInfo';
import { trackResumeDownload, trackSocialClick, trackContactSubmit } from '../../utils/analytics';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_message: '',
    website: '' // Honeypot field for anti-bot spam prevention
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        if (value.trim().length > 100) return 'Name is too long.';
        return '';
      case 'user_email': {
        if (!value.trim()) return 'Email is required.';
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!regex.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      }
      case 'user_message':
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        if (value.trim().length > 2500) return 'Message exceeds maximum length (2500 chars).';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is blocked
      const input = document.createElement('input');
      input.value = personalInfo.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      user_name: validateField('user_name', formData.user_name),
      user_email: validateField('user_email', formData.user_email),
      user_message: validateField('user_message', formData.user_message)
    };

    if (Object.values(newErrors).some((err) => Boolean(err))) {
      setErrors(newErrors);
      setStatus({ type: 'error', message: 'Please fix the errors above before sending.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    trackContactSubmit();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.user_name.trim(),
          email: formData.user_email.trim(),
          message: formData.user_message.trim(),
          website: formData.website // Honeypot
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message was delivered directly to Sumit\'s inbox.'
        });

        Swal.fire({
          icon: 'success',
          title: 'Message Delivered!',
          text: `Thank you, ${formData.user_name}! Your message has been sent directly to Sumit's email. He will get back to you soon at ${formData.user_email}.`,
          confirmButtonText: 'Great!',
          customClass: {
            popup: 'glass-panel'
          }
        });

        setFormData({
          user_name: '',
          user_email: '',
          user_message: '',
          website: ''
        });
        setErrors({});

      } else if (data.configured === false) {
        // Transparent disclosure when server email key is awaiting deployment configuration
        setStatus({
          type: 'info',
          message: 'Server direct delivery is awaiting RESEND_API_KEY. Opening pre-filled email client so your message is not lost...'
        });

        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.user_name}`);
        const body = encodeURIComponent(
          `Hi Sumit,\n\nName: ${formData.user_name}\nEmail: ${formData.user_email}\n\nMessage:\n${formData.user_message}`
        );
        const mailtoLink = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

        Swal.fire({
          icon: 'info',
          title: 'Ready to Dispatch!',
          text: `Your message draft has been prepared. We are opening your email client to send directly to ${personalInfo.email}.`,
          showCancelButton: true,
          confirmButtonText: 'Open Email App',
          cancelButtonText: 'Copy Email Address',
          customClass: {
            popup: 'glass-panel'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = mailtoLink;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            handleCopyEmail();
          }
        });

      } else {
        const errorMsg = data.error || 'Failed to deliver message. Please email directly or try again later.';
        setStatus({ type: 'error', message: errorMsg });
        Swal.fire({
          icon: 'error',
          title: 'Unable to Send',
          text: errorMsg,
          confirmButtonText: 'Try Again'
        });
      }
    } catch (networkErr) {
      // Network failure / offline handling
      const fallbackSubject = encodeURIComponent(`Portfolio Inquiry from ${formData.user_name}`);
      const fallbackBody = encodeURIComponent(
        `Name: ${formData.user_name}\nEmail: ${formData.user_email}\n\nMessage:\n${formData.user_message}`
      );
      const mailtoLink = `mailto:${personalInfo.email}?subject=${fallbackSubject}&body=${fallbackBody}`;

      setStatus({
        type: 'warning',
        message: 'Network error communicating with contact API. You can send directly via your mail client.'
      });

      Swal.fire({
        icon: 'warning',
        title: 'Connection Issue',
        text: `Could not reach the contact API. Would you like to open your email client to send directly to ${personalInfo.email}?`,
        showCancelButton: true,
        confirmButtonText: 'Open Email',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = mailtoLink;
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact-section container-xxl" id="contact-us">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <p className="eyebrow">Contact</p>
        <h2 className="mb-2">Let's Build Something Together</h2>
        <p className="subtitle mx-auto" style={{ maxWidth: '620px' }}>
          Have a project, engineering opportunity, or technical question? Reach out directly.
        </p>
      </div>

      {status.message && (
        <div
          className={`alert ${
            status.type === 'success'
              ? 'alert-success'
              : status.type === 'error'
              ? 'alert-danger'
              : status.type === 'info'
              ? 'alert-info'
              : 'alert-warning'
          } glass-panel hover-lift text-center mb-4`}
          data-aos="fade-up"
          role="status"
          aria-live="polite"
        >
          {status.message}
        </div>
      )}

      <div className="contact-grid" data-aos="fade-up">
        {/* LEFT: COMPACT CONTACT INFO CARD */}
        <div className="contact-info glass-panel hover-lift">
          <div className="contact-info-items">
            {/* EMAIL + COPY BUTTON */}
            <div className="info-item">
              <div className="info-item-icon">
                <i className="fa-solid fa-envelope" />
              </div>
              <div className="info-item-content w-100">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
                  <span className="info-item-label">Email</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="copy-chip-btn"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    <i className={isCopied ? 'fa-solid fa-check text-success me-1' : 'fa-regular fa-copy me-1'} />
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="info-item-value">
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="info-item">
              <div className="info-item-icon">
                <i className="fa-solid fa-location-dot" />
              </div>
              <div className="info-item-content">
                <span className="info-item-label">Location</span>
                <p className="info-item-value">{personalInfo.location}</p>
              </div>
            </div>

            {/* STATUS / AVAILABILITY */}
            <div className="info-item">
              <div className="info-item-icon">
                <i className="fa-solid fa-circle-check text-success" />
              </div>
              <div className="info-item-content">
                <span className="info-item-label">Work Status</span>
                <p className="info-item-value" style={{ color: '#4ade80', fontWeight: 600 }}>
                  {personalInfo.status || 'Open to Opportunities'}
                </p>
              </div>
            </div>
          </div>

          {/* RESUME & SOCIAL ICONS */}
          <div>
            <a
              href={personalInfo.resumePath}
              className="btn btn-secondary-ghost hover-lift w-100 mb-3 py-2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem' }}
              onClick={() => trackResumeDownload()}
            >
              <i className="fa-solid fa-download me-1.5 text-primary" /> Download Resume (PDF)
            </a>

            <div className="contact-social-row">
              {personalInfo.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-social-btn hover-lift"
                  aria-label={link.name}
                  title={link.name}
                  onClick={() => trackSocialClick(link.name)}
                >
                  <i className={link.icon.includes('linkedin') ? 'fab fa-linkedin-in' : link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: COMPACT CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="contact-form glass-panel hover-lift"
          noValidate
        >
          {/* Honeypot field (hidden from real users, traps spam bots) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website">Leave this empty</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label htmlFor="user_name" className="form-label">
                Name <span>*</span>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                className={errors.user_name ? 'is-invalid' : ''}
                required
                maxLength={100}
              />
              {errors.user_name && <p className="form-error-msg">{errors.user_name}</p>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="user_email" className="form-label">
                Email <span>*</span>
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                className={errors.user_email ? 'is-invalid' : ''}
                required
                maxLength={150}
              />
              {errors.user_email && <p className="form-error-msg">{errors.user_email}</p>}
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="user_message" className="form-label mb-0">
                  Message <span>*</span>
                </label>
                <span className="char-count-text">
                  {formData.user_message.length} / 2500
                </span>
              </div>
              <textarea
                id="user_message"
                name="user_message"
                rows="4"
                value={formData.user_message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write your project details or opportunity here..."
                className={errors.user_message ? 'is-invalid' : ''}
                required
                maxLength={2500}
              />
              {errors.user_message && <p className="form-error-msg">{errors.user_message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary-gradient w-100 mt-3 py-2.5 hover-lift"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin me-2" />
                Sending Message...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane me-1.5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
