"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, Download, FileCodeIcon, FileText, XCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ContractsTable({
  contracts,
}: Readonly<{
  contracts: {
    id: string;
    freelancer: string;
    title: string;
    value: string;
    status: string;
    date: string;
  }[];
}>) {
  const role = "client";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{" Contracts"}</CardTitle>
        <CardDescription>All contracts</CardDescription>
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
                        <FileCodeIcon className="mr-2 h-4 w-4" />
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
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
