const app = require("./app");
const { connectDB } = require("./dbConfig/connectToMongoDB");

const PORT = 8080;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
