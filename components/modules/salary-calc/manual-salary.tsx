"use client";
import { SmartButton } from "@/components/common/smart-button";
import { ZodTextInput } from "@/components/common/zod-inputs";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";
import { addWorker } from "@/lib/actions/WorkerActions";
import { addWorkerDefaultValues } from "@/types/defaultValues";
import { addWorkerFormSchema } from "@/types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function ManualSalaryCalculator() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  // Zod-Form
  const form = useForm<z.infer<typeof addWorkerFormSchema>>({
    resolver: zodResolver(addWorkerFormSchema),
    defaultValues: addWorkerDefaultValues,
  });
  // Reset form when drawer opens
  useEffect(() => {
    if (open) {
      form.reset(addWorkerDefaultValues);
    }
  }, [open]);

  //   // Calculate salaryPerDay & salaryPerHour based on salary
  //   const salary = form.watch("salary");
  //   useEffect(() => {
  //     if (salary) {
  //       const day = (parseFloat(salary) / 30).toFixed(2);
  //       const hour = (parseFloat(salary) / (30 * 8)).toFixed(2);
  //       // Update the values for salaryPerDay & salaryPerHour
  //       form.setValue("salaryPerDay", day.toString());
  //       form.setValue("salaryPerHour", hour.toString());
  //     }
  //   }, [salary, form]);

  // Handle Submit
  async function onSubmit(values: z.infer<typeof addWorkerFormSchema>) {
    // ✅ This will be type-safe and validated.
    console.log("Form Values:", values);
    // try {
    //   setLoading(true);
    //   const res = await addWorker(values);
    //   if (!res.status) {
    //     // Error toast
    //     toast.error("Couldn’t add worker", {
    //       description: "Please check the details and try again.",
    //     });
    //     return;
    //   }
    //   // Success toast
    //   toast.success("Worker Details Added Successfully", {
    //     description: res.response,
    //   });
    //   form.reset(addWorkerDefaultValues);
    //   setOpen(false);
    // } catch (error) {
    //   toast.error("Something went wrong", {
    //     description: "An unexpected error occurred. Please try again.",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button className="w-fit px-0 text-left">
          <Calculator />
          Calculate
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DrawerHeader className="gap-1">
              <DrawerTitle>Calculate Salary</DrawerTitle>
              <DrawerDescription>
                Enter complete and accurate details to generate worker's salary.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm h-[calc(100vh-240px)]">
              <ZodTextInput
                form={form}
                name="name"
                label="Worker Name"
                placeholder="Name"
                required
              />
              <ZodTextInput
                form={form}
                name="mobile"
                label="Worker Mobile Number"
                placeholder="Mobile Number"
                required
              />
              <ZodTextInput
                form={form}
                name="aadhaar"
                label="Worker Aadhaar"
                placeholder="XXXX XXXX XXXX"
                formatAsFourDigitChunks // Format as 4-digit chunks
              />
              <ZodTextInput
                form={form}
                name="pan"
                label="Worker PAN"
                placeholder="ABCDE1234F"
              />
              <ZodTextInput
                form={form}
                name="email"
                label="Worker Email"
                placeholder="m@example.com"
              />
              <ZodTextInput
                form={form}
                name="address"
                label="Worker Address"
                placeholder="Address"
              />
              <ZodTextInput
                form={form}
                name="salary"
                label="Worker Salary"
                placeholder="Salary"
                required
              />
              <ZodTextInput
                form={form}
                name="salaryPerHour"
                label="Worker Salary/Hour"
                placeholder="Calculated Automatically"
                disabled
              />
              <ZodTextInput
                form={form}
                name="salaryPerDay"
                label="Worker Salary/Day"
                placeholder="Calculated Automatically"
                disabled
              />
            </div>
            <DrawerFooter>
              <SmartButton label="Submit" loading={loading} type="submit" />
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
