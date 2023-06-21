export type PopupType = {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  width: string;
  handleActionClose: (closePopup: boolean) => void;
};
