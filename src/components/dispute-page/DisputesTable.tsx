import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function SupportDisputesTable() {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>TXHASH</TableHead>
            <TableHead>PartyA</TableHead>
            <TableHead>PartyB</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disputes.map((dispute) => (
            <TableRow key={dispute.id}>
              <TableCell className="font-medium">{dispute.id}</TableCell>
              <TableCell>{dispute.contract}</TableCell>
              <TableCell>{dispute.parties}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
