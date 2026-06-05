const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const accounts = [
  {
    firstName: "Mercado",
    lastName: "User",
    age: "24",
    gender: "female",
    contactNumber: "09170000001",
    email: "user@mercado.beauty",
    role: "user",
    username: "mercadouser",
    password: "User12345!",
    address: "Metro Manila",
    isActive: true,
  },
  {
    firstName: "Mercado",
    lastName: "Editor",
    age: "25",
    gender: "female",
    contactNumber: "09170000002",
    email: "editor@mercado.beauty",
    role: "editor",
    username: "mercadoeditor",
    password: "Editor12345!",
    address: "Metro Manila",
    isActive: true,
  },
  {
    firstName: "Mercado",
    lastName: "Admin",
    age: "26",
    gender: "female",
    contactNumber: "09170000003",
    email: "admin@mercado.beauty",
    role: "admin",
    username: "mercadoadmin",
    password: "Admin12345!",
    address: "Metro Manila",
    isActive: true,
  },
  {
    firstName: "Test",
    lastName: "User",
    age: "22",
    gender: "female",
    contactNumber: "09170000004",
    email: "test.user@mercado.beauty",
    role: "user",
    username: "testuser",
    password: "Test12345!",
    address: "Quezon City",
    isActive: true,
  },
  {
    firstName: "Test",
    lastName: "Editor",
    age: "23",
    gender: "female",
    contactNumber: "09170000005",
    email: "test.editor@mercado.beauty",
    role: "editor",
    username: "testeditor",
    password: "Test12345!",
    address: "Makati City",
    isActive: true,
  },
  {
    firstName: "Test",
    lastName: "Admin",
    age: "24",
    gender: "female",
    contactNumber: "09170000006",
    email: "test.admin@mercado.beauty",
    role: "admin",
    username: "testadmin",
    password: "Test12345!",
    address: "Taguig City",
    isActive: true,
  },
];

const seedDemoUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  for (const account of accounts) {
    const password = await bcrypt.hash(account.password, 10);
    const { password: plainPassword, ...safeAccount } = account;

    await User.updateOne(
      { email: account.email },
      { $set: { ...safeAccount, password } },
      { upsert: true, runValidators: true },
    );

    void plainPassword;
  }

  const rows = await User.find(
    { email: { $in: accounts.map((account) => account.email) } },
    "-password",
  )
    .sort({ role: 1 })
    .lean();

  console.table(
    rows.map((user) => ({
      email: user.email,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    })),
  );
};

seedDemoUsers()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
