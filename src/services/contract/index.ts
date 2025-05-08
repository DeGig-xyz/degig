import { ContractFormValues } from "@/components/contract-builder/hooks/contract-builder";
import { Contract } from "@/interface";
import { post } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";

export async function createContract({ jobId, data }: { jobId: string; data: ContractFormValues }) {
  try {
    if (isNil(jobId)) {
      throw new Error("Job ID is required");
    }
    if (isNil(data)) {
      throw new Error("Contract data is required");
    }
    const response = await post("/contract/create", {
      jobId,
      ...data,
    });
    return {
      tx: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      message: parseError(error),
      tx: null,
    };
  }
}

export async function confirmContract({ txHash, walletAddress }: { txHash: string; walletAddress: string }) {
  try {
    if (isNil(txHash)) {
      throw new Error("txhash is required");
    }
    if (isNil(walletAddress)) {
      throw new Error("walletAddress data is required");
    }

    const response = await post("/contract/confirm", { txHash, walletAddress });
    return {
      tx: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      message: parseError(error),
      tx: null,
    };
  }
}

export async function disputeContract({ contract, walletAddress }: { contract: Contract; walletAddress: string }) {
  try {
    if (isNil(contract)) {
      throw new Error("contract is required");
    }
    if (isNil(walletAddress)) {
      throw new Error("walletAddress data is required");
    }

    const response = await post("/contract/dispute", { contract, walletAddress });
    return {
      tx: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      message: parseError(error),
      tx: null,
    };
  }
}
