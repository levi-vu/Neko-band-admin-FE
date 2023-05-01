export type PopupType = {
    isOpen: boolean;
    title: string;
    width: string;
    height: string;
    content: React.ReactElement;
    handleActionClose: (closePopup: boolean) => void;
  };
  