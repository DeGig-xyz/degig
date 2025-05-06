"use client";

// import { useUserRole } from "@/components/user-role-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, Download, FileCodeIcon as FileContract, FileText, Plus, XCircle } from "lucide-react";

export default function ContractsPage() {
  const role = "client";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contracts</h2>
          <p className="text-muted-foreground">
            {role === "client"
              ? "Manage and create contracts"
              : role === "freelancer"
                ? "View and accept contracts"
                : "Review and manage platform contracts"}
          </p>
        </div>
        {role === "client" && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Contract
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{" Contracts"}</CardTitle>
          <CardDescription>
            {role === "client"
              ? "Contracts you've created with freelancers"
              : role === "freelancer"
                ? "Contracts offered to you by clients"
                : "All contracts on the platform"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search contracts..."
                className="w-full"
                // prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="value-high">Highest Value</SelectItem>
                  <SelectItem value="value-low">Lowest Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>{role === "client" ? "Freelancer" : role === "freelancer" ? "Client" : "Parties"}</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {role === "client" ? <ClientContractsTable /> : role === "freelancer" ? <FreelancerContractsTable /> : <SupportContractsTable />}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ClientContractsTable() {
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
    <>
      {contracts.map((contract) => (
        <TableRow key={contract.id}>
          <TableCell className="font-medium">{contract.id}</TableCell>
          <TableCell>{contract.freelancer}</TableCell>
          <TableCell>{contract.title}</TableCell>
          <TableCell>{contract.value}</TableCell>
          <TableCell>
            <div className="flex items-center">
              {contract.status === "In Progress" ? (
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
              ) : contract.status === "Completed" ? (
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              ) : contract.status === "Cancelled" ? (
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
              ) : (
                <FileText className="mr-2 h-4 w-4 text-amber-500" />
              )}
              <span
                className={`${
                  contract.status === "In Progress"
                    ? "text-blue-600"
                    : contract.status === "Completed"
                      ? "text-green-600"
                      : contract.status === "Cancelled"
                        ? "text-red-600"
                        : "text-amber-600"
                }`}
              >
                {contract.status}
              </span>
            </div>
          </TableCell>
          <TableCell>{contract.date}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <FileContract className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function FreelancerContractsTable() {
  const contracts = [
    {
      id: "CON-2023-041",
      client: "ABC Company",
      title: "E-commerce Website",
      value: "$4,500",
      status: "In Progress",
      date: "May 1, 2023",
    },
    {
      id: "CON-2023-038",
      client: "Tech Solutions",
      title: "UI/UX Design",
      value: "$2,800",
      status: "Pending",
      date: "Apr 25, 2023",
    },
    {
      id: "CON-2023-035",
      client: "Global Marketing",
      title: "SEO Optimization",
      value: "$1,800",
      status: "Completed",
      date: "Apr 18, 2023",
    },
    {
      id: "CON-2023-031",
      client: "Startup Inc",
      title: "Brand Identity",
      value: "$3,200",
      status: "Completed",
      date: "Apr 10, 2023",
    },
    {
      id: "CON-2023-027",
      client: "Local Business",
      title: "Social Media Campaign",
      value: "$1,500",
      status: "Cancelled",
      date: "Apr 2, 2023",
    },
  ];

  return (
    <>
      {contracts.map((contract) => (
        <TableRow key={contract.id}>
          <TableCell className="font-medium">{contract.id}</TableCell>
          <TableCell>{contract.client}</TableCell>
          <TableCell>{contract.title}</TableCell>
          <TableCell>{contract.value}</TableCell>
          <TableCell>
            <div className="flex items-center">
              {contract.status === "In Progress" ? (
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
              ) : contract.status === "Completed" ? (
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              ) : contract.status === "Cancelled" ? (
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
              ) : (
                <FileText className="mr-2 h-4 w-4 text-amber-500" />
              )}
              <span
                className={`${
                  contract.status === "In Progress"
                    ? "text-blue-600"
                    : contract.status === "Completed"
                      ? "text-green-600"
                      : contract.status === "Cancelled"
                        ? "text-red-600"
                        : "text-amber-600"
                }`}
              >
                {contract.status}
              </span>
            </div>
          </TableCell>
          <TableCell>{contract.date}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <FileContract className="mr-2 h-4 w-4" />
                View
              </Button>
              {contract.status === "Pending" && <Button size="sm">Accept</Button>}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function SupportContractsTable() {
  const contracts = [
    {
      id: "CON-2023-042",
      parties: "John Client & Jane Smith",
      title: "Website Redesign",
      value: "$3,500",
      status: "In Progress",
      date: "May 2, 2023",
    },
    {
      id: "CON-2023-041",
      parties: "ABC Company & Jane Freelancer",
      title: "E-commerce Website",
      value: "$4,500",
      status: "In Progress",
      date: "May 1, 2023",
    },
    {
      id: "CON-2023-039",
      parties: "John Client & Alex Johnson",
      title: "Mobile App Development",
      value: "$8,000",
      status: "Pending",
      date: "Apr 28, 2023",
    },
    {
      id: "CON-2023-038",
      parties: "Tech Solutions & Jane Freelancer",
      title: "UI/UX Design",
      value: "$2,800",
      status: "Pending",
      date: "Apr 25, 2023",
    },
    {
      id: "CON-2023-036",
      parties: "John Client & Maria Garcia",
      title: "Logo Design",
      value: "$800",
      status: "Completed",
      date: "Apr 20, 2023",
    },
  ];

  return (
    <>
      {contracts.map((contract) => (
        <TableRow key={contract.id}>
          <TableCell className="font-medium">{contract.id}</TableCell>
          <TableCell>{contract.parties}</TableCell>
          <TableCell>{contract.title}</TableCell>
          <TableCell>{contract.value}</TableCell>
          <TableCell>
            <div className="flex items-center">
              {contract.status === "In Progress" ? (
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
              ) : contract.status === "Completed" ? (
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              ) : contract.status === "Cancelled" ? (
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
              ) : (
                <FileText className="mr-2 h-4 w-4 text-amber-500" />
              )}
              <span
                className={`${
                  contract.status === "In Progress"
                    ? "text-blue-600"
                    : contract.status === "Completed"
                      ? "text-green-600"
                      : contract.status === "Cancelled"
                        ? "text-red-600"
                        : "text-amber-600"
                }`}
              >
                {contract.status}
              </span>
            </div>
          </TableCell>
          <TableCell>{contract.date}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <FileContract className="mr-2 h-4 w-4" />
                Review
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
