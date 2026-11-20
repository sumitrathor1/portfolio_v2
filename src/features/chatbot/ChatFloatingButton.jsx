import React from 'react';

export default function ChatFloatingButton({ onClick, isOpen, unreadCount }) {
  return (
    <div className="chatbot-launcher-wrapper">
      {!isOpen && (
        <div className="chatbot-launcher-pill hover-lift" onClick={onClick}>
          <span className="pulse-mini-dot" />
          <span>Ask My AI Assistant</span>
        </div>
      )}

      <button
        type="button"
        className={`chatbot-floating-btn hover-lift ${isOpen ? 'active' : ''}`}
        onClick={onClick}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        title={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
      >
        {isOpen ? (
          <i className="fa-solid fa-chevron-down" />
        ) : (
          <>
            <i className="fa-solid fa-robot" />
            {unreadCount > 0 && <span className="chatbot-unread-badge">{unreadCount}</span>}
          </>
        )}
      </button>
    </div>
  );
}
