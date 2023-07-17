const express = require("express");
const app = express();
const path = require("path");
// Connect Databse
const connectDB = require("./config/db");
connectDB();

// body parser middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// Serve Static Assets in Production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

// pwd : HPqckeWtWknxLcMk
