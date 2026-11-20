import React, { useState } from 'react';
import { chatbotCategories, chatbotKnowledge } from '../../data/chatbotKnowledge';

export default function SuggestedQuestions({ onSelectQuestion }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredQuestions =
    activeCategory === 'all'
      ? chatbotKnowledge.slice(0, 8)
      : chatbotKnowledge.filter((q) => q.category === activeCategory);

  return (
    <div className="chat-suggestions-container">
      <div className="chat-suggestions-header">
        <span className="suggestions-title">
          <i className="fa-regular fa-lightbulb text-warning me-1" />
          Quick Questions:
        </span>
      </div>

      {/* CATEGORY FILTER PILLS (Smooth horizontal scroll) */}
      <div className="chat-category-tabs" role="tablist" aria-label="Question Categories">
        <button
          type="button"
          className={`chat-cat-tab ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          Featured
        </button>
        {chatbotCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`chat-cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* QUESTION PILLS (Mobile horizontal swipeable chips) */}
      <div className="chat-question-chips" role="list">
        {filteredQuestions.map((q) => (
          <button
            key={q.id}
            type="button"
            className="chat-question-chip hover-lift"
            onClick={() => onSelectQuestion(q.question, q.id)}
          >
            <span>{q.question}</span>
            <i className="fa-solid fa-arrow-turn-down fa-rotate-270 ms-1 chip-arrow" />
          </button>
        ))}
      </div>
    </div>
  );
}
