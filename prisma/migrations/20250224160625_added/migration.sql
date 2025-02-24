-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerName" TEXT NOT NULL,
    "referrerEmail" TEXT NOT NULL,
    "referrerPhone" TEXT NOT NULL,
    "refereeName" TEXT NOT NULL,
    "refereeEmail" TEXT NOT NULL,
    "refereePhone" TEXT NOT NULL,
    "refereeCompany" TEXT NOT NULL,
    "refereePosition" TEXT NOT NULL,
    "relationshipToReferee" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referrerEmail_key" ON "Referral"("referrerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_refereeEmail_key" ON "Referral"("refereeEmail");
