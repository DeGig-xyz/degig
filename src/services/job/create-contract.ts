import { ContractFormValues } from "@/components/contract-builder/hooks/contract-builder";
import { post } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
export async function createContract({ data }: { data: ContractFormValues }) {
  try {
    if (isNil(data)) {
      throw new Error("Data is required");
    }
    const response = await post("/job/contract", data);
    return response.message;
  } catch (error) {
    return parseError(error);
  }
}
