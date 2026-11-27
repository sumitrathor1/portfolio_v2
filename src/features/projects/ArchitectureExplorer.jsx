import React, { useState } from 'react';

export default function ArchitectureExplorer({ isOpen, onClose }) {
  const [activeSystem, setActiveSystem] = useState('rakshak');
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const systems = {
    rakshak: {
      id: 'rakshak',
      title: 'DRDO Rakshak AI',
      subtitle: 'Air-Gapped Sovereign Local RAG Knowledge Assistant',
      badge: 'Research Internship · DRDO CFEES',
      badgeColor: 'border-warning text-warning',
      caseStudyUrl: '/projects/rakshak-ai/',
      githubUrl: 'https://github.com/sumitrathor1/Rakshak-AI-Ragbot',
      constraints: [
        '100% Offline & Air-Gapped (Zero public internet or cloud LLM API calls allowed)',
        'On-Premise Data Privacy: Internal technical PDFs and manuals remain strictly local',
        'Sub-second semantic vector similarity search across multi-page technical PDFs',
        'Deterministic Source Citations linking every generated response back to exact document page'
      ],
      stages: [
        {
          name: '1. Ingestion & Preprocessing',
          tag: 'Data Pipeline',
          icon: 'fa-solid fa-file-pdf',
          tech: ['PyPDF', 'RecursiveCharacterTextSplitter', 'Python'],
          details:
            'Internal technical manuals, engineering guidelines, and research PDFs are ingested. Text is extracted and split recursively into 500-character chunks with a 50-character semantic overlap to preserve contextual continuity between sentences.'
        },
        {
          name: '2. Local Embedding Generation',
          tag: 'Embedding Engine',
          icon: 'fa-solid fa-brain',
          tech: ['Ollama', 'nomic-embed-text / all-minilm', 'Local Compute'],
          details:
            'Chunks are transformed into high-dimensional dense vector embeddings purely on local hardware using Ollama embedding models without querying external SaaS providers. Embeddings run completely offline.'
        },
        {
          name: '3. Vector Store & Indexing',
          tag: 'Vector DB',
          icon: 'fa-solid fa-database',
          tech: ['ChromaDB', 'Cosine Similarity', 'Local SQLite Persistence'],
          details:
            'ChromaDB vector store persists document embeddings on local disk. Vector indexing utilizes cosine similarity metrics for fast approximate nearest neighbor (ANN) retrieval across thousands of document chunks.'
        },
        {
          name: '4. Retrieval & Context Augmentation',
          tag: 'RAG Core',
          icon: 'fa-solid fa-filter',
          tech: ['LangChain', 'Top-K Retrieval (k=4)', 'Prompt Engineering'],
          details:
            'When an engineer enters a query, the system retrieves the top-4 most semantically relevant text chunks. The chunks are merged with a structured system prompt strictly instructing the model to reply using only provided citations.'
        },
        {
          name: '5. Air-Gapped Inference & UI',
          tag: 'Presentation',
          icon: 'fa-solid fa-desktop',
          tech: ['Streamlit', 'Llama 3 / Mistral (Local)', 'Citation Engine'],
          details:
            'The locally hosted LLM generates the final answer in real time. The Streamlit interface displays the answer along with exact document name and page number citations, allowing engineers to verify claims immediately.'
        }
      ]
    },
    mandola: {
      id: 'mandola',
      title: 'Mandola Multi-Vendor Platform',
      subtitle: '3-Tier High-Performance E-Commerce Single Page Application',
      badge: '55+ Screens · React 18 · TypeScript',
      badgeColor: 'border-info text-info',
      caseStudyUrl: '/projects/mandola/',
      githubUrl: null,
      constraints: [
        '55+ custom screens supporting 3 distinct portals: Customer, Seller Hub, and SuperAdmin',
        'Modular Tailwind CSS v4 styling with zero visual bundle bloat',
        'Role-Based Access Control (RBAC) preventing unauthorized cross-portal navigation',
        'Multi-vendor inventory partitioning and instant sub-100ms catalog search'
      ],
      stages: [
        {
          name: '1. Modular Presentation Layer',
          tag: 'Frontend SPA',
          icon: 'fa-brands fa-react',
          tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS v4'],
          details:
            'Component-driven architecture cleanly separated into Customer Storefront, Vendor Management Dashboard, and SuperAdmin Analytics. Optimized bundle chunking and lazy-loaded route splits keep initial load under 150KB.'
        },
        {
          name: '2. State Management & Navigation',
          tag: 'Client State',
          icon: 'fa-solid fa-diagram-project',
          tech: ['React Router v6', 'Context API / Zustand', 'Custom Hooks'],
          details:
            'Global shopping cart state, seller product variant matrices, and multi-step checkout flows managed with predictable immutable state. Protected routes enforce authentication states.'
        },
        {
          name: '3. API Gateway & Middleware',
          tag: 'Backend Layer',
          icon: 'fa-solid fa-server',
          tech: ['Node.js', 'Express.js', 'JWT Auth', 'Rate Limiter'],
          details:
            'RESTful API gateway handles authentication, seller product verification, order fulfillment triggers, and rate limiting against DDoS and automated credential scraping.'
        },
        {
          name: '4. Relational Database Partitioning',
          tag: 'Persistence Tier',
          icon: 'fa-solid fa-database',
          tech: ['MySQL', 'Relational Schemas', 'Foreign Key Constraints'],
          details:
            'Normalized relational tables isolating vendor products, customer orders, inventory SKU counts, and payment logs with ACID transaction guarantees during concurrent checkouts.'
        },
        {
          name: '5. Asset Delivery & CDN Caching',
          tag: 'Performance',
          icon: 'fa-solid fa-bolt',
          tech: ['Cloudinary CDN', 'WebP Optimization', 'HTTP Cache Headers'],
          details:
            'High-resolution garment and fashion photography automatically compressed, resized, and cached via modern WebP formats on edge CDN, reducing mobile data consumption.'
        }
      ]
    },
    inventory: {
      id: 'inventory',
      title: 'Hardware Inventory & Borrowing Portal',
      subtitle: 'Real-Time Edge Inventory Tracking with Row-Level Security',
      badge: 'Innovation Club · MITS Gwalior',
      badgeColor: 'border-accent text-accent',
      caseStudyUrl: '/projects/hardware-inventory/',
      githubUrl: null,
      constraints: [
        'Live hardware borrowing & return logging for hundreds of microcontrollers and sensors',
        'Camera QR code scanning working instantly in student mobile browsers without native app install',
        'Database Row-Level Security (RLS) guaranteeing students only edit their own borrowing logs',
        'Real-time stock deduction notifying lab coordinators immediately'
      ],
      stages: [
        {
          name: '1. Client QR Capture Engine',
          tag: 'Client Optical Engine',
          icon: 'fa-solid fa-qrcode',
          tech: ['React', 'jsQR', 'WebRTC Camera Stream', 'HTML5 Canvas'],
          details:
            'Extracts real-time video frames from user camera, rendering to hidden canvas buffers. Detects and decodes QR codes printed on hardware component bins within 120ms.'
        },
        {
          name: '2. Authentication & Authorization',
          tag: 'Security Layer',
          icon: 'fa-solid fa-shield-halved',
          tech: ['Supabase Auth', 'JWT Claims', 'RBAC'],
          details:
            'Separates college student borrowers from club inventory managers using JWT authentication. Only verified students with valid enrollment numbers can initiate equipment loans.'
        },
        {
          name: '3. Row-Level Security (RLS) Policies',
          tag: 'Data Policy Engine',
          icon: 'fa-solid fa-lock',
          tech: ['PostgreSQL RLS', 'SQL Security Policies'],
          details:
            'PostgreSQL policies prevent users from modifying records outside their session ownership. Lab admins possess overarching audit permissions to approve or close returns.'
        },
        {
          name: '4. Real-time PostgreSQL CDC',
          tag: 'Sync Layer',
          icon: 'fa-solid fa-rotate',
          tech: ['Supabase Realtime', 'WebSockets', 'Change Data Capture'],
          details:
            'When a student borrows an Arduino or Raspberry Pi, a PostgreSQL trigger fires, broadcasting WebSocket events to update live stock counts on all connected lab screens.'
        }
      ]
    }
  };

  const currentSys = systems[activeSystem];

  if (!isOpen) return null;

  return (
    <div
      className="architecture-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Project Architecture Explorer"
    >
      <div
        className="architecture-modal glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="architecture-header">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="text-gradient fw-bold text-uppercase small">System Architecture</span>
              <span className={`badge border ${currentSys.badgeColor} px-2 py-0.5 small`}>
                {currentSys.badge}
              </span>
            </div>
            <h3 className="mb-0 text-white fw-bold">{currentSys.title}</h3>
            <p className="text-muted small mb-0 mt-0.5">{currentSys.subtitle}</p>
          </div>

          <button
            type="button"
            className="architecture-close-btn"
            onClick={onClose}
            aria-label="Close architecture explorer"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* SYSTEM SELECTOR TABS */}
        <div className="architecture-tabs">
          {Object.values(systems).map((s) => (
            <button
              key={s.id}
              type="button"
              className={`arch-tab-btn ${activeSystem === s.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSystem(s.id);
                setActiveStageIndex(0);
              }}
            >
              <i className="fa-solid fa-layer-group" />
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* CORE CONSTRAINTS & CHALLENGES BAR */}
        <div className="arch-constraints-box glass-panel mb-4">
          <div className="constraints-title text-info fw-bold small mb-2 d-flex align-items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-warning" />
            <span>Key Engineering Constraints & Requirements:</span>
          </div>
          <div className="row g-2">
            {currentSys.constraints.map((c, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="constraint-item">
                  <i className="fa-solid fa-check text-success flex-shrink-0" style={{ marginTop: '0.2rem' }} />
                  <span>{c}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PIPELINE / ARCHITECTURE STAGES FLOW */}
        <div className="arch-pipeline-container mb-4">
          <div className="arch-pipeline-track">
            {currentSys.stages.map((stg, idx) => {
              const isSelected = idx === activeStageIndex;
              return (
                <div
                  key={idx}
                  className={`arch-stage-node glass-panel hover-lift ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveStageIndex(idx)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="stage-node-icon">
                    <i className={stg.icon} />
                  </div>
                  <div className="stage-node-label">{stg.name}</div>
                  <span className="stage-node-tag">{stg.tag}</span>
                  {idx < currentSys.stages.length - 1 && (
                    <div className="stage-connector-arrow">
                      <i className="fa-solid fa-arrow-right" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED STAGE DEEP DIVE */}
        <div className="arch-stage-inspector glass-panel">
          <div className="inspector-header d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="inspector-number-badge">
                Stage {activeStageIndex + 1} of {currentSys.stages.length}
              </span>
              <h4 className="mb-0 text-white fw-bold">
                {currentSys.stages[activeStageIndex].name}
              </h4>
            </div>
            <div className="d-flex flex-wrap gap-1">
              {currentSys.stages[activeStageIndex].tech.map((t, idx) => (
                <span key={idx} className="arch-tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="inspector-desc text-muted mb-4" style={{ lineHeight: 1.7 }}>
            {currentSys.stages[activeStageIndex].details}
          </p>

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top border-secondary">
            <div className="text-muted small">
              Click any stage above to inspect underlying components and data flow.
            </div>
            <div className="d-flex align-items-center gap-2">
              {currentSys.caseStudyUrl && (
                <a
                  href={currentSys.caseStudyUrl}
                  className="btn btn-secondary-ghost hover-lift py-2 px-3 small"
                >
                  <i className="fa-solid fa-circle-info me-2" /> View Full Case Study
                </a>
              )}
              {currentSys.githubUrl && (
                <a
                  href={currentSys.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary hover-lift py-2 px-3 small"
                >
                  <i className="fa-brands fa-github me-2" /> View Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="architecture-footer mt-4 text-center">
          <button
            type="button"
            className="btn btn-secondary-ghost hover-lift px-4"
            onClick={onClose}
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
}
