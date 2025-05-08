"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2, Clock, FileText, MessageSquare } from "lucide-react";

export default function DisputesPage() {

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Disputes</h2>
         
        </div>
       
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Disputes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search disputes..."
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
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute ID</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Parties</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 <SupportDisputesTable />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
function SupportDisputesTable() {
  const disputes = [
    {
      id: "DSP-2023-012",
      contract: "CON-2023-039",
      parties: "John Client & Alex Johnson",
      reason: "Delayed Delivery",
      status: "Open",
      priority: "High",
      date: "May 3, 2023",
    },
    {
      id: "DSP-2023-011",
      contract: "CON-2023-038",
      parties: "Tech Solutions & Jane Freelancer",
      reason: "Payment Delay",
      status: "Open",
      priority: "Medium",
      date: "May 2, 2023",
    },
    {
      id: "DSP-2023-009",
      contract: "CON-2023-035",
      parties: "Global Marketing & Jane Freelancer",
      reason: "Scope Changes",
      status: "In Review",
      priority: "Medium",
      date: "Apr 30, 2023",
    },
    {
      id: "DSP-2023-008",
      contract: "CON-2023-032",
      parties: "John Client & David Lee",
      reason: "Quality Issues",
      status: "In Review",
      priority: "High",
      date: "Apr 28, 2023",
    },
    {
      id: "DSP-2023-006",
      contract: "CON-2023-027",
      parties: "Local Business & Jane Freelancer",
      reason: "Contract Termination",
      status: "Resolved",
      priority: "Low",
      date: "Apr 22, 2023",
    },
  ];

  return (
    <>
      {disputes.map((dispute) => (
        <TableRow key={dispute.id}>
          <TableCell className="font-medium">{dispute.id}</TableCell>
          <TableCell>{dispute.contract}</TableCell>
          <TableCell>{dispute.parties}</TableCell>
          <TableCell>{dispute.reason}</TableCell>
          <TableCell>
            <div className="flex items-center">
              {dispute.status === "Open" ? (
                <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
              ) : dispute.status === "In Review" ? (
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              )}
              <span
                className={`${dispute.status === "Open" ? "text-red-600" : dispute.status === "In Review" ? "text-amber-600" : "text-green-600"}`}
              >
                {dispute.status}
              </span>
              {dispute.status !== "Resolved" && (
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    dispute.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : dispute.priority === "Medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {dispute.priority}
                </span>
              )}
            </div>
          </TableCell>
          <TableCell>{dispute.date}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Review
              </Button>
              <Button size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mediate
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
