/*
  Warnings:

  - You are about to drop the column `description` on the `disputes` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `disputes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "disputes" DROP COLUMN "description",
DROP COLUMN "source",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "submission" TEXT;
