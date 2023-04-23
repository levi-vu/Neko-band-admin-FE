import { Button, Modal as ModalAntd } from 'antd';


type ModalProps = {
    open: boolean,
    content: React.ReactNode;
    footer: React.ReactNode;
}
function Modal({open, content, footer} : ModalProps) {
  return (
    <ModalAntd
      open={open}
      title='Title'
      onCancel={handleCancel}
      footer={footer}>
     {content}
    </ModalAntd>
  );
}

export default Modal;
