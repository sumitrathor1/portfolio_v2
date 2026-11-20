import React, { useState } from 'react';
import { features } from '../../config/features';
import { findAnswer, getQuestionById } from '../../services/chatbotService';
import ChatFloatingButton from './ChatFloatingButton';
import ChatWindow from './ChatWindow';

function getCurrentTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chatbot() {
  // If chatbot feature flag is disabled, do not render
  if (!features.chatbot) return null;

  const initialGreeting = {
    id: 'initial-greeting',
    sender: 'bot',
    text: "Hi there! 👋 I'm Sumit's Portfolio Assistant. I can tell you about his engineering background, DRDO research internship, key projects like Rakshak AI or Mandola, skills, or help you connect with him directly.\n\nClick any suggested question below or type your own question!",
    timestamp: getCurrentTimeString(),
    action: null
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([initialGreeting]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: getCurrentTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Realistic brief assistant thinking time
    setTimeout(() => {
      const response = findAnswer(text);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.answer,
        timestamp: getCurrentTimeString(),
        action: response.action || null
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 380);
  };

  const handleSelectQuestion = (questionText, questionId) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: getCurrentTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const matched = getQuestionById(questionId) || findAnswer(questionId);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: matched.answer,
        timestamp: getCurrentTimeString(),
        action: matched.action || null
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 320);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `greeting-${Date.now()}`,
        sender: 'bot',
        text: "Conversation refreshed! How can I assist you in exploring Sumit's portfolio today?",
        timestamp: getCurrentTimeString(),
        action: null
      }
    ]);
    setIsTyping(false);
    setInputValue('');
  };

  return (
    <>
      <ChatFloatingButton
        onClick={toggleOpen}
        isOpen={isOpen && !isMinimized}
        unreadCount={0}
      />

      <ChatWindow
        isOpen={isOpen}
        isMinimized={isMinimized}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsMinimized((prev) => !prev)}
        messages={messages}
        isTyping={isTyping}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onSelectQuestion={handleSelectQuestion}
        onResetChat={handleResetChat}
      />
    </>
  );
}
