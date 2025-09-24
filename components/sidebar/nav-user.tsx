import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/lib/actions/authActions";
import { IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogoutAlertDialog } from "../auth/logout-alert";

export function NavUser({
  user,
}: {
  user: {
    avatar: string;
    name: string;
    email: string;
  };
}) {
  const { isMobile } = useSidebar();

  const router = useRouter();
  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await logout();
      // Check response
      if (!res.status) {
        // Error toast
        toast.error("Login failed", {
          description: res.response,
        });
        return;
      }
      // Success toast
      toast.success("Session ended!", {
        description: res.response,
      });
      router.push("/login");
    } catch {
      toast.error("Unexpected error occurred", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      return;
    }
  };
  // // Fetch user details
  // const userDetails = fetchUserDetails();
  // console.log("User Details:", userDetails);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Custom Dropdown Item to trigger -> Logout Alert Dialog */}
            <LogoutAlertDialog onConfirm={handleLogout} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
