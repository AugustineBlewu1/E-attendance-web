import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
  } from "@chakra-ui/react";

  
  interface IModal {
    isOpen: boolean;
    headerText: string;
    footerText: string;
    children: any;
    loading: boolean;
    onSubmit : any;
    onClose: () => void;
    showFooter?: boolean
  }
  
  const CustomModal: React.FC<IModal> = ({
    isOpen,
    footerText,
    headerText,
    loading,
    children,
    onClose,
    onSubmit,
    showFooter = true
  }) => {
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{headerText}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>{children}</ModalBody>
  
            <ModalFooter>
            { showFooter &&  <Button  onClick={onSubmit} className="px-5" type="submit">{ loading ? 'Saving'  : footerText}</Button>}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CustomModal;
  