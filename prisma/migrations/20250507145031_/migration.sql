-- CreateTable
CREATE TABLE "Contracts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "party_a" TEXT NOT NULL,
    "party_b" TEXT NOT NULL,
    "source" JSONB,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "inDispute" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contracts_id_idx" ON "Contracts"("id");

-- CreateIndex
CREATE INDEX "Contracts_party_a_party_b_idx" ON "Contracts"("party_a", "party_b");

-- CreateIndex
CREATE INDEX "Contracts_createdAt_updatedAt_idx" ON "Contracts"("createdAt", "updatedAt");
