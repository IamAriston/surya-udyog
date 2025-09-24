"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ZodTextInput<T extends FieldValues>({
  form,
  className,
  type = "text",
  name,
  label,
  placeholder = "",
  required = false,
  disabled = false,
  formatAsFourDigitChunks = false,
}: ZodTextInputProps<T>) {
  const { field } = useController({
    name,
    control: form.control, // Use the control from the parent form
    rules: { required: `${label} is required` }, // Example validation rule
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel htmlFor={name} className="text-right">
            {label}
            {required && <span className="text-destructive">*</span>}
            {/* {type == "password" && (
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              )} */}
          </FormLabel>
          <FormControl>
            <Input
              id={name}
              type={type}
              className="col-span-4"
              placeholder={placeholder}
              disabled={disabled}
              {...field} // Spread the field properties (value, onChange, onBlur)
              onChange={(e) => {
                if (formatAsFourDigitChunks) {
                  const value = e.target.value.replace(/\s/g, "");
                  const formatted = value.replace(/(.{4})/g, "$1 ").trim();
                  field.onChange(formatted);
                } else {
                  field.onChange(e); // Default
                }
              }}
            />
          </FormControl>
          {/* Display error message if validation fails */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ZodSelect<T extends FieldValues>({
  form,
  className,
  name,
  label,
  placeholder = "",
  options,
  disabled = false,
}: ZodSelectProps<T>) {
  const { field } = useController({
    name,
    control: form.control, // Control from the parent form
    rules: { required: `${label} is required` }, // Validation rule
  });

  // Access the form state to check for errors
  const { formState } = useFormContext();
  const hasError = formState.errors[name]; // Check if there's an error for this field

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel htmlFor={name} className="text-right">
            {label}
          </FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl className="w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {hasError && <FormMessage />} {/* Display error message if present */}
        </FormItem>
      )}
    />
  );
}

export function ZodSwitch<T extends FieldValues>({
  form,
  name,
  label,
  className,
  heading,
  disabled = false,
}: ZodSwitchProps<T>) {
  const { field } = useController({
    name,
    control: form.control,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <div className="flex flex-col space-y-2">
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <div className="flex items-center text-center gap-2">
                <Label className="font-bold" htmlFor={name}>
                  {heading}
                </Label>
                <Switch
                  id={name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// export function ZodDatePicker<T extends FieldValues>({
//   form,
//   className,
//   name,
//   label,
//   placeholder = "Pick a date",
//   disabled = false,
//   mode = "single",
//   variant = "outline",
// }: ZodDatePickerProps<T>) {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className={`flex flex-col ` + className}>
//           <FormLabel>{label}</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant={variant}
//                   disabled={disabled}
//                   className={cn(
//                     "w-full pl-3 text-left font-normal",
//                     !field.value && "text-muted-foreground"
//                   )}
//                   onClick={() => console.log(field.value)}
//                 >
//                   {field.value ? (
//                     format(field.value, "PPP")
//                   ) : (
//                     <span>{placeholder}</span>
//                   )}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode={mode}
//                 selected={field.value}
//                 onSelect={field.onChange}
//                 disabled={(date) => date < new Date()}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
