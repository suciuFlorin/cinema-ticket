-- CreateTable
CREATE TABLE "Proprietate" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "salaCinemaId" INTEGER,

    CONSTRAINT "Proprietate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL DEFAULT 'Film',
    "dataLansare" TIMESTAMP(3) NOT NULL,
    "ora" TIMESTAMP(3) NOT NULL,
    "dataProiectare" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loc" (
    "id" SERIAL NOT NULL,
    "numar" INTEGER NOT NULL DEFAULT 0,
    "coloana" TEXT NOT NULL DEFAULT 'A',
    "latime" INTEGER NOT NULL DEFAULT 0,
    "lungime" INTEGER NOT NULL DEFAULT 0,
    "apartineSalii" INTEGER NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "z" INTEGER NOT NULL DEFAULT 0,
    "esteRezervat" BOOLEAN NOT NULL DEFAULT false,
    "esteCumparat" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rezervareId" INTEGER,

    CONSTRAINT "Loc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rezervare" (
    "id" SERIAL NOT NULL,
    "idFilm" INTEGER NOT NULL,
    "esteConfirmat" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Rezervare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bilet" (
    "id" SERIAL NOT NULL,
    "idLoc" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Bilet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaCinema" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "numarLocuri" INTEGER NOT NULL,
    "latime" INTEGER NOT NULL,
    "lungime" INTEGER NOT NULL,
    "inaltime" INTEGER NOT NULL,
    "eDisponibila" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalaCinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "Proprietate_nume_idx" ON "Proprietate"("nume");

-- CreateIndex
CREATE INDEX "Film_nume_idx" ON "Film"("nume");

-- CreateIndex
CREATE INDEX "Loc_id_idx" ON "Loc"("id");

-- CreateIndex
CREATE INDEX "Rezervare_id_idx" ON "Rezervare"("id");

-- CreateIndex
CREATE INDEX "Bilet_id_idx" ON "Bilet"("id");

-- CreateIndex
CREATE INDEX "SalaCinema_nume_idx" ON "SalaCinema"("nume");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Proprietate" ADD CONSTRAINT "Proprietate_salaCinemaId_fkey" FOREIGN KEY ("salaCinemaId") REFERENCES "SalaCinema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loc" ADD CONSTRAINT "Loc_apartineSalii_fkey" FOREIGN KEY ("apartineSalii") REFERENCES "SalaCinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loc" ADD CONSTRAINT "Loc_rezervareId_fkey" FOREIGN KEY ("rezervareId") REFERENCES "Rezervare"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezervare" ADD CONSTRAINT "Rezervare_idFilm_fkey" FOREIGN KEY ("idFilm") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezervare" ADD CONSTRAINT "Rezervare_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilet" ADD CONSTRAINT "Bilet_idLoc_fkey" FOREIGN KEY ("idLoc") REFERENCES "Loc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilet" ADD CONSTRAINT "Bilet_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
