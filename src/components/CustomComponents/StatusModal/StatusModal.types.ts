export type SelectionType = 'radio' | 'checkbox';

export interface CheckboxProps {
  size?: number;
  backgroundColor?: string;
  checkColor?: string;
}

export interface StatusModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (selectedStatus: any) => void; // Kept generic for flexibility
  initialStatus?: any; // Kept generic
  options?: Option[];
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  selectionType?: SelectionType;
  checkboxProps?: CheckboxProps;
}

export interface Option {
  value: any;
  label: string;
  isSelected: boolean;
}
