const { connectDB, disconnectDB } = require("../dbConfig/connectToMongoDB");
const Show = require("../models/Show");

const theatreIds = [
  "69c44d7cd3618980755e858c",
  "69c44da4d3618980755e8592",
  "69c44dc2d3618980755e8598",
  "69c44de1d3618980755e859e",
  "69c44dfcd3618980755e85a4",
];

const movies = [
  { id: "69c3f0fac932dc6bf5f4c12a", length: 154 },
  { id: "69c3f6bcc932dc6bf5f4c142", length: 154 },
  { id: "69c3f7e0c932dc6bf5f4c14f", length: 164 },
  { id: "69c3fb60c932dc6bf5f4c15b", length: 104 },
  { id: "69c3fc2cc932dc6bf5f4c16a", length: 155 },
  { id: "69c3fcd2c932dc6bf5f4c17b", length: 108 },
  { id: "69c3fd5cc932dc6bf5f4c18e", length: 179 },
  { id: "69c43252d3618980755e8309", length: 156 },
  { id: "69c44555d3618980755e8391", length: 180 },
  { id: "69c448e4d3618980755e83b0", length: 180 },
  { id: "69c44b0ad3618980755e8444", length: 180 },
  { id: "69c44c0fd3618980755e8520", length: 120 },
];

const slots = [
  { name: "Morning", start: "09:00 AM", end: "12:00 PM" },
  { name: "Afternoon", start: "12:30 PM", end: "03:30 PM" },
  { name: "Evening", start: "04:00 PM", end: "07:00 PM" },
  { name: "Night", start: "07:30 PM", end: "11:00 PM" },
];

const fromDate = "2026-03-26";
const toDate = "2027-03-31";

const BUFFER = 25; // more realistic

// Convert time → minutes
const toMinutes = (timeStr) => {
  const [time, mod] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);

  if (mod === "PM" && h !== 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;

  return h * 60 + m;
};

// Round to nearest 5 mins
const roundTo5 = (mins) => Math.ceil(mins / 5) * 5;

// Format back to AM/PM
const formatTime = (mins) => {
  const d = new Date();
  d.setHours(Math.floor(mins / 60), mins % 60);

  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const generateShows = () => {
  const shows = [];

  movies.forEach((movie) => {
    theatreIds.forEach((theatre) => {
      slots.forEach((slot) => {
        let currentTime = roundTo5(toMinutes(slot.start));
        const slotEnd = toMinutes(slot.end);

        while (true) {
          const start = currentTime;
          const end = start + movie.length;

          if (end > slotEnd) break;

          shows.push({
            name: slot.name,
            fromDate,
            toDate,
            time: formatTime(start),
            movie: movie.id,
            ticketPrice:
              slot.name === "Morning"
                ? 150 + Math.floor(Math.random() * 80)
                : slot.name === "Afternoon"
                  ? 200 + Math.floor(Math.random() * 100)
                  : slot.name === "Evening"
                    ? 250 + Math.floor(Math.random() * 120)
                    : 300 + Math.floor(Math.random() * 150),
            totalSeats: [120, 150, 180][Math.floor(Math.random() * 3)],
            theatre,
          });

          // Next show (rounded)
          currentTime = roundTo5(end + BUFFER);
        }
      });
    });
  });

  return shows;
};

const showsData = generateShows();
console.log(showsData);

const main = async () => {
  await connectDB();
  await Show.deleteMany({});

  await Show.insertMany(showsData);
  console.log("Movies Seeded Successfully!");
  await disconnectDB();
};

main();
