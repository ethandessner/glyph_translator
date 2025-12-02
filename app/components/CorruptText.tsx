"use client";
import React, { useMemo } from "react";

type AllowedTags = "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
interface CorruptTextProps {
  children: React.ReactNode;
  intensity?: "low" | "high";
  as?: AllowedTags;
  className?: string;
}

// Renders children with layered glitch / corruption effect.
export const CorruptText: React.FC<CorruptTextProps> = ({ children, intensity = "low", as = "span", className }) => {
  const text = useMemo(() => (typeof children === "string" ? children : undefined), [children]);
  const chars = useMemo(() => (text ? Array.from(text) : []), [text]);
  const Tag: AllowedTags = as;
  return (
    <Tag className={`corrupt ${className || ""}`.trim()} data-intensity={intensity} aria-label={text || undefined}>
      <span>{children}</span>
      {text && (
        <>
          <span className="corrupt-layer red" aria-hidden="true">{text}</span>
          <span className="corrupt-layer green" aria-hidden="true">{text}</span>
          <span className="corrupt-layer blue" aria-hidden="true">{text}</span>
          <span className="sr-only" aria-hidden="true">
            {chars.map((c,i) => <span key={i} className="char">{c}</span>)}
          </span>
        </>
      )}
    </Tag>
  );
};