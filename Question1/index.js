const express = require("express");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log("Server Running on PORT: " + PORT + "!!");
});