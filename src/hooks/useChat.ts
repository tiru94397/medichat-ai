import { useState, useCallback } from 'react';
import { Message, Conversation } from '@/types/chat';

const generateId = () => Math.random().toString(36).substring(2, 15);

const generateTitle = (message: string) => {
  const words = message.split(' ').slice(0, 5).join(' ');
  return words.length > 30 ? words.substring(0, 30) + '...' : words;
};

// Simulated AI responses for healthcare context
const healthcareResponses = [
  "Based on the symptoms you've described, there are several possible causes. However, I want to emphasize that this information is for educational purposes only, and you should consult with a healthcare professional for proper diagnosis and treatment.",
  "That's a great question about your health. Let me provide some general information that might help, but please remember that individual medical advice should come from your doctor who knows your complete medical history.",
  "I understand your concern. Here's what the medical literature generally says about this topic. However, each person's situation is unique, so please discuss this with your healthcare provider.",
  "Thank you for asking about this health topic. While I can share general medical knowledge, please note that this doesn't replace professional medical advice. Here's what you should know...",
  "I can help explain this medical concept. It's important to note that healthcare decisions should be made in consultation with qualified medical professionals who can evaluate your specific circumstances.",
];

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      let conversationId = activeConversationId;

      // Create new conversation if none exists
      if (!conversationId) {
        conversationId = createNewConversation();
      }

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      // Add user message
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            const isFirstMessage = c.messages.length === 0;
            return {
              ...c,
              title: isFirstMessage ? generateTitle(content) : c.title,
              messages: [...c.messages, userMessage],
              updatedAt: new Date(),
            };
          }
          return c;
        })
      );

      // Simulate AI response
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: healthcareResponses[Math.floor(Math.random() * healthcareResponses.length)] +
          `\n\nRegarding your question about "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}", I'd recommend discussing this with your healthcare provider who can give you personalized advice based on your medical history and current health status.`,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              messages: [...c.messages, assistantMessage],
              updatedAt: new Date(),
            };
          }
          return c;
        })
      );

      setIsLoading(false);
    },
    [activeConversationId, createNewConversation]
  );

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  const startNewChat = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    selectConversation,
    deleteConversation,
    startNewChat,
  };
};
