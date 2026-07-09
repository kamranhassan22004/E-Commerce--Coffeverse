'use client';

export default function GlareButton({ children, className = '' }) {
  return <span className={`glare-button relative inline-flex overflow-hidden rounded-full ${className}`}>{children}</span>;
}
