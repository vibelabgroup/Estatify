import { createContext, useContext, useState, ReactNode } from 'react';
import { BookCallModal } from '../components/BookCallModal';

interface ModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      <BookCallModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
