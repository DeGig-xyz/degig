import { ContractFormValues } from "@/components/contract-builder/hooks/contract-builder";
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
