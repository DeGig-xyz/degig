/* eslint-disable @next/next/no-img-element */
import { TriangleAlert } from "lucide-react";
import { ExtraInfoSection } from "./ExtraInfoSection";
import { JobInterface } from "@/interface";
import { ParentSkills } from "@/interface/skills";
import { formatNumberWithSuffix } from "@/utils/formatNumberWithSuffix";
import Countdown from "react-countdown";
import { CountDownRenderer } from "./countdownRenderer";
import { ExternalImage } from "@/components/ui/cloudinary-image";

export function RightSideBar({ job, skills }: { job: JobInterface; skills?: ParentSkills[] }) {
  return (
    <div className="h-full w-full md:w-auto">
      <div className="flex w-full flex-col gap-2 pt-4">
        <div className="flex w-full flex-col justify-center rounded-xl bg-white">
          <div className="flex w-full flex-col justify-between px-1 pb-4">
            <div className="w-full">
              <table className="w-full">
                <tbody>
                  <tr className="w-full">
                    <td className="w-full p-0" colSpan={3}>
                      <div className="flex items-center gap-2">
                        <img className="h-8 w-8 rounded-full" alt="token icon" src="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png" />
                        <div className={"flex text-lg font-semibold text-slate-700 md:text-xl"} style={{ width: "7rem" }}>
                          <span className="ml-auto">
                            {"₳ "}
                            {formatNumberWithSuffix(job.reward!, 2, true)}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full border-b border-slate-100" />
          <div className="flex w-full justify-between py-0">
            <div className="flex flex-col items-start justify-center py-3">
              <div className="flex items-start justify-center gap-1">
                <ExternalImage className="mt-1 w-[1.4rem]" alt={"suit case"} src={"/icons/purple-timer.svg"} />
                <div className="flex flex-col items-start">
                  <p className="text-lg font-medium text-black md:text-xl">
                    <Countdown date={job.expriedAt ?? Date.now()} renderer={CountDownRenderer} zeroPadDays={1} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex w-full justify-center p-4">
              <button className="w-full rounded-lg bg-purple-600 py-3 text-white hover:bg-purple-700">Apply</button>
            </div>

            <div className="-mt-1 mb-4 flex w-full gap-2 bg-[#62F6FF10] p-3">
              <TriangleAlert color="#1A7F86" />
              <p className="text-xs font-medium text-[#1A7F86]" color="#1A7F86">
                Don&apos;t start working just yet! Apply first, and then begin working only once you&apos;ve been hired for the project.
              </p>
            </div>
          </div>
          <div className="w-full">
            <ExtraInfoSection skills={skills} pocSocials={job.poc} />
          </div>
        </div>
      </div>
    </div>
  );
}
