import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { useChat } from '../context/ChatContext';
import { ScrollArea } from "./ui/scroll-area";


const ChatbotWidget = () => {
  const {
    isChatOpen,
    closeChat,
    openChat,
    autoQuery,
    resetAutoQuery,
    messages,
    isLoading,
    sendMessage
  } = useChat();

  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && autoQuery) {
      const queryText = `Cho tôi biết chi tiết về sản phẩm: ${autoQuery}`;
      sendMessage(queryText);
      resetAutoQuery();
    }
  }, [isChatOpen, autoQuery, sendMessage, resetAutoQuery]);

  const handleSend = () => {
    const queryText = message.trim();
    if (queryText && !isLoading) {
      sendMessage(queryText);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text) => (
    <ReactMarkdown
      components={{
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
      }}
    >{text}</ReactMarkdown>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isChatOpen ? (
        <div className="w-96 h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200 overflow-hidden transition-all duration-300">

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4 flex justify-between items-center shadow-md">
            <h3 className="font-semibold text-lg">Kizuna AI</h3>
            <button onClick={closeChat} className="hover:text-gray-200 focus:outline-none transition-colors">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Message Area */}
          <ScrollArea className="flex-1 p-4 bg-pink-50">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`inline-block p-3 rounded-xl max-w-[80%] shadow-md break-words ${msg.role === 'user'
                  ? 'bg-pink-500 text-white rounded-br-none animate-slide-in-right'
                  : 'bg-white text-gray-800 rounded-bl-none animate-slide-in-left'
                  }`}>
                  {msg.role === 'model' ? renderMarkdown(msg.parts[0].text) : msg.parts[0].text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="inline-block p-3 rounded-xl bg-white text-gray-800 shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white flex items-center space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Hỏi Kizuna..."
              className="flex-1 border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none placeholder-gray-400"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`p-3 rounded-2xl transition-all flex items-center justify-center ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}>
              <FaPaperPlane className="h-5 w-5" />
            </button>
          </div>

        </div>
      ) : (
        <button
          onClick={() => openChat()}
          className="relative group bg-transparent p-0 rounded-full shadow-xl transform hover:scale-110 flex items-center justify-center"
          aria-label="Mở trợ lý chat"
        >
          <img
            src="/get.jpg"
            alt="Kizuna AI"
            className="h-20 w-20 rounded-full object-cover"
          />
          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-pink-400 text-white text-sm font-semibold rounded-full py-1 px-3 shadow-md whitespace-nowrap pointer-events-none">
            Hỏi AI
            <span className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rotate-45"></span>
          </span>

        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
