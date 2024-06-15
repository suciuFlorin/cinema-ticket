import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "suciu.florinromulus@uoradea.ro",
      name: "Florin",
      isAdmin: true,
    },
  });

  await prisma.film.createMany({
    data: [
      {
        nume: "Dune: Part Two",
        ora: new Date(),
        dataProiectare: new Date(),
        dataLansare: new Date(2024, 1, 6),
      },
    ],
  });

  await prisma.proprietate.createMany({
    data: [{ nume: "2D" }, { nume: "3D" }],
  });

  await prisma.salaCinema.createMany({
    data: [
      {
        nume: "Sala 1",
        numarLocuri: 30,
        eDisponibila: true,
        latime: 30,
        lungime: 40,
        inaltime: 10,
      },
      {
        nume: "Sala 2",
        numarLocuri: 25,
        eDisponibila: false,
        latime: 20,
        lungime: 30,
        inaltime: 10,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
