export type PopupType = {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    width: number;
    handleActionClose: (closePopup: boolean) => void;
  };
  