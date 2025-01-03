/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - The `type` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'BALANCE_TRANSFER', 'GOAL_ALLOCATION', 'GOAL_DISALLOCATION');

-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
ADD COLUMN     "balanceToId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'INCOME';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- RenameForeignKey
ALTER TABLE "Transaction" RENAME CONSTRAINT "Transaction_balanceId_fkey" TO "Transaction_FromBalance_FK";
