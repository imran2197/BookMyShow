const { connectDB, disconnectDB } = require("../dbConfig/connectToMongoDB");
const Movie = require("../models/Movie");

const movies = [
  {
    title: "Inception",
    description:
      "A thief who steals secrets through dream-sharing technology is given the task of planting an idea.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    genre: ["Sci-Fi", "Thriller"],
    releaseDate: new Date("16 Jul 2010"),
    runtime: 148,
    rating: 8.8,
    cast: [
      {
        name: "Leonardo DiCaprio",
        alias: "Cobb",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg",
      },
      {
        name: "Joseph Gordon-Levitt",
        alias: "Arthur",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/Joseph_Gordon-Levitt_2013.jpg",
      },
    ],
  },

  {
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind spreading chaos in Gotham.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genre: ["Action", "Crime"],
    releaseDate: new Date("18 Jul 2008"),
    runtime: 152,
    rating: 9.0,
    cast: [
      {
        name: "Christian Bale",
        alias: "Bruce Wayne",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Christian_Bale-7834.jpg",
      },
      {
        name: "Heath Ledger",
        alias: "Joker",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Heath_Ledger.jpg",
      },
    ],
  },

  {
    title: "Interstellar",
    description:
      "Explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    genre: ["Sci-Fi", "Drama"],
    releaseDate: new Date("07 Nov 2014"),
    runtime: 169,
    rating: 8.6,
    cast: [
      {
        name: "Matthew McConaughey",
        alias: "Cooper",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/8/8b/Matthew_McConaughey_2019.jpg",
      },
      {
        name: "Anne Hathaway",
        alias: "Brand",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Anne_Hathaway_Face.jpg",
      },
    ],
  },

  {
    title: "Avengers: Endgame",
    description: "The Avengers assemble once more to reverse Thanos' actions.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    genre: ["Action", "Sci-Fi"],
    releaseDate: new Date("26 Apr 2019"),
    runtime: 181,
    rating: 8.4,
    cast: [
      {
        name: "Robert Downey Jr.",
        alias: "Iron Man",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Robert_Downey_Jr_2014_Comic_Con.jpg",
      },
      {
        name: "Chris Evans",
        alias: "Captain America",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/8/8d/ChrisEvans2023.jpg",
      },
    ],
  },

  {
    title: "Spider-Man: No Way Home",
    description:
      "Spider-Man seeks Doctor Strange's help to restore his secret identity.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    genre: ["Action", "Adventure"],
    releaseDate: new Date("17 Dec 2021"),
    runtime: 148,
    rating: 8.3,
    cast: [
      {
        name: "Tom Holland",
        alias: "Peter Parker",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/0/00/Tom_Holland_by_Gage_Skidmore.jpg",
      },
      {
        name: "Zendaya",
        alias: "MJ",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/2/2e/Zendaya_2019.jpg",
      },
    ],
  },

  {
    title: "Joker",
    description:
      "A failed comedian descends into madness and becomes Gotham's most feared villain.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    genre: ["Drama", "Crime"],
    releaseDate: new Date("04 Oct 2019"),
    runtime: 122,
    rating: 8.4,
    cast: [
      {
        name: "Joaquin Phoenix",
        alias: "Arthur Fleck",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/f/f5/Joaquin_Phoenix-5191.jpg",
      },
    ],
  },

  {
    title: "RRR",
    description: "Two revolutionaries fight against British rule in India.",
    language: "Telugu",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/lr2xVDkUBqIpP2c7gBYoTiJJe9v.jpg",
    genre: ["Action", "Drama"],
    releaseDate: new Date("25 Mar 2022"),
    runtime: 182,
    rating: 8.7,
    cast: [
      {
        name: "Ram Charan",
        alias: "Raju",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/7/75/Ram_Charan_2022.jpg",
      },
      {
        name: "Jr NTR",
        alias: "Bheem",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/Jr._NTR.jpg",
      },
    ],
  },

  {
    title: "KGF Chapter 2",
    description: "Rocky continues his rise in the criminal underworld.",
    language: "Kannada",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/khNvZkHzvQV0c5JxS6p1Fj1xP8E.jpg",
    genre: ["Action", "Drama"],
    releaseDate: new Date("14 Apr 2022"),
    runtime: 168,
    rating: 8.3,
    cast: [
      {
        name: "Yash",
        alias: "Rocky",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Yash_at_KGF_event.jpg",
      },
    ],
  },

  {
    title: "Pushpa: The Rise",
    description:
      "A laborer rises through the ranks of a red sandalwood smuggling syndicate.",
    language: "Telugu",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
    genre: ["Action", "Thriller"],
    releaseDate: new Date("17 Dec 2021"),
    runtime: 179,
    rating: 7.6,
    cast: [
      {
        name: "Allu Arjun",
        alias: "Pushpa Raj",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/3/36/Allu_Arjun_at_Parugu_audio_function.jpg",
      },
      {
        name: "Rashmika Mandanna",
        alias: "Srivalli",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Rashmika_Mandanna.jpg",
      },
    ],
  },

  {
    title: "Pathaan",
    description:
      "An Indian spy faces a dangerous mercenary group threatening national security.",
    language: "Hindi",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/vqu4cBeI2xq0a1fH9V7sYxVJ1aX.jpg",
    genre: ["Action", "Thriller"],
    releaseDate: new Date("25 Jan 2023"),
    runtime: 146,
    rating: 7.5,
    cast: [
      {
        name: "Shah Rukh Khan",
        alias: "Pathaan",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Shah_Rukh_Khan_2018.jpg",
      },
      {
        name: "Deepika Padukone",
        alias: "Rubina",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/9/96/Deepika_Padukone_Cannes_2022.jpg",
      },
    ],
  },

  {
    title: "Dune",
    description:
      "Paul Atreides leads nomadic tribes in a battle to control the desert planet Arrakis.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    genre: ["Sci-Fi"],
    releaseDate: new Date("22 Oct 2021"),
    runtime: 155,
    rating: 8.1,
    cast: [
      {
        name: "Timothée Chalamet",
        alias: "Paul Atreides",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/8/8c/Timothee_Chalamet_2019.jpg",
      },
    ],
  },

  {
    title: "Top Gun: Maverick",
    description:
      "After decades of service, Maverick trains a new generation of pilots.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    genre: ["Action"],
    releaseDate: new Date("27 May 2022"),
    runtime: 130,
    rating: 8.3,
    cast: [
      {
        name: "Tom Cruise",
        alias: "Maverick",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Tom_Cruise_by_Gage_Skidmore_2.jpg",
      },
    ],
  },

  {
    title: "Avatar",
    description:
      "A marine on an alien planet becomes torn between following orders and protecting his new home.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    genre: ["Sci-Fi", "Adventure"],
    releaseDate: new Date("18 Dec 2009"),
    runtime: 162,
    rating: 8.0,
    cast: [
      {
        name: "Sam Worthington",
        alias: "Jake Sully",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/3/3d/Sam_Worthington_SDCC_2013.jpg",
      },
      {
        name: "Zoe Saldaña",
        alias: "Neytiri",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/7/75/Zoe_Saldana_2018.jpg",
      },
    ],
  },

  {
    title: "Titanic",
    description: "A love story unfolds aboard the ill-fated RMS Titanic.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    genre: ["Romance", "Drama"],
    releaseDate: new Date("19 Dec 1997"),
    runtime: 195,
    rating: 8.2,
    cast: [
      {
        name: "Leonardo DiCaprio",
        alias: "Jack",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg",
      },
      {
        name: "Kate Winslet",
        alias: "Rose",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/9/9c/Kate_Winslet_2017.jpg",
      },
    ],
  },

  {
    title: "Doctor Strange",
    description:
      "A neurosurgeon discovers a hidden world of magic and alternate dimensions.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    genre: ["Fantasy", "Action"],
    releaseDate: new Date("04 Nov 2016"),
    runtime: 115,
    rating: 7.5,
    cast: [
      {
        name: "Benedict Cumberbatch",
        alias: "Doctor Strange",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/1/1c/Benedict_Cumberbatch_2014.jpg",
      },
    ],
  },

  {
    title: "The Matrix",
    description: "A hacker discovers the shocking truth about his reality.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    genre: ["Sci-Fi"],
    releaseDate: new Date("31 Mar 1999"),
    runtime: 136,
    rating: 8.7,
    cast: [
      {
        name: "Keanu Reeves",
        alias: "Neo",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Keanu_Reeves_2013.jpg",
      },
    ],
  },

  {
    title: "Black Panther",
    description:
      "T'Challa returns home to Wakanda to take his rightful place as king.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    genre: ["Action"],
    releaseDate: new Date("16 Feb 2018"),
    runtime: 134,
    rating: 7.9,
    cast: [
      {
        name: "Chadwick Boseman",
        alias: "T'Challa",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Chadwick_Boseman_by_Gage_Skidmore.jpg",
      },
    ],
  },

  {
    title: "Gladiator",
    description: "A betrayed Roman general fights for justice in the arena.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    genre: ["Action", "Drama"],
    releaseDate: new Date("05 May 2000"),
    runtime: 155,
    rating: 8.5,
    cast: [
      {
        name: "Russell Crowe",
        alias: "Maximus",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/Russell_Crowe_Cannes_2013.jpg",
      },
    ],
  },

  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over years, finding solace and redemption.",
    language: "English",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    genre: ["Drama"],
    releaseDate: new Date("14 Oct 1994"),
    runtime: 142,
    rating: 9.3,
    cast: [
      {
        name: "Tim Robbins",
        alias: "Andy",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/6/66/Tim_Robbins_2012.jpg",
      },
      {
        name: "Morgan Freeman",
        alias: "Red",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Morgan_Freeman_2018.jpg",
      },
    ],
  },
];

const main = async () => {
  await connectDB();
  await Movie.deleteMany({});

  await Movie.insertMany(movies);
  console.log("Movies Seeded Successfully!");
  await disconnectDB();
};

main();
