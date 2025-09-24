import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const SmartButton: React.ComponentProps<"button"> &
  React.FC<SmartButtonProps> = ({
  loading = false,
  type = "button",
  label,
  className,
  ...props
}) => {
  return (
    <Button
      className={`cursor-pointer ${className}`}
      disabled={loading}
      type={type}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait...
        </>
      ) : (
        label
      )}
    </Button>
  );
};
