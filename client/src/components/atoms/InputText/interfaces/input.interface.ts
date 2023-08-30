export interface InputTextProps {
    onChange: (e: any) => void;
    value: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}