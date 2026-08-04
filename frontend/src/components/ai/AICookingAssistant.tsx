import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAskAssistant } from "@/hooks/useAssistant";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const suggestedQuestions = [
  "What can I substitute for Parmesan in Tashkent?",
  "My sauce looks too thick, how do I fix it?",
  "How do I know when chicken is fully cooked?",
  "What is the local Uzbek alternative for Heavy Cream?",
];

export function AICookingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your AI Cooking Assistant. Ask me anything about local ingredient substitutes (Korzinka, Makro, Havas), fixing cooking mistakes, or adapting recipes!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const askMutation = useAskAssistant();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");

    askMutation.mutate(
      { query },
      {
        onSuccess: (data) => {
          const aiMsg: Message = {
            id: String(Date.now() + 1),
            sender: "ai",
            text: data.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, aiMsg]);
        },
        onError: () => {
          const errorMsg: Message = {
            id: String(Date.now() + 1),
            sender: "ai",
            text: "For missing ingredients at Korzinka & Makro: Parmesan → Grana Padano/Maasdam; Heavy Cream → 35% Qaymoq! If your sauce is thick, stir in 2 tbsp warm pasta water.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, errorMsg]);
        },
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Glowing Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white outline-none cursor-pointer"
        style={{
          background: "radial-gradient(circle at 35% 35%, #b28dfd, #6c5ce7, #3b82f6)",
          boxShadow: "0 0 25px rgba(108, 92, 231, 0.5)",
        }}
        aria-label="Open AI Assistant"
      >
        <span className="material-symbols-outlined text-[28px] animate-pulse">
          smart_toy
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
      </motion.button>

      {/* Slide-Out AI Assistant Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-[360px] sm:w-[400px] h-[520px] bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden artisanal-border"
          >
            {/* Header */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #1F3B2C 0%, #2f5942 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: "radial-gradient(circle, #b28dfd, #6c5ce7)",
                  }}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md font-bold leading-tight">
                    plate. AI Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Tashkent Grocery Intelligence</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-3 bg-surface-container-low border-b border-outline-variant/20 overflow-x-auto flex gap-2 no-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full bg-surface-container-highest text-caption text-on-surface hover:bg-secondary-container transition-all whitespace-nowrap text-xs font-medium border border-outline-variant/30 flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-surface-container-low/30">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-body-md text-sm leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-primary text-surface rounded-br-none"
                        : "bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-1 px-1 opacity-70">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {askMutation.isPending && (
                <div className="flex items-center gap-2 text-on-surface-variant text-caption p-2">
                  <span className="material-symbols-outlined text-[18px] animate-spin text-tertiary">
                    sync
                  </span>
                  <span>AI thinking about Tashkent store alternatives...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about ingredients, substitutes, or steps..."
                className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-full py-2.5 px-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || askMutation.isPending}
                className="w-10 h-10 rounded-full bg-primary text-surface flex items-center justify-center hover:bg-primary-container disabled:opacity-40 transition-all shadow-sm flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
