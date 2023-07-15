const express = require("express");
const app = express();

// Connect Databse
const connectDB = require("./config/db");
connectDB();

// body parser middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Home of Contact Keeper" });
});

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

// pwd : HPqckeWtWknxLcMk
