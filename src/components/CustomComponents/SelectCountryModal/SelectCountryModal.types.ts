export interface Option {
    value: string;
    label: string;
    isSelected: boolean;
}

export interface SelectCountryModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (code: string, flag: string) => void;
    options?: Option[];
    title?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
}