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
  "What can I substitute for Parmesan?",
  "My sauce looks too thick, how to fix?",
  "How to bake a quick sponge cake?",
  "Local alternative for Heavy Cream?",
];

function generateDynamicFallback(query: string): string {
  const q = String(query || "").toLowerCase();
  
  if (q.includes("cake") || q.includes("bake") || q.includes("dessert")) {
    return "To bake a quick sponge cake: whisk 3 eggs with 100g sugar until fluffy, gently fold in 100g flour and 1 tsp baking powder. Bake at 180°C (350°F) for 20-25 minutes until golden!";
  }
  if (q.includes("sauce") || q.includes("thick") || q.includes("curdle")) {
    return "If your sauce is too thick, gradually whisk in 2 tablespoons of warm pasta water or warm milk over low heat. If it curded, whisk in 1 tbsp ice-cold cream off the heat.";
  }
  if (q.includes("chicken") || q.includes("meat") || q.includes("cook")) {
    return "Sear chicken on medium-high heat for 6-7 minutes per side. Internal temp should reach 74°C (165°F) with clear juices and no pink center.";
  }
  if (q.includes("parmesan") || q.includes("cheese")) {
    return "Great Parmesan substitutes in local markets (Korzinka, Makro) include Grana Padano, aged Maasdam, or sharp hard cheese.";
  }
  if (q.includes("cream") || q.includes("milk") || q.includes("qaymoq")) {
    return "In Uzbekistan, look for 35% fat Qaymoq on dairy shelves as a rich substitute for Western heavy cream!";
  }
  return `Great question about "${query}"! For best results, use fresh ingredients, control your pan temperature, and take advantage of local store alternatives like Qaymoq, Maasdam, and fresh herbs.`;
}

export function AICookingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your AI Cooking Assistant. Ask me anything about recipes, cooking tips, or local ingredient substitutes!",
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
            text: data.answer || generateDynamicFallback(query),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, aiMsg]);
        },
        onError: () => {
          const fallbackText = generateDynamicFallback(query);
          const errorMsg: Message = {
            id: String(Date.now() + 1),
            sender: "ai",
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, errorMsg]);
        },
      }
    );
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-6 z-50 select-none cursor-move"
    >
      {/* Floating Glowing Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-12 h-12 rounded-full flex items-center justify-center shadow-xl text-white outline-none cursor-pointer"
        style={{
          background: "radial-gradient(circle at 35% 35%, #b28dfd, #6c5ce7, #3b82f6)",
          boxShadow: "0 0 20px rgba(108, 92, 231, 0.4)",
        }}
        aria-label="Open AI Assistant"
      >
        <span className="material-symbols-outlined text-[22px] animate-pulse">
          smart_toy
        </span>
      </motion.button>

      {/* Slide-Out AI Assistant Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[310px] sm:w-[340px] h-[450px] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden artisanal-border cursor-default text-[12px]"
          >
            {/* Header */}
            <div
              className="p-3 text-white flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #1F3B2C 0%, #2f5942 100%)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: "radial-gradient(circle, #b28dfd, #6c5ce7)",
                  }}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3 className="font-label-md text-[13px] font-bold leading-tight">
                    plate. AI Assistant
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2 bg-surface-container-low border-b border-outline-variant/20 overflow-x-auto flex gap-1.5 no-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface hover:bg-secondary-container transition-all whitespace-nowrap text-[11px] font-medium border border-outline-variant/30 flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar bg-surface-container-low/30 text-[12px]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] p-2.5 rounded-xl text-[12px] leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-primary text-surface rounded-br-none"
                        : "bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-on-surface-variant mt-0.5 px-1 opacity-70">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {askMutation.isPending && (
                <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] p-1.5">
                  <span className="material-symbols-outlined text-[15px] animate-spin text-tertiary">
                    sync
                  </span>
                  <span>AI thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask recipe, ingredients, steps..."
                className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-full py-1.5 px-3 text-[12px] text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || askMutation.isPending}
                className="w-8 h-8 rounded-full bg-primary text-surface flex items-center justify-center hover:bg-primary-container disabled:opacity-40 transition-all shadow-sm flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">
                  send
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
