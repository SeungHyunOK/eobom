import close from "../../../assets/icons/close.svg";
import * as ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-[#717171] opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative h-[41.94rem] bg-white w-full px-[1.56rem] pt-[2.68rem] pb-[1.56rem] rounded-t-[1.87rem]">
        <button
          className="absolute top-[1.18rem] right-[1.18rem] w-[0.75rem] h-[0.75rem]"
          onClick={onClose}
        >
          <img src={close} alt="close" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
