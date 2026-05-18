import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Bot, MessageCircle, Send, X } from 'lucide-react';

const quickPrompts = [
  'Trang này nói về gì?',
  'Vào phần trò chơi ở đâu?',
  'Tóm tắt nội dung giúp tôi',
];

const createReply = (text) => {
  const value = text.toLowerCase();

  if (value.includes('trò chơi') || value.includes('game')) {
    return 'Bạn có thể bấm mục Trò chơi trên thanh menu để vào phần game.';
  }

  if (value.includes('trang') || value.includes('nói về')) {
    return 'Trang này giới thiệu nội dung về TT Hồ Chí Minh và các phần lý thuyết, video, trò chơi tương tác.';
  }

  if (value.includes('tóm tắt')) {
    return 'Đây là website học tập dạng frontend, gồm các section nội dung và một số trang riêng như tổng quan, video và game.';
  }

  return 'Mình chưa có AI thật ở đây, nhưng bạn có thể hỏi về nội dung trang, phần trò chơi hoặc mục điều hướng.';
};

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Xin chào, mình có thể hỗ trợ bạn tìm nhanh nội dung trên website này.' },
  ]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canSend = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  const sendMessage = (text) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    const userMessage = { id: Date.now(), role: 'user', text: trimmed };
    const botMessage = { id: Date.now() + 1, role: 'bot', text: createReply(trimmed) };

    setMessages((current) => [...current, userMessage, botMessage]);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-soviet-red to-red-700 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em]">Chat hỗ trợ</p>
                  <p className="text-[11px] text-white/80">Trả lời nhanh nội dung website</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition hover:bg-white/15"
                aria-label="Đóng chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto bg-zinc-50 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      message.role === 'user'
                        ? 'bg-soviet-red text-white'
                        : 'bg-white text-zinc-700 border border-zinc-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-zinc-200 bg-white p-4">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-soviet-red hover:text-soviet-red"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-soviet-red"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soviet-red text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Gửi tin nhắn"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-soviet-red text-white shadow-[0_16px_35px_rgba(185,28,28,0.35)] transition-transform hover:scale-105"
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
      >
        <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
      </button>

      <button
        type="button"
        onClick={scrollToTop}
        className="group flex h-11 w-11 items-center justify-center rounded-full bg-white text-soviet-red border-2 border-soviet-red shadow-[0_10px_25px_rgba(185,28,28,0.2)] transition-transform hover:scale-105"
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default FloatingChatWidget;