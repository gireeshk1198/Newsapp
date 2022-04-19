import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      
      
      <section className="modal-main">
      <div className="modal-header">
                                        <button type="button"  onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
        {children}
        
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};
export default Modal