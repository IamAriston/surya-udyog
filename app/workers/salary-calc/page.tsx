"use client";
import { RandomAvatar } from "@/components/common/random-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { workerList } from "@/lib/actions/WorkerActions";
import { Worker } from "@/types/common";
import { IconUsers } from "@tabler/icons-react";
import { IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SalaryList = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, response } = await workerList();
        if (status && Array.isArray(response)) {
          setList(response);
        } else {
          toast.error("Failed to load workers", {
            description:
              typeof response === "string"
                ? response
                : "An unknown error occurred while fetching details.",
          });
        }
      } catch (error: any) {
        toast.error("Unexpected error occurred", {
          description: error.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Card>
                    <CardHeader className="flex flex-col gap-6">
                      <div className="flex items-start gap-2">
                        <IconUsers size={40} />
                        <div className="flex flex-col gap-1">
                          <CardTitle>Worker List</CardTitle>
                          <CardDescription>
                            View and manage worker salaries and daily wages.
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex w-full items-center gap-2">
                        <Input type="text" placeholder="Search" />
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="flex flex-col gap-4">
                      {list.map((worker) => (
                        <Button
                          key={worker.id}
                          variant="outline"
                          className="flex flex-start justify-start cursor-pointer rounded-xl"
                          size="card"
                          onClick={() => setSelectedWorker(worker)}
                        >
                          <RandomAvatar name={worker.name} />
                          {worker.name}
                        </Button>
                      ))}
                    </CardContent>
                    {/* <Separator /> */}
                  </Card>
                </div>
                {/* Salary Details (right side) - Only when worker selected */}
                {selectedWorker && (
                  <div className="col-span-2">
                    <Card>
                      <CardHeader className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                          <RandomAvatar name={selectedWorker.name} />
                          <div className="flex flex-col gap-1">
                            <CardTitle>
                              {selectedWorker.name}'s Details
                            </CardTitle>
                            <CardDescription>
                              Detailed salary and daily wage breakdown.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <Separator />
                      <CardContent className="flex flex-col items-start w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 w-full">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground">Advance:</p>
                            <p>
                              {selectedWorker.advance
                                ? formattedAmount(selectedWorker.advance)
                                : "—"}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground">
                              Last Increment:
                            </p>
                            <p>
                              {selectedWorker.last_increment_amount
                                ? formattedAmount(
                                    selectedWorker.last_increment_amount
                                  )
                                : "—"}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground">
                              Last Increment Date:
                            </p>
                            <p>
                              {selectedWorker.last_increment
                                ? formattedDate(selectedWorker.last_increment)
                                : "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex gap-2 items-center w-full">
                            <Avatar className="h-9 w-9 rounded-lg grayscale">
                              <AvatarFallback className="rounded-lg">
                                <IndianRupee size={18} />
                              </AvatarFallback>
                            </Avatar>
                            <CardTitle>Total Payable</CardTitle>
                          </div>
                          <div className="col-span-2">
                            <span className="text-2xl font-bold">
                              {formattedAmount(selectedWorker.salary)}
                            </span>
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
                              {formattedAmount(selectedWorker.salary)}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground">Advance:</p>
                            <p>
                              {selectedWorker.advance
                                ? formattedAmount(selectedWorker.advance)
                                : "—"}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground">
                              Last Increment:
                            </p>
                            <p>
                              {selectedWorker.last_increment_amount
                                ? formattedAmount(
                                    selectedWorker.last_increment_amount
                                  )
                                : "—"}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground">
                              Last Increment Date:
                            </p>
                            <p>
                              {selectedWorker.last_increment
                                ? formattedDate(selectedWorker.last_increment)
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </div>
              {/* <SalaryTable /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryList;
