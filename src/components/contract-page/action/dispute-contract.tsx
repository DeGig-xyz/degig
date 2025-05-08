"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { isNil } from "lodash";
import { toast } from "sonner";
import Link from "next/link";
import { appNetwork } from "@/constants/contract";
import { parseError } from "@/utils/parse-error";
import { useWallet } from "@/hooks/use-wallet";
import { createDisputeDB, createDisputeTx } from "@/services/dispute/create";
import { Contract } from "@/interface";
export default function DisputeContractButton({ contract }: { contract: Contract }) {
  const { address, browserWallet } = useWallet();
  const handleDisputeContract = async (contract: Contract) => {
    try {
      if (isNil(address) || isNil(browserWallet)) {
        throw new Error("Wallet address is required");
      }
      const { tx, message } = await createDisputeTx({ txHash: contract.txhash, walletAddress: address });
      if (isNil(tx)) {
        throw new Error(message);
      }
      const signedTx = await browserWallet.signTx(tx);
      const txHash = await browserWallet.submitTx(signedTx);

      if (isNil(txHash)) {
        throw new Error("Error when submitting transaction");
      }

      const { result, message: msg, dísputeId } = await createDisputeDB({ contract, walletAddress: address });

      if (!result) {
        throw new Error(msg);
      }

      toast.success(msg, {
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
      window.location.href = "/dashboard/dispute/" + dísputeId;
    } catch (error) {
      toast.warning("Error creating job", {
        description: parseError(error),
      });
    }
  };
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => handleDisputeContract(contract)}>
        Dispute
      </Button>
    </>
  );
}
