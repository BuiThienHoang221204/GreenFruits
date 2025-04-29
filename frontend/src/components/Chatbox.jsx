import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react'; 
import { useAppContext } from '../context/AppContext';

function Chatbox() {
    const {axios} = useAppContext()
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    setChatLog([{ user: 'GreenFruits', text: 'Xin chào tôi có thể giúp gì cho bạn ?' }]);
  }, []);  

  const handleSend = async () => {
    if (!question.trim()) return;
    const newChat = { user: 'Khách', text: question };
    setChatLog(prev => [...prev, newChat]);
    setQuestion('');

    try {
      const res = await axios.post('/api/ask/user', { question });
      setChatLog(prev => [...prev, { user: 'GreenFruits', text: res.data.answer }]);
    } catch (err) {
      setChatLog(prev => [...prev, { user: 'GreenFruits', text: 'Xin lỗi, tôi gặp lỗi khi trả lời.' }]);
    }
  };

  return (
    <>
      {/* Icon chat nổi */}
      <button
        className="fixed bottom-6 right-6 bg-primary hover:bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setOpen(!open)}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbox chính */}
      {open && (
        <div className="fixed bottom-22 right-6 w-[320px] h-[400px] bg-white border border-gray-400 shadow-2xl rounded-lg flex flex-col z-50">
          <div className="p-3 font-bold bg-primary text-white rounded-t-lg">GreenFruits 🍏</div>
          <div className="p-3 flex-1 overflow-y-auto max-h-[300px] space-y-2 text-sm">
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${msg.user === 'Khách' ? 'bg-gray-100 text-right' : 'bg-green-100 text-left'}`}
              >
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-400">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Bạn muốn hỏi gì?"
              className="flex-1 p-4 text-sm border-none outline-none"
            />
            <button onClick={handleSend} className="p-4 bg-primary text-white hover:bg-green-600 text-sm">Gửi</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbox;
