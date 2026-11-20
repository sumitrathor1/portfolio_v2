import React, { useState, useEffect } from 'react';

export default function DocumentPreviewModal({ isOpen, doc, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setIsLoading(true);
      setHasError(false);
      document.body.classList.add('doc-preview-open');

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.classList.remove('doc-preview-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, doc, onClose]);

  if (!isOpen || !doc) return null;

  const isPdf =
    doc.type === 'pdf' ||
    (typeof doc.url === 'string' && doc.url.toLowerCase().endsWith('.pdf'));

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleZoomReset = () => setZoom(1);

  return (
    <div
      className="doc-preview-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={doc.title || 'Document Preview'}
    >
      <div
        className="doc-preview-window glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP TOOLBAR */}
        <div className="doc-preview-toolbar">
          <div className="doc-preview-title-wrap">
            <span className="doc-type-badge">
              <i className={isPdf ? 'fa-solid fa-file-pdf text-danger' : 'fa-solid fa-image text-info'} />
              <span>{isPdf ? 'PDF DOCUMENT' : 'IMAGE PREVIEW'}</span>
            </span>
            <h3 className="doc-preview-title text-truncate" title={doc.title}>
              {doc.title || 'Document Preview'}
            </h3>
          </div>

          <div className="doc-preview-actions">
            {!isPdf && (
              <div className="doc-zoom-controls">
                <button
                  type="button"
                  className="btn-doc-tool"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                  disabled={zoom <= 0.5}
                >
                  <i className="fa-solid fa-magnifying-glass-minus" />
                </button>
                <span className="doc-zoom-level">{Math.round(zoom * 100)}%</span>
                <button
                  type="button"
                  className="btn-doc-tool"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  aria-label="Zoom In"
                  disabled={zoom >= 2.5}
                >
                  <i className="fa-solid fa-magnifying-glass-plus" />
                </button>
                <button
                  type="button"
                  className="btn-doc-tool"
                  onClick={handleZoomReset}
                  title="Fit to Screen"
                  aria-label="Fit to Screen"
                >
                  <i className="fa-solid fa-arrows-to-eye" />
                </button>
              </div>
            )}

            {doc.url && (
              <a
                href={doc.url}
                download
                className="btn-doc-tool"
                title="Download file"
                aria-label="Download file"
              >
                <i className="fa-solid fa-download" />
              </a>
            )}

            {doc.url && (
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-doc-tool"
                title="Open original in new tab"
                aria-label="Open original in new tab"
              >
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            )}

            <button
              type="button"
              className="btn-doc-tool btn-doc-close"
              onClick={onClose}
              title="Close Preview (ESC)"
              aria-label="Close Preview"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        {/* PREVIEW VIEWPORT */}
        <div className="doc-preview-viewport">
          {isLoading && !hasError && (
            <div className="doc-preview-loading">
              <div className="spinner-border text-info mb-2" role="status" />
              <p className="text-muted small">Loading document preview...</p>
            </div>
          )}

          {hasError ? (
            <div className="doc-preview-error text-center py-5">
              <i className="fa-solid fa-triangle-exclamation fa-3x text-warning mb-3" />
              <h4 className="text-white mb-2">Document Offline or Pending Digital Verification</h4>
              <p className="text-muted mx-auto mb-4" style={{ maxWidth: '480px' }}>
                The physical document file (<code>{doc.url}</code>) is currently offline or restricted.
                You can reach out to Sumit directly to request a copy or verify credentials.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="#contact-us" onClick={onClose} className="btn btn-primary-gradient hover-lift px-3 py-1.5 small">
                  <i className="fa-solid fa-envelope me-1.5" /> Contact Sumit
                </a>
                <button type="button" onClick={onClose} className="btn btn-secondary-ghost hover-lift px-3 py-1.5 small">
                  Close Preview
                </button>
              </div>
            </div>
          ) : isPdf ? (
            <div className="doc-pdf-container">
              <iframe
                src={`${doc.url}#toolbar=1&navpanes=0`}
                className="doc-pdf-iframe"
                title={doc.title}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              />
              <div className="doc-pdf-mobile-fallback d-md-none text-center p-3">
                <p className="text-muted small mb-2">
                  Viewing PDF on mobile? If the viewer is constrained, you can view directly or download below:
                </p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary-gradient px-3 py-1.5"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square me-1" /> Open Fullscreen PDF
                </a>
              </div>
            </div>
          ) : (
            <div className="doc-image-container">
              <img
                src={doc.url}
                alt={doc.title || 'Certificate'}
                className="doc-preview-image"
                style={{ transform: `scale(${zoom})` }}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              />
            </div>
          )}
        </div>

        {/* BOTTOM METADATA BAR */}
        {doc.description && (
          <div className="doc-preview-footer">
            <p className="doc-preview-desc mb-0 text-muted small">{doc.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
