-- CreateEnum
CREATE TYPE "status" AS ENUM ('OPEN', 'REVIEW', 'CLOSED', 'VERIFYING', 'VERIFY_FAIL');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'SUPPORTER');

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "expriedAt" TIMESTAMP(3),
    "walletAddress" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "eligibility" JSONB,
    "minEscrowAsk" INTEGER,
    "maxEscrowAsk" INTEGER,
    "usdValue" DOUBLE PRECISION,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "applicationLink" TEXT,
    "skills" JSONB,
    "requirements" TEXT,
    "region" TEXT NOT NULL DEFAULT 'GLOBAL',

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "photo" TEXT,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "role" NOT NULL DEFAULT 'USER',
    "isTalentFilled" BOOLEAN NOT NULL DEFAULT false,
    "interests" TEXT,
    "bio" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "website" TEXT,
    "telegram" TEXT,
    "community" TEXT,
    "experience" TEXT,
    "level" TEXT,
    "location" TEXT,
    "cryptoExperience" TEXT,
    "workPrefernce" TEXT,
    "notifications" JSONB,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "skills" JSONB,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoW" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" JSONB,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subSkills" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "like" JSONB,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "ogImage" TEXT,

    CONSTRAINT "PoW_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_slug_key" ON "Jobs"("slug");

-- CreateIndex
CREATE INDEX "Jobs_id_slug_idx" ON "Jobs"("id", "slug");

-- CreateIndex
CREATE INDEX "Jobs_walletAddress_idx" ON "Jobs"("walletAddress");

-- CreateIndex
CREATE INDEX "Jobs_isPublished_isPrivate_idx" ON "Jobs"("isPublished", "isPrivate");

-- CreateIndex
CREATE INDEX "Jobs_expriedAt_updatedAt_idx" ON "Jobs"("expriedAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Jobs_title_idx" ON "Jobs"("title");

-- CreateIndex
CREATE INDEX "Jobs_expriedAt_asc_idx" ON "Jobs"("expriedAt" ASC);

-- CreateIndex
CREATE INDEX "Jobs_expriedAt_desc_idx" ON "Jobs"("expriedAt" DESC);

-- CreateIndex
CREATE INDEX "Jobs_isFeatured_idx" ON "Jobs"("isFeatured" DESC);

-- CreateIndex
CREATE INDEX "Jobs_isPublished_isActive_isArchived_idx" ON "Jobs"("isPublished", "isActive", "isArchived");

-- CreateIndex
CREATE INDEX "Jobs_isPublished_isActive_isArchived_isPrivate_idx" ON "Jobs"("isPublished", "isActive", "isArchived", "isPrivate");

-- CreateIndex
CREATE INDEX "Jobs_walletAddress_isArchived_isPublished_isActive_idx" ON "Jobs"("walletAddress", "isArchived", "isPublished", "isActive");

-- CreateIndex
CREATE INDEX "Jobs_region_isPublished_idx" ON "Jobs"("region", "isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_firstName_idx" ON "User"("firstName");

-- CreateIndex
CREATE INDEX "User_lastName_idx" ON "User"("lastName");

-- CreateIndex
CREATE INDEX "User_location_idx" ON "User"("location");

-- CreateIndex
CREATE INDEX "PoW_userId_idx" ON "PoW"("userId");

-- CreateIndex
CREATE INDEX "PoW_createdAt_idx" ON "PoW"("createdAt");

-- CreateIndex
CREATE INDEX "PoW_likeCount_idx" ON "PoW"("likeCount");

-- CreateIndex
CREATE INDEX "PoW_likeCount_createdAt_idx" ON "PoW"("likeCount" DESC, "createdAt" DESC);

-- CreateIndex
CREATE INDEX "PoW_userId_createdAt_idx" ON "PoW"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "PoW_userId_id_idx" ON "PoW"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "PoW" ADD CONSTRAINT "PoW_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
