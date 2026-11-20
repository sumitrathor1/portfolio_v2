import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { personalInfo } from '../../data/personalInfo';
import { trackResumeDownload, trackSocialClick, trackContactSubmit } from '../../utils/analytics';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, user_email, user_message } = formData;

    if (!user_name.trim() || !user_email.trim() || !user_message.trim()) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setIsSubmitting(true);
    trackContactSubmit();

    // Show immediate feedback to user
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been prepared. Opening your email client to send directly to Sumit...'
      });

      // Construct mailto URL to provide working email dispatch without PHP/MySQL backend
      const subject = encodeURIComponent(`Portfolio Inquiry from ${user_name}`);
      const body = encodeURIComponent(
        `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${user_message}`
      );
      const mailtoLink = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: `Thank you, ${user_name}! Your email draft has been generated. Sumit will get back to you soon at ${user_email}.`,
        confirmButtonText: 'Great!',
        timer: 4000
      });

      // Trigger mailto client
      window.location.href = mailtoLink;

      // Reset form
      setFormData({
        user_name: '',
        user_email: '',
        user_message: ''
      });
    }, 400);
  };

  return (
    <section className="section contact-section container-xxl" id="contact-us">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <p className="eyebrow">Contact</p>
        <h2 className="mb-2">Let's Build Something Together</h2>
        <p className="subtitle mx-auto" style={{ maxWidth: '620px' }}>
          Have a project, opportunity, or idea? Let's talk.
        </p>
      </div>

      {status.message && (
        <div
          className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} glass-panel hover-lift text-center mb-4`}
          data-aos="fade-up"
        >
          {status.message}
        </div>
      )}

      <div className="contact-grid" data-aos="fade-up">
        {/* LEFT: COMPACT CONTACT INFO CARD */}
        <div className="contact-info glass-panel hover-lift" style={{ marginInline: '0.75rem' }}>
          <div className="contact-info-items">
            {/* EMAIL */}
            <div className="info-item">
              <div className="info-item-icon">
                <i className="fa-solid fa-envelope" />
              </div>
              <div className="info-item-content">
                <span className="info-item-label">Email</span>
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

            {/* VISITORS */}
            <div className="info-item">
              <div className="info-item-icon">
                <i className="fa-solid fa-users" />
              </div>
              <div className="info-item-content">
                <span className="info-item-label">Visitors</span>
                <p className="info-item-value" style={{ color: '#38bdf8', fontWeight: 700 }}>
                  {personalInfo.visitorCount}
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
              <i className="fa-solid fa-download me-1.5 text-primary" /> Download Resume
            </a>

            <div className="contact-social-row">
              {personalInfo.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-social-btn"
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
          style={{ marginInline: '0.75rem' }}
        >
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
                placeholder="Your name"
                required
              />
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
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="user_message" className="form-label">
                Message <span>*</span>
              </label>
              <textarea
                id="user_message"
                name="user_message"
                rows="4"
                value={formData.user_message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary-gradient w-100 mt-3 py-2.5 hover-lift"
            disabled={isSubmitting}
          >
            <i className="fa-solid fa-paper-plane me-1.5" />{' '}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
