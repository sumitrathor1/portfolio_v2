import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';

export default function ChatWindow({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  messages,
  isTyping,
  inputValue,
  setInputValue,
  onSendMessage,
  onSelectQuestion,
  onResetChat
}) {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages or typing state
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      onSendMessage(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`chatbot-window glass-panel ${isMinimized ? 'minimized' : ''}`}
      role="dialog"
      aria-labelledby="chatbot-title"
      aria-modal="false"
    >
      {/* CHATBOT HEADER */}
      <div className="chatbot-header">
        <div className="d-flex align-items-center gap-2">
          <div className="chat-avatar bot-header-avatar">
            <i className="fa-solid fa-robot" />
            <span className="online-indicator-dot" />
          </div>
          <div>
            <h3 id="chatbot-title" className="chatbot-header-title">
              Sumit's Portfolio Assistant
            </h3>
            <span className="chatbot-status-text">
              <span className="pulse-mini-dot" /> Verified Portfolio Intelligence
            </span>
          </div>
        </div>

        {/* HEADER CONTROLS */}
        <div className="chatbot-header-controls">
          <button
            type="button"
            className="chat-ctrl-btn"
            onClick={onResetChat}
            title="Restart conversation"
            aria-label="Restart conversation"
          >
            <i className="fa-solid fa-rotate-left" />
          </button>
          <button
            type="button"
            className="chat-ctrl-btn"
            onClick={onMinimize}
            title={isMinimized ? 'Expand window' : 'Minimize window'}
            aria-label={isMinimized ? 'Expand window' : 'Minimize window'}
          >
            <i className={isMinimized ? 'fa-solid fa-window-maximize' : 'fa-solid fa-minus'} />
          </button>
          <button
            type="button"
            className="chat-ctrl-btn chat-close-btn"
            onClick={onClose}
            title="Close chatbot"
            aria-label="Close chatbot"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>

      {/* CHATBODY (Hidden if Minimized) */}
      {!isMinimized && (
        <>
          <div className="chatbot-messages-area">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onActionClick={() => {
                  // Optional close on deep-nav on mobile
                  if (window.innerWidth < 768) {
                    onMinimize();
                  }
                }}
              />
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="chat-message-row bot-row">
                <div className="chat-avatar bot-avatar">
                  <i className="fa-solid fa-robot" />
                </div>
                <div className="chat-bubble bot-bubble typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTED QUESTIONS */}
          <SuggestedQuestions onSelectQuestion={onSelectQuestion} />

          {/* INPUT FORM BAR */}
          <form onSubmit={handleSubmit} className="chatbot-input-bar">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Rakshak AI, skills, experience..."
              className="chatbot-input"
              maxLength={200}
              aria-label="Ask a question about Sumit Rathor"
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              title="Send message"
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
