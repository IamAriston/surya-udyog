import { AttendanceCalendar } from "@/components/common/attendance-calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { decryptUserId } from "@/lib/actions/cryptoActions";
import { workerDetails } from "@/lib/actions/WorkerActions";
import { IndianRupee } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function WorkerPage({
  params,
}: {
  params: Promise<PageProps["params"]>;
}) {
  const { id } = await params;
  const decrypted = await decryptUserId(decodeURIComponent(id));
  if (!decrypted.status) {
    toast.error(decrypted.response);
    redirect("/workers/worker-list");
  }

  const WorkerDetails = await workerDetails(decrypted.response);

  if (!WorkerDetails.status) {
    toast.error(WorkerDetails.response);
    redirect("/workers/worker-list");
  }
  const worker = WorkerDetails.response;

  const formattedMobile = (mobile: string) => {
    return mobile?.length === 10
      ? `+91 ${mobile.slice(0, 5)} - ${mobile.slice(5)}`
      : mobile;
  };
  const formattedAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formattedDate = (date: string) => {
    const safeDate = date.length > 23 ? date.slice(0, 23) : date;
    const parsed = new Date(safeDate);
    // fallback for invalid date
    if (isNaN(parsed.getTime())) return "—";

    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(parsed);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Left Card - Worker Info */}
      <div className="col-span-3 xl:col-span-1">
        <Card className="w-full">
          <CardHeader className="flex justify-start items-center gap-2">
            <Avatar className="h-9 w-9 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">
                {worker.name[0].toUpperCase() + worker.name[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle>{worker.name}</CardTitle>
              <CardDescription>
                {formattedMobile(worker.mobile.toString())}
              </CardDescription>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Aadhaar:</p>
                <p>{worker.aadhaar}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">PAN:</p>
                <p>{worker.pan}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Email:</p>
                <p>{worker.email}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Address:</p>
                <p>{worker.address}</p>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col items-start w-full">
            <div className="flex gap-2 items-center w-full">
              <Avatar className="h-9 w-9 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg">
                  <IndianRupee size={18} />
                </AvatarFallback>
              </Avatar>
              <CardTitle>Salary</CardTitle>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 w-full">
              <div className="col-span-2">
                <span className="text-2xl font-bold">
                  {formattedAmount(worker.salary)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Advance:</p>
                <p>{worker.advance ? formattedAmount(worker.advance) : "—"}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Last Increment:</p>
                <p>
                  {worker.last_increment_amount
                    ? formattedAmount(worker.last_increment_amount)
                    : "—"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">Last Increment Date:</p>
                <p>
                  {worker.last_increment
                    ? formattedDate(worker.last_increment)
                    : "—"}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Right Section - Calendar */}
      <div className="col-span-3 xl:col-span-2">
        <AttendanceCalendar />
      </div>
    </div>
  );
}
