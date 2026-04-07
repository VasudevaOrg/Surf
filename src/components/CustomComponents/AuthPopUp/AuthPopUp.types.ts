export interface AuthPopupProps {
  visible: boolean;
  onClose: () => void;
  setShowAuthPopup?: React.Dispatch<React.SetStateAction<boolean>>;
}
