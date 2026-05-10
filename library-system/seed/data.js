const authors = [
  { name: "Chinua Achebe", bio: "Nigerian novelist, poet, and critic. Author of Things Fall Apart." },
  { name: "Wole Soyinka", bio: "Nobel Prize-winning Nigerian playwright and poet." },
  { name: "Chimamanda Ngozi Adichie", bio: "Nigerian author known for Purple Hibiscus and Half of a Yellow Sun." },
  { name: "Ngugi wa Thiong'o", bio: "Kenyan author and academic, known for Weep Not, Child." },
  { name: "Ben Okri", bio: "Nigerian poet and novelist, winner of the Booker Prize for The Famished Road." },
];

const students = [
  { name: "Amaka Obi", email: "amaka.obi@school.edu.ng", studentId: "STU-2024-001" },
  { name: "Chukwuemeka Nwosu", email: "emeka.nwosu@school.edu.ng", studentId: "STU-2024-002" },
  { name: "Fatima Al-Hassan", email: "fatima.hassan@school.edu.ng", studentId: "STU-2024-003" },
  { name: "Tunde Badmus", email: "tunde.badmus@school.edu.ng", studentId: "STU-2024-004" },
  { name: "Ngozi Eze", email: "ngozi.eze@school.edu.ng", studentId: "STU-2024-005" },
];

const attendants = [
  {
    name: "Mrs. Blessing Okeke",
    staffId: "STAFF-001",
    email: "blessing.okeke@library.edu.ng",
    password: "password123",
  },
  {
    name: "Mr. Samuel Adeyemi",
    staffId: "STAFF-002",
    email: "samuel.adeyemi@library.edu.ng",
    password: "password123",
  },
];


const getBooks = (authorIds) => [
  {
    title: "Things Fall Apart",
    isbn: "978-0385474542",
    authors: [authorIds[0]],
  },
  {
    title: "Arrow of God",
    isbn: "978-0385014809",
    authors: [authorIds[0]],
  },
  {
    title: "Purple Hibiscus",
    isbn: "978-1616202415",
    authors: [authorIds[2]],
  },
  {
    title: "Half of a Yellow Sun",
    isbn: "978-1400044160",
    authors: [authorIds[2]],
  },
  {
    title: "The Famished Road",
    isbn: "978-0385425134",
    authors: [authorIds[4]],
  },
  {
    title: "Weep Not, Child",
    isbn: "978-0143106692",
    authors: [authorIds[3]],
  },
  {
    title: "Death and the King's Horseman",
    isbn: "978-0393976366",
    authors: [authorIds[1]],
  },
];

module.exports = { authors, students, attendants, getBooks };
