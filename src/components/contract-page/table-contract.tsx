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
import { isNil } from "lodash";
import { confirmContract } from "@/services/contract";
import { toast } from "sonner";
import Link from "next/link";
import { appNetwork } from "@/constants/contract";
import { parseError } from "@/utils/parse-error";

export default function ContractsTable({
  contracts,
}: Readonly<{
  contracts: Contract[];
}>) {
  const { address, browserWallet } = useWallet();
  const handleConfirmContract = async (txHashInput: string) => {
    try {
      if (isNil(address) || isNil(browserWallet)) {
        throw new Error("Wallet address is required");
      }
      const { tx, message } = await confirmContract({ txHash: txHashInput, walletAddress: address });
      if (isNil(tx)) {
        throw new Error(message);
      }
      const signedTx = await browserWallet.signTx(tx);
      const txHash = await browserWallet.submitTx(signedTx);
      toast.success("Success", {
        description: "Contract created successfully",
        action: (
          <Link
            href={`https://${appNetwork == "mainnet" ? "" : appNetwork + "."}cexplorer.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
          </Link>
        ),
      });
      // window.location.href = "/contracts/";
    } catch (error) {
      toast.warning("Error creating job", {
        description: parseError(error),
      });
    }
  };

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
                <TableCell>
                  <ViewDetailButton contract={contract} />
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
                      <Button variant="outline" size="sm" onClick={() => handleConfirmContract(contract.txhash)}>
                        <span className="sr-only">Download</span>
                        Confirml Contract
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Dispute
                      </Button>
                    </div>
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
