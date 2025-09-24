"use client";

import { FullBodySkeleton } from "@/components/common/loading-skeleton";
import { PageHeader } from "@/components/common/page-header";
import { SmartDataTable } from "@/components/common/smart-datatable";
import { workerList } from "@/lib/actions/WorkerActions";
import { IconUsers } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddWorkerForm } from "./add-worker-form";
import { WorkerColumns } from "./worker-columns";

const WorkerTable = () => {
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
        heading="Worker List"
        description="View and manage worker details including mobile number, salary, and daily wages."
        icon={IconUsers}
      />

      {loading ? (
        <FullBodySkeleton />
      ) : (
        <SmartDataTable
          columns={WorkerColumns}
          data={list}
          defaultHiddenColumns={["salaryPerDay", "lastIncrement"]}
          element={<AddWorkerForm />}
        />
      )}
    </>
  );
};

export default WorkerTable;
