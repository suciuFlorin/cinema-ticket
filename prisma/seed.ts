import { hashSync } from "bcrypt-ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hash = hashSync("admin", 10);

  await prisma.user.createMany({
    data: [
      {
        id: "clxi1186t0000umgtr2os3jt8",
        email: "suciu.florinromulus@uoradea.ro",
        name: "Florin",
        username: "flotzone",
        role: "ADMIN",
        Password: {
          create: {
            hash,
          },
        },
      },
      {
        id: "clxi1186t0000umgtr2os3111",
        email: "suciu.florinromulus+1@uoradea.ro",
        name: "Florin",
        username: "florin",
        role: "USER",
        Password: {
          create: {
            hash,
          },
        },
      },
    ],
  });

  await prisma.movie.createMany({
    data: [
      {
        name: "Dune: Part Two",
        launchDate: new Date(2024, 1, 6),
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      },
      {
        name: "Hit Man",
        launchDate: new Date(2023, 5, 7),
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BYTJmMDM4YWItMGM2YS00MzQ0LTliM2ItZDE1NzVlMjNjNDVlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      },
      {
        name: "Bad Boys: Ride or Die",
        launchDate: new Date(2024, 5, 7),
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BY2U5YmQ3YjgtM2I2OC00YmM5LTkyM2MtN2I5Zjg2MDE0ODkwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      },
      {
        name: "Inside Out 2",
        launchDate: new Date(2024, 5, 14),
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BYTc1MDQ3NjAtOWEzMi00YzE1LWI2OWUtNjQ0OWJkMzI3MDhmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      },
      {
        name: "The Fall Guy",
        launchDate: new Date(2024, 4, 3),
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BMjA5ZjA3ZjMtMzg2ZC00ZDc4LTk3MTctYTE1ZTUzZDIzMjQyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_.jpg",
      },
      {
        name: "Furiosa: A Mad Max Saga",
        launchDate: new Date(2024, 4, 24),
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BNmYzMWVjNmQtNjJjNy00M2Y4LTkzZjQtZWQ5NmYzMjRjMDIzXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_.jpg",
      },
    ],
  });

  await prisma.specialProperty.createMany({
    data: [{ name: "2D" }, { name: "3D" }],
  });

  await prisma.cinemaRoom.createMany({
    data: [
      {
        name: "Sala 1",
        numberOfSeats: 30,
        isAvailable: true,
        width: 30,
        length: 40,
        height: 10,
      },
      {
        name: "Sala 2",
        numberOfSeats: 25,
        isAvailable: false,
        width: 20,
        length: 30,
        height: 10,
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
