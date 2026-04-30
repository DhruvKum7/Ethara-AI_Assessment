const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});