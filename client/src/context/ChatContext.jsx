import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [autoQuery, setAutoQuery] = useState(null); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      parts: [{ text: "Chào bạn! Tôi là Kizuna, trợ lý AI của HUSTique Beauty. Tôi có thể giúp gì cho bạn?" }] 
    }
  ]);

  const openChat = () => setIsChatOpen(true);

  const closeChat = () => {
    setIsChatOpen(false);
    setAutoQuery(null); 
  };

  const askAboutProduct = (productInfo) => {
    setAutoQuery(productInfo.title); 
    openChat(); 
  };
  
  const resetAutoQuery = () => setAutoQuery(null);

  const sendMessage = async (prompt) => {
    if (!prompt.trim()) return;

    setIsLoading(true);

    const userMessage = {
      role: 'user',
      parts: [{ text: prompt }]
    };

    const currentHistory = [...messages];
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chatbot`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: prompt,
          history: currentHistory 
        }),
      });

      if (!res.ok) throw new Error("Lỗi mạng hoặc server");

      const data = await res.json();
      
      const botMessage = {
        role: 'model',
        parts: [{ text: data.response }]
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Lỗi khi chat:", error);
      const errorMessage = {
        role: 'model',
        parts: [{ text: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau." }]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      isChatOpen, 
      openChat, 
      closeChat, 
      autoQuery,
      askAboutProduct,
      resetAutoQuery,
      messages,      
      isLoading,   
      sendMessage,   
    }}>
      {children}
    </ChatContext.Provider>
  );
};