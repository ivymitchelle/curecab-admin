import Modal from "@mui/material/Modal";

function ModalContainer({ children, open }) {
  return (
    <Modal open={open}>
      <div className="flex w-full h-screen justify-center items-center">
        {children}
      </div>
    </Modal>
  );
}

export default ModalContainer;
