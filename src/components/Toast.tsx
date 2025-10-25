"use client";

import { useEffect } from "react";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-100 animate-slide-in">
      <div className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-600/30 min-w-[300px] max-w-md">
        <IoCheckmarkCircle className="h-6 w-6 shrink-0" />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="shrink-0 rounded-full p-1 hover:bg-blue-600 transition-colors"
          aria-label="Close notification"
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

