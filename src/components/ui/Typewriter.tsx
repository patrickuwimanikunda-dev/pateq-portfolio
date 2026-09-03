"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
}

export default function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
  className = "",
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIdx];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (text.length < currentPhrase.length) {
        setText(currentPhrase.slice(0, text.length + 1));
      } else {
        // Finished typing — pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseAfterType);
      }
    } else {
      // Deleting
      if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        // Finished deleting — move to next phrase
        setTimeout(() => {
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
          setIsDeleting(false);
        }, pauseAfterDelete);
      }
    }
  }, [text, isDeleting, currentPhrase, phrases.length, pauseAfterType, pauseAfterDelete]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
