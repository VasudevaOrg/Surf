export interface SupportChoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  whatsappNumber?: string | null;
  supportEmail?: string | null;
  contactUsUrl?: string;
}
