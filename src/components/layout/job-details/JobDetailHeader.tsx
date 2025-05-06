/* eslint-disable @next/next/no-img-element */
import { Clock, File, Pause } from "lucide-react";
import React from "react";

import { cn } from "@/utils/cn";
import { dayjs } from "@/utils/dayjs";
import { JobInterface } from "@/interface";
import { StatusBadge } from "./StatusBadge";
import { VerifiedBadge } from "./VerifiedBadge";

export function JobDetailHeader({ job }: { job: JobInterface }) {
  const { expriedAt, title, walletAddress, publishedAt, isPublished, isPrivate } = job;
  const hasDeadlineEnded = dayjs().isAfter(expriedAt);

  const statusIconStyles = "w-5 h-5";
  let statusText = "";
  let statusTextColor = "";
  let statusIcon: React.JSX.Element = <></>;

  if (!isPublished && !publishedAt) {
    statusIcon = <File className={cn(statusIconStyles, "text-slate-400")} />;
    statusText = "Draft";
    statusTextColor = "text-slate-500";
  } else if (!isPublished && publishedAt) {
    statusIcon = <Pause className={cn(statusIconStyles, "text-[#ffecb3]")} />;
    statusText = "Submissions Paused";
    statusTextColor = "text-[#F59E0B]";
  } else if (hasDeadlineEnded) {
    statusIcon = <Pause className={cn(statusIconStyles, "text-orange-400")} />;
    statusText = "In Review";
    statusTextColor = "text-orange-500";
  }

  const JobDetailTitle = () => {
    return <h1 className="text-xl font-bold tracking-[-0.5px] text-slate-700">{title}</h1>;
  };

  const JobDetailStatus = () => {
    return <StatusBadge Icon={statusIcon} textColor={statusTextColor} text={statusText} />;
  };

  const CommentCount = () => {
    return 0;
  };

  const PrivateLabel = () => {
    if (!isPrivate) return null;
    return (
      <>
        <span className="font-medium text-[#E2E8EF]">|</span>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-slate-500" />
          <p className="text-sm text-slate-400">Private</p>
        </div>
      </>
    );
  };

  const HeaderSub = () => {
    return (
      <div className="flex flex-wrap items-center gap-1 md:gap-3">
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium whitespace-nowrap text-slate-400 ">by {walletAddress}</p>
          <VerifiedBadge />
        </div>
        <span className="font-medium text-[#E2E8EF]">|</span>

        <div className="flex">
          <div className="flex items-center gap-1">
            {/* <LocalImage alt={type!} className="-ml-0.5" src={getJobDetailIcon(type!)} /> */}
            <p className="text-xs font-medium text-gray-400 md:text-sm">Job</p>
          </div>
        </div>

        <span className="font-medium text-[#E2E8EF]">|</span>
        <div className="flex">
          <JobDetailStatus />
        </div>
        <PrivateLabel />
        <span className="font-medium text-[#E2E8EF]">|</span>
        {/* <RegionLabel region={region} /> */}
        <CommentCount />
      </div>
    );
  };

  const SponsorLogo = () => {
    return (
      <img
        className="mr-2 h-12 w-12 rounded-md object-cover md:h-16 md:w-16"
        alt={"logo"}
        src={"https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"}
      />
    );
  };

  return (
    <div className="flex flex-col gap-1 bg-white">
      <div className="mx-auto flex w-full max-w-7xl justify-between gap-5 py-4 md:py-10">
        <div className="flex items-center">
          <SponsorLogo />
          <div className={cn("flex flex-col items-start gap-1")}>
            <div className="flex gap-1">
              <div className="hidden md:flex">
                <JobDetailTitle />
              </div>
            </div>
            <div className="hidden md:flex">
              <HeaderSub />
            </div>
          </div>
        </div>
        {job.id && (
          <div className="flex items-center gap-2">
            {/* <SubscribeJobDetail isTemplate={isTemplate} id={job.id} /> */}
            <div className="hidden md:block">{/* <ShareJobDetail source="job" job={job} /> */}</div>
          </div>
        )}
      </div>
      <div className="mb-5 flex w-full flex-col gap-1 md:hidden">
        <JobDetailTitle />
        <HeaderSub />
      </div>
      {
        <div className="flex h-10 w-full max-w-7xl items-center">
          <div className="mx-auto my-auto flex h-full w-full max-w-7xl items-center justify-start gap-10 border-b border-slate-200">
            {/* <JobDetailTabLink
              className="pointer-events-none hidden md:flex md:w-[22rem]"
              href={`/job/${slug}/`}
              text={type === "project" ? (isWinnersAnnounced ? "Proposals Selected" : "Inviting Proposals") : "Prizes"}
              isActive={false}
            />
            <JobDetailTabLink
              href={!isTemplate ? `/job/${slug}/` : `/templates/jobs/${slug}/`}
              text="Details"
              isActive={!router.asPath.split("/")[3]?.includes("submission")}
            />

            {!isProject && isWinnersAnnounced && (
              <JobDetailTabLink
                onClick={() => posthog.capture("submissions tab_job")}
                href={`/job/${slug}/submission`}
                text="Submissions"
                isActive={!!router.asPath.split("/")[3]?.includes("submission")}
                subText={isSubmissionNumberLoading ? "..." : submissionNumber + ""}
              />
            )} */}
          </div>
        </div>
      }
    </div>
  );
}
