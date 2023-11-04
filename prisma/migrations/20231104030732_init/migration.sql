-- CreateTable
CREATE TABLE "Galery" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Galery_pkey" PRIMARY KEY ("id")
);
