import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 220000,
    rating: 4.8,
    placementAvg: 2200000,
    placementHigh: 20000000,
    overview:
      "IIT Delhi is one of India's top engineering institutions known for research, placements and innovation.",
    imageUrl: "",
    courses: ["B.Tech Computer Science", "B.Tech Electrical", "M.Tech AI"],
  },
  {
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 230000,
    rating: 4.9,
    placementAvg: 2400000,
    placementHigh: 21000000,
    overview:
      "IIT Bombay is a premier technology institute with strong industry connections and excellent placements.",
    imageUrl: "",
    courses: ["B.Tech Computer Science", "B.Tech Mechanical", "M.Tech Data Science"],
  },
  {
    name: "Delhi Technological University",
    city: "New Delhi",
    state: "Delhi",
    fees: 190000,
    rating: 4.4,
    placementAvg: 1500000,
    placementHigh: 8200000,
    overview:
      "DTU is a reputed state university known for engineering education, placements and student culture.",
    imageUrl: "",
    courses: ["B.Tech IT", "B.Tech Software Engineering", "MBA"],
  },
  {
    name: "Vellore Institute of Technology",
    city: "Vellore",
    state: "Tamil Nadu",
    fees: 198000,
    rating: 4.2,
    placementAvg: 900000,
    placementHigh: 7500000,
    overview:
      "VIT is a private university with a large student base and strong engineering programs.",
    imageUrl: "",
    courses: ["B.Tech CSE", "B.Tech ECE", "MCA"],
  },
  {
    name: "Manipal Institute of Technology",
    city: "Manipal",
    state: "Karnataka",
    fees: 320000,
    rating: 4.3,
    placementAvg: 1100000,
    placementHigh: 5400000,
    overview:
      "MIT Manipal is a well-known private engineering college with modern infrastructure.",
    imageUrl: "",
    courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech IT"],
  },
  {
    name: "SRM Institute of Science and Technology",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 250000,
    rating: 4.0,
    placementAvg: 800000,
    placementHigh: 5200000,
    overview:
      "SRM offers multiple engineering and management programs with a large campus ecosystem.",
    imageUrl: "",
    courses: ["B.Tech CSE", "B.Tech Civil", "MBA"],
  },
  {
    name: "Birla Institute of Technology and Science Pilani",
    city: "Pilani",
    state: "Rajasthan",
    fees: 450000,
    rating: 4.7,
    placementAvg: 1800000,
    placementHigh: 6000000,
    overview:
      "BITS Pilani is one of India's most prestigious private universities known for flexibility and placements.",
    imageUrl: "",
    courses: ["B.E. Computer Science", "B.E. EEE", "M.Sc Economics"],
  },
  {
    name: "NIT Trichy",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    fees: 180000,
    rating: 4.6,
    placementAvg: 1600000,
    placementHigh: 5200000,
    overview:
      "NIT Trichy is one of the top NITs in India with excellent academic and placement records.",
    imageUrl: "",
    courses: ["B.Tech CSE", "B.Tech ECE", "M.Tech"],
  },
];

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const college of colleges) {
    await prisma.college.create({
      data: {
        name: college.name,
        city: college.city,
        state: college.state,
        fees: college.fees,
        rating: college.rating,
        placementAvg: college.placementAvg,
        placementHigh: college.placementHigh,
        overview: college.overview,
        imageUrl: college.imageUrl,
        courses: {
          create: college.courses.map((courseName) => ({
            name: courseName,
            duration: courseName.includes("MBA") || courseName.includes("M.Tech") ? "2 years" : "4 years",
            fees: college.fees,
          })),
        },
        reviews: {
          create: [
            {
              userName: "Aarav",
              rating: college.rating,
              comment: "Good college with decent academic environment.",
            },
            {
              userName: "Priya",
              rating: Math.max(3.5, college.rating - 0.2),
              comment: "Placements and campus life are good.",
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Database seeded successfully");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });