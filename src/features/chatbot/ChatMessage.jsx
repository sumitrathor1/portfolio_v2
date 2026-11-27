import React from 'react';

export default function ChatMessage({ message, onActionClick }) {
  const isBot = message.sender === 'bot';

  // Format links in text safely
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, idx) => (
      <span key={idx}>
        {line}
        {idx < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={`chat-message-row ${isBot ? 'bot-row' : 'user-row'}`}>
      {isBot && (
        <div className="chat-avatar bot-avatar">
          <img
            src="/assets/images/sumit.jpg"
            alt="Sumit Rathor"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
      )}

      <div className={`chat-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <div className="chat-bubble-text">
          {renderFormattedText(message.text)}
        </div>

        {/* OPTIONAL CTA ACTION BUTTON */}
        {message.action && (
          <div className="chat-bubble-action mt-2 pt-1">
            <a
              href={message.action.url}
              className="chat-action-btn"
              target={message.action.url.startsWith('http') ? '_blank' : undefined}
              rel={message.action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => {
                if (onActionClick) onActionClick(message.action);
              }}
            >
              <span>{message.action.label}</span>
              <i className="fa-solid fa-arrow-up-right-from-square ms-1" style={{ fontSize: '0.7rem' }} />
            </a>
          </div>
        )}

        <div className="chat-timestamp">
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
