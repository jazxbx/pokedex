import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

// open: boolean prop to render the component if true
// setOpen: function prop to change open state to true or false
// children: component to be rendered inside the modal

function Modal({ open, setOpen, children }: ModalProps) {
  return (
    open &&
    createPortal(
      <div
        className='top-0 w-full h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center cursor-pointer fixed'
        onClick={() => setOpen(false)}
      >
        <div className='h-full flex items-center justify-center'>
          <div
            className='bg-white flex items-center justify-center p-8 rounded-xl'
            onClick={(e) => e.stopPropagation()}
            role='dialog'
          >
            {children}
          </div>
        </div>
      </div>,
      document.body
    )
  );
}

export default Modal;
