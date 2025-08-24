import { useState, useCallback } from "react";

/**
 * Custom hook for managing contact modal state
 */
export function useContactModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStart, setFormStart] = useState<number | null>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setFormStart(Date.now());
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFormStart(null);
  }, []);

  return {
    isModalOpen,
    formStart,
    openModal,
    closeModal,
  };
}
