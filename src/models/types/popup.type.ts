export type PopupType = {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    handleActionClose: (closePopup: boolean) => void;
  };
  