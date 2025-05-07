"use client";

import ContractsTable from "@/components/contract-page/table-contract";
// import { useUserRole } from "@/components/user-role-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContractsPage() {
  const contracts = [
    {
      id: "CON-2023-042",
      freelancer: "Jane Smith",
      title: "Website Redesign",
      value: "$3,500",
      status: "In Progress",
      date: "May 2, 2023",
    },
    {
      id: "CON-2023-039",
      freelancer: "Alex Johnson",
      title: "Mobile App Development",
      value: "$8,000",
      status: "Pending",
      date: "Apr 28, 2023",
    },
    {
      id: "CON-2023-036",
      freelancer: "Maria Garcia",
      title: "Logo Design",
      value: "$800",
      status: "Completed",
      date: "Apr 20, 2023",
    },
    {
      id: "CON-2023-032",
      freelancer: "David Lee",
      title: "Content Writing",
      value: "$1,200",
      status: "In Progress",
      date: "Apr 15, 2023",
    },
    {
      id: "CON-2023-028",
      freelancer: "Sarah Wilson",
      title: "SEO Optimization",
      value: "$2,500",
      status: "Cancelled",
      date: "Apr 5, 2023",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contracts</h2>
          <p className="text-muted-foreground">Manage and create contracts</p>
        </div>
      </div>
      <Tabs defaultValue="inprogess">
        <TabsList>
          <TabsTrigger value="inprogess">In Progess</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="inprogess">
          <ContractsTable contracts={contracts} />
        </TabsContent>
        <TabsContent value="done">
          <ContractsTable contracts={contracts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
