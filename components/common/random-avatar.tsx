import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRandomColor } from "@/hooks/use-random-color";

export function RandomAvatar({ name, src }: { name: string; src?: string }) {
  const bgColor = useRandomColor(0.2); // 80% opacity

  return (
    <Avatar className="h-10 w-10 rounded-lg">
      {src ? (
        <AvatarImage src={src} alt={name} />
      ) : (
        <AvatarFallback
          style={{
            backgroundColor: bgColor,
          }}
        >
          {name?.charAt(0).toUpperCase() + name?.charAt(1).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
