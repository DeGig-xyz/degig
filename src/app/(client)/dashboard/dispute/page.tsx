"use client";

import { SupportDisputesTable } from "@/components/dispute-page/DisputesTable";
import { Card, CardContent } from "@/components/ui/card";

export default function DisputesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Disputes</h2>
        </div>
      </div>

      <Card>
        <CardContent>
          <SupportDisputesTable />
        </CardContent>
      </Card>
    </div>
  );
}
