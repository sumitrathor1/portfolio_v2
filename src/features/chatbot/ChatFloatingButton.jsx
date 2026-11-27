import React from 'react';

export default function ChatFloatingButton({ onClick, isOpen, unreadCount }) {
  return (
    <div className="chatbot-launcher-wrapper">
      {!isOpen && (
        <div className="chatbot-launcher-pill hover-lift" onClick={onClick}>
          <span className="pulse-mini-dot" />
          <span>Chat with Sumit</span>
        </div>
      )}

      <button
        type="button"
        className={`chatbot-floating-btn hover-lift ${isOpen ? 'active' : ''}`}
        onClick={onClick}
        aria-label={isOpen ? 'Close chat with Sumit' : 'Chat with Sumit'}
        title={isOpen ? 'Close chat with Sumit' : 'Chat with Sumit'}
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
