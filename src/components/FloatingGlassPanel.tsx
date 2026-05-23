import type { ReactNode } from 'react';

type FloatingGlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FloatingGlassPanel({ children, className = '' }: FloatingGlassPanelProps) {
  return <div className={`floating-glass-panel ${className}`}>{children}</div>;
}
