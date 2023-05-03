export type PopupType = {
    isOpen: boolean;
    title: string;
    content: React.ReactElement;
    handleActionClose: (closePopup: boolean) => void;
  };
  