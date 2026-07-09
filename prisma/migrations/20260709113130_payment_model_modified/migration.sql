/*
  Warnings:

  - You are about to drop the column `method` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paidAT` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `payments` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `meta` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "method",
DROP COLUMN "paidAT",
DROP COLUMN "provider",
ADD COLUMN     "meta" JSONB NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "status" SET DEFAULT 'PENDING';
