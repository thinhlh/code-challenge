-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "published_date" DATE NOT NULL,
    "publisher" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "category" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
