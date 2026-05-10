require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Author = require("../models/Author");
const Book = require("../models/Book");
const Student = require("../models/Student");
const LibraryAttendant = require("../models/LibraryAttendant");
const { authors, students, attendants, getBooks } = require("./data");

const seed = async () => {
  await connectDB();

  console.log("Starting database seed...\n");

  await Promise.all([
    Author.deleteMany(),
    Book.deleteMany(),
    Student.deleteMany(),
    LibraryAttendant.deleteMany(),
  ]);
  console.log("✅ Cleared existing data");

  const createdAuthors = await Author.insertMany(authors);
  console.log(`✅ Seeded ${createdAuthors.length} authors`);

  const authorIds = createdAuthors.map((a) => a._id);
  const books = getBooks(authorIds);
  const createdBooks = await Book.insertMany(books);
  console.log(`✅ Seeded ${createdBooks.length} books`);

  const createdStudents = await Student.insertMany(students);
  console.log(`✅ Seeded ${createdStudents.length} students`);

  for (const attendant of attendants) {
    await LibraryAttendant.create(attendant);
  }
  console.log(`✅ Seeded ${attendants.length} library attendants`);

  console.log("\n📚 Database seeded successfully!");
  console.log("\nLogin credentials:");
  attendants.forEach((a) => {
    console.log(`  Email: ${a.email}  |  Password: ${a.password}`);
  });

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
