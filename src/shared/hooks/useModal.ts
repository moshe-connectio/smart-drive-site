'use client';

import { useEffect } from 'react';

/**
 * useModal — keyboard ESC dismiss + body scroll lock for modals/lightboxes.
 *
 * Restores `document.body.style.overflow` to its previous value on unmount,
 * which keeps the page scrollable even if multiple modals open in sequence.
 *
 * @param isOpen Whether the modal is currently open.
 * @param onClose Called when the user presses Escape.
 */
export function useModal(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
