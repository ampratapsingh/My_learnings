import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      firstName,
      lastName,
    },
  });
  console.log(res);
}

insertUser("amit@gmail.com", "password", "Amit", "Singh");

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  prisma.user.update({
    where: {
      email: username,
    },
    data: {
      firstName,
      lastName,
    },
  });
}

updateUser("amit@gmail.com", { firstName: "Amit", lastName: "Singh" });
