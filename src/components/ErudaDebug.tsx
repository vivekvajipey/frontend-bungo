'use client';

import { useEffect } from 'react';

export function ErudaDebug() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('eruda').then(({ default: eruda }) => {
        if (!eruda.get()) {
          eruda.init();
        }
      });
    }
  }, []);

  return null;
} 