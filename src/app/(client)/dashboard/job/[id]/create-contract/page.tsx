"use client";
import Loading from "@/components/common/loading";
import { useWallet } from "@/hooks/use-wallet";
import { ApiResponseInterface } from "@/interface";
import { get } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import { isNil } from "lodash";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { createContract } from "@/services/job/create-contract";
import { ContractFormValues } from "@/components/contract-builder/hooks/contract-builder";
import ContractBuilderForm from "@/components/contract-builder/Contractbuilder";

export default function Page() {
  const params = useParams<{ id: string }>();

  const { data, error, isLoading } = useSWR<ApiResponseInterface>("/job/" + params.id, get);
  const { address } = useWallet();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loading />;
  const { data: initialJob } = data || { data: null };

  if (isNil(initialJob) || initialJob.walletAddress !== initialJob?.walletAddress) {
    return <div>Job not found</div>;
  }

  async function onSubmit(values: ContractFormValues) {
    try {
      if (!address) {
        throw new Error("Wallet address is required");
      }
      const res = await createContract({
        data: values,
      });
      console.log("res", res);
    } catch (error) {
      toast.warning("Error creating job", {
        description: parseError(error),
      });
    }
  }

  return <ContractBuilderForm initialData={initialJob} onSubmit={onSubmit} />;
}
