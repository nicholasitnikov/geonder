-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "thumbnail" TEXT,
    "parent_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Object" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "nomenclature" TEXT,
    "number" INTEGER,
    "subject" TEXT,
    "district" TEXT,
    "type" TEXT,
    "comment" TEXT,
    "e" TEXT,
    "n" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocean" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "min_x" DECIMAL(65,30),
    "max_x" DECIMAL(65,30),
    "min_y" DECIMAL(65,30),
    "max_y" DECIMAL(65,30),
    "uniqueId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sea" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "min_x" DECIMAL(65,30),
    "max_x" DECIMAL(65,30),
    "min_y" DECIMAL(65,30),
    "max_y" DECIMAL(65,30),
    "uniqueId" TEXT,
    "oceanName" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "name_eng" TEXT,
    "min_x" DECIMAL(65,30),
    "max_x" DECIMAL(65,30),
    "min_y" DECIMAL(65,30),
    "max_y" DECIMAL(65,30),
    "uniqueId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "name_eng" TEXT,
    "type" TEXT,
    "min_x" DECIMAL(65,30),
    "max_x" DECIMAL(65,30),
    "min_y" DECIMAL(65,30),
    "max_y" DECIMAL(65,30),
    "uniqueId" TEXT,
    "stateId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settlement" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "status" TEXT,
    "population" INTEGER,
    "population_range" TEXT,
    "uniqueId" TEXT,
    "lat" INTEGER NOT NULL,
    "lng" INTEGER NOT NULL,
    "provinceId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ocean.name_unique" ON "Ocean"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ocean.uniqueId_unique" ON "Ocean"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Sea.uniqueId_unique" ON "Sea"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "State.uniqueId_unique" ON "State"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Province.uniqueId_unique" ON "Province"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Settlement.uniqueId_unique" ON "Settlement"("uniqueId");

-- AddForeignKey
ALTER TABLE "Sea" ADD FOREIGN KEY ("oceanName") REFERENCES "Ocean"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Province" ADD FOREIGN KEY ("stateId") REFERENCES "State"("uniqueId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD FOREIGN KEY ("provinceId") REFERENCES "Province"("uniqueId") ON DELETE SET NULL ON UPDATE CASCADE;
