interface ZodTextInputProps<T extends FieldValues> {
  form: {
    control: Control<T>;
  };
  className?: string;
  name: Path<T>;
  type?: "text" | "password";
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  formatAsFourDigitChunks?: boolean; // Optional prop for formatting
}

interface SmartButtonProps {
  loading?: boolean;
  type?: "button" | "submit";
  label: string;
  className?: string;
}

interface ZodSelectProps<T extends FieldValues> {
  form: {
    control: Control<T>;
  };
  className?: string;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

interface ZodDatePickerProps<T extends FieldValues> {
  form: {
    control: Control<T>;
  };
  className?: string;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  mode?: "single" | "range";
  variant?: "outline";
}

interface ZodSwitchProps<T extends FieldValues> {
  form: {
    control: Control<T>;
  };
  name: string;
  label: string;
  className?: string;
  heading: string;
  disabled?: boolean;
}
