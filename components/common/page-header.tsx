import type { Icon } from "@tabler/icons-react";
import { Separator } from "../ui/separator";

export function PageHeader({
  heading,
  description,
  icon: Icon,
}: {
  heading: string;
  description: string;
  icon: Icon;
}) {
  return (
    <>
      <div className="flex gap-4">
        {Icon && <Icon size={60} />}
        <div className="flex flex-col gap-1">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {heading}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}
