import { X } from 'lucide-react'; // Shadcn UI icons
import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog'; // Using Radix for accessibility and transitions

function Modal({ isOpen, onClose, title, children }) {
  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[500px] overflow-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 ">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            {children}
          </div>

          {/* Modal Footer (Optional) */}
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
    
  );
}

export default Modal;
