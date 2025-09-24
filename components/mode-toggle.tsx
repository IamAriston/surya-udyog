"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { IconCircleHalf2 } from "@tabler/icons-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  //Toggle Theme Function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <IconCircleHalf2 className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
