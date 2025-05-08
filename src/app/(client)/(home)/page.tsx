"use client";
import { ArrowRight, DollarSign, Briefcase } from "lucide-react";
import Image from "next/image";
import JobItem from "@/components/homefeed/job-item";
import { FilterNavigation } from "@/components/homefeed/filter-navigation";
import { ApiResponseInterface } from "@/interface";
import useSWR from "swr";
import Loading from "@/components/common/loading";
import { get } from "@/lib/axios";
import { Job } from "@prisma/client";
import { shortenString } from "@/utils/shorten-string";

export default function MainContent() {
  const { data, error, isLoading } = useSWR<ApiResponseInterface>("/job", get);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loading />;
  const { data: jobs } = data || { data: [] };
  return (
    <main className="min-h-screen bg-white">
      <div className=" mx-auto px-4 py-6">
        {/* Tabs */}
        <FilterNavigation />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Hero Banner */}

            {/* Freelance Gigs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">🤝 New Jobs</span>
                </div>
              </div>
              {/* Gig List */}
              <div className="space-y-4">
                {jobs.map((job: Job) => (
                  <JobItem
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    organization={shortenString(job.walletAddress)}
                    organizationLogo={`/assets/logo.png`}
                    amount={job.reward ?? 0}
                    currency="ADA"
                    currencyLogo="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
                    dueInDays={job.expriedAt ? Math.ceil((new Date(job.expriedAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0}
                    commentCount={0}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Become a Sponsor */}
            <div className="border rounded-xl p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Create your first Contract</h3>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Reach 90,000+ crypto talent from one single dashboard</p>
              <div className="flex justify-end">
                <Image src="/3d-car-dashboard-icon.png" alt="Dashboard icon" width={100} height={100} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span className="text-xl font-bold">$4,271,040</span>
                </div>
                <p className="text-sm text-gray-600">Total Value Earned</p>
              </div>
              <div className="border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <span className="text-xl font-bold">1724</span>
                </div>
                <p className="text-sm text-gray-600">Opportunities Listed</p>
              </div>
            </div>

            {/* Breakout Banner */}
            <div className="border rounded-xl overflow-hidden">
              <Image src="/colorful-hackathon.png" alt="Breakout Hackathon" width={400} height={300} className="w-full" />
            </div>

            {/* How it Works */}
            <div className="border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">HOW IT WORKS</h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Post & Escrow</h4>
                    <p className="text-sm text-gray-600">Employers post projects, matches freelancers,Smart contract locks funds (ADA).</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Track & Payment</h4>
                    <p className="text-sm text-gray-600">Milestones tracked transparently on blockchain, funds released upon completion, 3-5% fee.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Fair Dispute</h4>
                    <p className="text-sm text-gray-600">Three independent arbitrators vote to resolve disputes, 1% fee, ensuring transparency.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Earners */}
            <div className="border rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">RECENT EARNERS</h3>
                <div className="flex items-center gap-1 text-purple-600 text-sm">
                  <span>Leaderboard</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">Jacob Stanley</h4>
                    <p className="text-xs text-gray-600">Wrote A Thread about March Madness</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">$</div>
                    <span className="font-medium">200</span>
                    <span className="text-sm">ADA</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">Jong-Chan Chung</h4>
                    <p className="text-xs text-gray-600">[MG5 Apply] Solana Hackathon 2...</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">$</div>
                    <span className="font-medium">6k</span>
                    <span className="text-sm">ADA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
