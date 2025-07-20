"use client"

import { useState } from "react";
import Chatbot from "./main";
import { MessageCircle, X } from "lucide-react"; 

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] max-w-[90%] bg-white shadow-xl rounded-2xl border border-gray-300 z-50 animate-fadeIn">
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
            <span className="font-semibold text-gray-800 text-sm">
              🤖 Ask FundSpark Bot
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Close Chatbot"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-3 h-[480px] overflow-hidden">
            <Chatbot />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all"
        aria-label="Toggle Chatbot"
      >
        <MessageCircle size={22} />
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}

