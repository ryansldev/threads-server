/*
  Warnings:

  - A unique constraint covering the columns `[author_id]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Likes_author_id_key" ON "Likes"("author_id");
