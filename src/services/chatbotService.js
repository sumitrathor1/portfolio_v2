// ==============================================================================
// Sumit's Portfolio Assistant - Response & Query Matching Engine
// ==============================================================================
// Pure deterministic matching engine supporting exact IDs, alias matching,
// keyword relevance scoring, and follow-up suggestion generation.
// Includes a structured backend hook for future AI / LLM integration.
// ==============================================================================

import {
  chatbotKnowledge,
  chatbotCategories,
  chatbotFallbackResponse
} from '../data/chatbotKnowledge.js';

/**
 * Normalizes a text string for fuzzy comparison.
 */
function normalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Finds an answer for a user query or predefined question ID.
 *
 * @param {string} query - The question ID or natural language user query.
 * @returns {object} { answer, suggestedFollowUps, action, matchedQuestionId }
 */
export function findAnswer(query) {
  if (!query || typeof query !== 'string') {
    return {
      answer: chatbotFallbackResponse.answer,
      suggestedFollowUps: chatbotFallbackResponse.suggestedFollowUps,
      matchedQuestionId: null
    };
  }

  const cleanQuery = query.trim();
  const normalizedQuery = normalize(cleanQuery);

  // 1. Direct ID match (for clickable suggested questions)
  const directIdMatch = chatbotKnowledge.find((item) => item.id === cleanQuery);
  if (directIdMatch) {
    return {
      answer: directIdMatch.answer,
      suggestedFollowUps: directIdMatch.suggestedFollowUps || [],
      action: directIdMatch.action || null,
      matchedQuestionId: directIdMatch.id
    };
  }

  // 2. Exact or near-exact question match
  const exactQuestionMatch = chatbotKnowledge.find(
    (item) => normalize(item.question) === normalizedQuery
  );
  if (exactQuestionMatch) {
    return {
      answer: exactQuestionMatch.answer,
      suggestedFollowUps: exactQuestionMatch.suggestedFollowUps || [],
      action: exactQuestionMatch.action || null,
      matchedQuestionId: exactQuestionMatch.id
    };
  }

  // 3. Alias exact match
  for (const item of chatbotKnowledge) {
    if (item.aliases && item.aliases.some((alias) => normalize(alias) === normalizedQuery)) {
      return {
        answer: item.answer,
        suggestedFollowUps: item.suggestedFollowUps || [],
        action: item.action || null,
        matchedQuestionId: item.id
      };
    }
  }

  // 4. Keyword Relevance Scoring
  const queryTokens = normalizedQuery.split(' ').filter((w) => w.length > 2);
  let bestScore = 0;
  let bestMatch = null;

  for (const item of chatbotKnowledge) {
    let score = 0;

    // Check query tokens against keywords
    const keywords = (item.keywords || []).map((k) => normalize(k));
    for (const token of queryTokens) {
      if (keywords.includes(token)) {
        score += 3;
      }
      if (normalize(item.question).includes(token)) {
        score += 2;
      }
    }

    // Check if query contains any of the item's aliases as substrings
    for (const alias of item.aliases || []) {
      const normAlias = normalize(alias);
      if (normalizedQuery.includes(normAlias) || normAlias.includes(normalizedQuery)) {
        score += 5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  // Minimum threshold of 3 points required for a confident match
  if (bestMatch && bestScore >= 3) {
    return {
      answer: bestMatch.answer,
      suggestedFollowUps: bestMatch.suggestedFollowUps || [],
      action: bestMatch.action || null,
      matchedQuestionId: bestMatch.id
    };
  }

  // 5. Fallback Response
  return {
    answer: chatbotFallbackResponse.answer,
    suggestedFollowUps: chatbotFallbackResponse.suggestedFollowUps,
    action: { label: 'Explore Portfolio', url: '#hero' },
    matchedQuestionId: null
  };
}

/**
 * Returns a question entry by its unique ID.
 */
export function getQuestionById(id) {
  return chatbotKnowledge.find((item) => item.id === id) || null;
}

/**
 * Returns all questions belonging to a specific category.
 */
export function getQuestionsByCategory(category) {
  return chatbotKnowledge.filter((item) => item.category === category);
}

/**
 * Returns starter questions for the initial greeting screen.
 */
export function getStarterQuestions() {
  return [
    'who-is-sumit',
    'rakshak-ai-details',
    'skills-overview',
    'hiring-availability'
  ]
    .map(getQuestionById)
    .filter(Boolean);
}

/**
 * Future AI Service Stub:
 * If an actual serverless LLM backend is configured at /api/chat,
 * queries it asynchronously with offline fallback.
 */
export async function queryChatbot(query) {
  // Check if future AI API is configured
  try {
    const aiApiUrl = '/api/chat';
    const response = await fetch(aiApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return {
          answer: data.reply,
          suggestedFollowUps: data.suggestedFollowUps || [],
          action: data.action || null,
          isAI: true
        };
      }
    }
  } catch {
    // Graceful offline fallback
  }

  // Local deterministic engine
  return findAnswer(query);
}
