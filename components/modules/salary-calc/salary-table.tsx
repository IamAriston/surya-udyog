"use client";

import { FullBodySkeleton } from "@/components/common/loading-skeleton";
import { PageHeader } from "@/components/common/page-header";
import { SmartDataTable } from "@/components/common/smart-datatable";
import { workerList } from "@/lib/actions/WorkerActions";
import { IconWallet } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ManualSalaryCalculator } from "./manual-salary";
import { SalaryColumns } from "./salary-columns";

const SalaryTable = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, response } = await workerList();
        if (status && Array.isArray(response)) {
          console.log("Worker List:", response);
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

  return (
    <>
      <PageHeader
        heading="Salary Calculator"
        description="Calculate and manage worker salaries based on attendance, daily wages and deductions. Automatically compute or enter custom values if needed."
        icon={IconWallet}
      />

      {loading ? (
        <FullBodySkeleton />
      ) : (
        <SmartDataTable
          columns={SalaryColumns}
          data={list}
          defaultHiddenColumns={["lastIncrement", "lastIncrementDate"]}
          element={<ManualSalaryCalculator />}
        />
      )}
    </>
  );
};

export default SalaryTable;
