"use client";

import { useState, useEffect } from "react";
import { site } from "@/lib/site";

/* ── Toast ──────────────────────────────────────────────────── */

function Toast({ message, type = "error", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl backdrop-blur-md ${
        isSuccess
          ? "border border-ok/30 bg-ok/10"
          : "border border-danger/30 bg-danger/10"
      }`}>
        {isSuccess ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-ok">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-danger">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )}
        <span className="text-sm font-medium text-fg">{message}</span>
      </div>
    </div>
  );
}

/* ── Email Modal ────────────────────────────────────────────── */

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EmailModal({ open, onClose }: EmailModalProps) {
  const [to, setTo] = useState<string>(site.links.email);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  if (!open) return null;

  const handleSend = () => {
    if (!to.trim()) {
      setToast({ message: "No email address found. Please enter a valid email.", type: "error" });
      return;
    }
    if (!message.trim()) {
      setToast({ message: "Please write a message before sending.", type: "error" });
      return;
    }

    const encodedTo = encodeURIComponent(to);
    const encodedSubject = encodeURIComponent(subject || "Message from portfolio");
    const encodedBody = encodeURIComponent(message);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;

    // Open Gmail compose in a new tab
    const opened = window.open(gmailUrl, "_blank");
    if (opened) {
      setToast({ message: "Email sent", type: "success" });
      setSubject("");
      setMessage("");
      onClose();
    } else {
      setToast({ message: "Email not sent. Please try again.", type: "error" });
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-lg rounded-2xl border border-edge/30 bg-surface p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-fg">Send an email</h3>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-fg hover:bg-panel/50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full rounded-lg border border-edge/30 bg-panel/50 px-4 py-2.5 text-sm text-fg placeholder:text-muted/40 focus:border-accent/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                className="w-full rounded-lg border border-edge/30 bg-panel/50 px-4 py-2.5 text-sm text-fg placeholder:text-muted/40 focus:border-accent/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={5}
                className="w-full resize-none rounded-lg border border-edge/30 bg-panel/50 px-4 py-2.5 text-sm text-fg placeholder:text-muted/40 focus:border-accent/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-fg hover:bg-panel/50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              Send email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
