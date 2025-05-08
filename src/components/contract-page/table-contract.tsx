"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Contract } from "@/interface";
import { shortenString } from "@/utils/shorten-string";
import { formatNumberWithSuffix } from "@/utils/formatNumberWithSuffix";
import CopyButton from "../common/copy-button";
import { useWallet } from "@/hooks/use-wallet";
import ViewDetailButton from "./ViewDetailButton";

import ViewSubmissionButton from "./ViewSubmissionButton";
import ConfirmContractButton from "./action/confirm-contract";
import DisputeContractButton from "./action/dispute-contract";

export default function ContractsTable({
  contracts,
}: Readonly<{
  contracts: Contract[];
}>) {
  const { address } = useWallet();

  return (
    <Card className="h-[80vh]">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TxHash</TableHead>
              <TableHead>Party A</TableHead>
              <TableHead>Party B</TableHead>
              <TableHead>Escrow</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {shortenString(contract.txhash)} <CopyButton content={contract.txhash} />
                </TableCell>
                <TableCell>
                  {shortenString(contract.partyA)} {contract.partyA == address && "(You)"} <CopyButton content={contract.partyA} />
                </TableCell>
                <TableCell>
                  {shortenString(contract.partyB)} {contract.partyB == address && "(You)"} <CopyButton content={contract.partyB} />
                </TableCell>
                <TableCell>{formatNumberWithSuffix(contract.amount)} ₳</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {contract.inprogress != true ? (
                      <>
                        <FileText className="mr-2 h-4 w-4 text-amber-500" />
                        <span className="text-amber-600">Wait Response</span>
                      </>
                    ) : contract.indispute === true ? (
                      <>
                        <FileText className="mr-2 h-4 w-4 text-red-500" />
                        <span className="text-red-500">In Progress</span>
                      </>
                    ) : (
                      <>
                        <Clock className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="text-blue-600">In Progress</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <ViewDetailButton contract={contract} />
                  <ViewSubmissionButton contract={contract} />
                </TableCell>
                <TableCell className="text-right">
                  {contract.inprogress != true && address == contract.partyA ? (
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Cancel Contract
                      </Button>
                    </div>
                  ) : contract.inprogress != true && address == contract.partyB ? (
                    <div className="flex justify-end gap-2">
                      <ConfirmContractButton txHash={contract.txhash} />
                    </div>
                  ) : contract.inprogress == true && address == contract.partyA ? (
                    <div className="flex justify-end gap-2">
                      <DisputeContractButton contract={contract} />
                    </div>
                  ) : (
                    contract.inprogress == true &&
                    address == contract.partyB && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Submit Work
                        </Button>
                      </div>
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
