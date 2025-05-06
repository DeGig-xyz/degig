/*
  Warnings:

  - You are about to drop the column `eligibility` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `maxEscrowAsk` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `minEscrowAsk` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `usdValue` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `poc` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Jobs_id_slug_idx";

-- DropIndex
DROP INDEX "Jobs_region_isPublished_idx";

-- DropIndex
DROP INDEX "Jobs_slug_key";

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "eligibility",
DROP COLUMN "maxEscrowAsk",
DROP COLUMN "minEscrowAsk",
DROP COLUMN "region",
DROP COLUMN "requirements",
DROP COLUMN "slug",
DROP COLUMN "usdValue",
ADD COLUMN     "poc" TEXT NOT NULL,
ADD COLUMN     "reward" INTEGER;

-- CreateIndex
CREATE INDEX "Jobs_id_idx" ON "Jobs"("id");
