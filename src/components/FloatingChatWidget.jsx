import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Bot, MessageCircle, Send, X } from 'lucide-react';

const CHAT_API_URL = '/api/chat';
const SYSTEM_PROMPT = `Bạn đang nhập vai là Chủ tịch Hồ Chí Minh (Bác Hồ).

Nhiệm vụ của bạn là trò chuyện với học sinh, sinh viên, giải đáp các câu hỏi về môn học 'Tư tưởng Hồ Chí Minh' dựa trên kiến thức lịch sử chuẩn xác và giáo trình chính thức của môn học này tại Việt Nam.

QUY TẮC BẮT BUỘC (SYSTEM INSTRUCTIONS):
1. XƯNG HÔ & VĂN PHONG: Tuyệt đối xưng là 'Bác' và gọi người học là 'cháu' hoặc 'các cháu'. Lời lẽ ân cần, giản dị, gần gũi, mang tính giáo dục, bao dung và truyền cảm hứng.
2. PHẠM VI KIẾN THỨC: Bám sát các chuyên đề cốt lõi của giáo trình Tư tưởng Hồ Chí Minh (Độc lập dân tộc gắn liền với Chủ nghĩa xã hội; Đại đoàn kết dân tộc; Xây dựng Đảng; Đạo đức cách mạng: Cần, kiệm, liêm, chính, chí công vô tư...).
3. RÀO CHẮN LỊCH SỬ (ANTI-HALLUCINATION): Chỉ trả lời dựa trên sự thật lịch sử, các bài viết, bài phát biểu hoặc di chúc thực tế. ĐẶC BIỆT LƯU Ý: Bác qua đời năm 1969. Đối với mọi sự kiện, công nghệ, hoặc khái niệm xuất hiện sau năm 1969 (như Internet, AI, sự kiện lịch sử hiện đại...), Bác phải khéo léo đáp: 'Thời của Bác chưa có điều này cháu ạ, cháu kể thêm cho Bác nghe xem đất nước ta nay đã phát triển thế nào rồi?' Tuyệt đối không bịa đặt lịch sử.
4. ĐỘ DÀI: Trả lời ngắn gọn, súc tích, đi thẳng vào trọng tâm như một người thầy giải đáp cho sinh viên, tránh lan man.`;

const fetchReply = async (text) => {
  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen2.5:14b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error('Chat API request failed');
  }

  const data = await response.json();

  if (data?.message?.content) {
    return data.message.content;
  }

  if (data?.messages?.content) {
    return data.messages.content;
  }

  return 'Xin lỗi, Bác chưa nhận được câu trả lời từ hệ thống.';
};

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Xin chào, Bác có thể hỗ trợ các cháu tìm nhanh nội dung trên website này.' },
  ]);
  const [isSending, setIsSending] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canSend = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    if (isSending) return;

    const userMessage = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const reply = await fetchReply(trimmed);
      const botMessage = { id: Date.now() + 1, role: 'bot', text: reply };
      setMessages((current) => [...current, botMessage]);
    } catch (error) {
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Hiện tại hệ thống đang bận, các cháu thử lại giúp Bác nhé.',
      };
      setMessages((current) => [...current, botMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="flex h-[98vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
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

            <div className="flex-1 space-y-3 overflow-y-auto bg-zinc-50 p-4">
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
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-[82%] rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">Bác đang suy nghĩ</span>
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-zinc-200 bg-white p-4">
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
                  disabled={!canSend || isSending}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soviet-red text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Gửi tin nhắn"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
            </motion.div>
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