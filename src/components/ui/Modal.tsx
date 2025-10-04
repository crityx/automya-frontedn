import { Fragment, ReactNode, memo, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'phosphor-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '4xl';
}

const Modal = memo(function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizeClass = useMemo(() => {
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      '4xl': 'max-w-6xl'
    };
    return sizes[size as keyof typeof sizes];
  }, [size]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full ${sizeClass} bg-white rounded-2xl p-6 shadow-xl transform transition-all`}>
                <div className="flex items-center justify-between mb-4">
                  {title && (
                    <Dialog.Title className="text-xl font-semibold text-black">
                      {title}
                    </Dialog.Title>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray/10 transition-colors"
                  >
                    <X size={20} className="text-gray" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default Modal;